import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function Success({ searchParams }) {
  // ১. searchParams থেকে সেশন আইডি নেওয়া
  const { session_id } = await searchParams;

  // সেশন আইডি না থাকলে মেইন পেজে রিডাইরেক্ট
  if (!session_id) {
    return redirect("/");
  }

  // স্ট্রাইপ থেকে সেশন ডাটা তুলে আনা
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  const { status, customer_details, metadata } = checkoutSession;
  const customerEmail = customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const {
      ebookId,
      bookTitle,
      price,
      coverImageUrl,
      writerName,
      userId,
      userEmail,
    } = metadata;

    try {
      // [FIXED]: আপনার বাকি পেজের সাথে মিল রেখে NEXT_PUBLIC_SERVER_URL ব্যবহার করা হলো
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

      // এক্সপ্রেস ব্যাকেন্ড এপিআই কল
      await fetch(`${serverUrl}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ebookId,
          bookTitle,
          price: parseFloat(price),
          coverImageUrl,
          writerName,
          userId,
          userEmail,
          sessionId: session_id,
          purchaseDate: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Database storage failed:", error);
    }

    // প্রিমিয়াম ডার্ক থিম সাকসেস স্ক্রিন UI
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
        <div className="bg-[#18181b] border border-zinc-800 rounded-2xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-emerald-950/50 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-3xl">
            ✓
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">
              Payment Successful!
            </h1>
            <p className="text-sm text-zinc-400">
              Thank you for purchasing{" "}
              <span className="text-zinc-200 font-semibold">bookTitley</span>
              .
            </p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 text-left text-xs text-zinc-400 space-y-1">
            <p>
              • Confirmation sent to:{" "}
              <span className="text-zinc-300 font-medium">{customerEmail}</span>
            </p>
            <p>
              • Transaction ID:{" "}
              <span className="text-zinc-500 font-mono text-[10px] block truncate">
                {session_id}
              </span>
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard/user/purchased-ebooks"
              className="block text-center bg-white text-black hover:bg-zinc-200 font-semibold text-sm py-3 rounded-xl transition"
            >
              Go to My Library
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // [FIXED]: স্ট্যাটাস complete বা open না হলে (অন্য কোনো কেস হলে) হোমপেজে রিডাইরেক্ট করবে
  return redirect("/");
}
