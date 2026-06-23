import { NextResponse } from "next/server";
import { headers } from "next/headers";
//import { stripe } from "../../../lib/stripe"; // আপনার পাথ অনুযায়ী ঠিক রাখবেন
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });
    const user = userSession?.user;

    // ১. ফ্রন্টএন্ড (EbookDetailsPage) থেকে পাঠানো ডাটা রিসিভ করা
    const body = await req.json();
    const { ebookId, bookTitle, price, coverImageUrl, writerName } = body;

    if (!ebookId || !price) {
      return NextResponse.json(
        { error: "Missing required book information" },
        { status: 400 },
      );
    }

    // ২. ডাইনামিক প্রাইস ডাটা দিয়ে চেকআউট সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bookTitle,
              images: coverImageUrl ? [coverImageUrl] : [],
              description: `By ${writerName || "Unknown Writer"}`,
            },
            // স্ট্রাইপ সেন্টস (cents) এ হিসেব করে, তাই ১০০ দিয়ে গুন করতে হবে
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      // এই মেটাডাটাগুলোই সাকসেস পেজ হয়ে ডাটাবেজে সেভ হবে
      metadata: {
        ebookId: ebookId,
        bookTitle: bookTitle,
        price: price.toString(),
        coverImageUrl: coverImageUrl || "",
        writerName: writerName || "",
        userId: user?.id || "",
        userEmail: user?.email || "",
      },
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ebooks/${ebookId}`, // ক্যানসেল করলে আগের পেজে ফিরবে
    });

    // ক্লায়েন্ট সাইডে উইন্ডো লোকেশন চেঞ্জ করার জন্য ইউআরএল পাঠানো
    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
