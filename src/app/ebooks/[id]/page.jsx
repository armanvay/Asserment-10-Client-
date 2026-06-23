"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const EbookDetailsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const { id } = useParams();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // বুকমার্ক ও পেমেন্ট স্টেট
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false); // পেমেন্ট লোডিং স্টেট

  // ================= ROLE LOGIC =================
  const isLoggedIn = !!user;
  const userRole = user?.role;
  const isWriter = userRole === "writer";
  const isAdmin = userRole === "admin";
  const canBuy = isLoggedIn && !isWriter && !isAdmin;

  // Fetch ebook details
  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${id}`,
        );
        const data = await res.json();
        setEbook(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load ebook");
        setLoading(false);
      }
    };

    if (id) fetchEbook();
  }, [id]);

  // বুকমার্ক স্ট্যাটাস চেক করার ইফেক্ট
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user?.email || !id) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/check?email=${user.email}&ebookId=${id}`,
        );
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      } catch (err) {
        console.error("Error checking bookmark status:", err);
      }
    };

    checkBookmarkStatus();
  }, [user?.email, id]);

  // STRIPE PAYMENT HANDLER (নতুন যুক্ত করা হয়েছে)
  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      alert("Please login first to buy this book!");
      return;
    }

    setPaymentLoading(true);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ebookId: ebook._id,
          bookTitle: ebook.bookTitle,
          price: ebook.price,
          coverImageUrl: ebook.coverImageUrl,
          writerName: ebook.writerName,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // স্ট্রাইকের সিকিউর পেমেন্ট পেজে রিডাইরেক্ট করা
        window.location.href = data.url;
      } else {
        alert(
          data.error || "Something went wrong during checkout initialization.",
        );
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error("Payment redirect error:", error);
      alert("Failed to start payment. Please try again.");
      setPaymentLoading(false);
    }
  };

  // বুকমার্ক হ্যান্ডলার ফাংশন
  const handleBookmarkToggle = async () => {
    if (!isLoggedIn) {
      alert("Please login first to bookmark this book!");
      return;
    }

    setBookmarkLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/toggle`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            ebookId: id,
            bookTitle: ebook.bookTitle,
            coverImageUrl: ebook.coverImageUrl,
            genre: ebook.genre,
            price: ebook.price,
          }),
        },
      );

      const data = await res.json();

      if (data.success) {
        setIsBookmarked(data.isBookmarked);
        alert(data.message);
      } else {
        alert("Something went wrong with bookmarking.");
      }
    } catch (err) {
      alert("Failed to update bookmark. Please try again.");
    } finally {
      setBookmarkLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Loading ebook details...
      </p>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!ebook)
    return <p className="text-center mt-10 text-gray-500">Ebook not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* COVER IMAGE */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={ebook.coverImageUrl}
          alt={ebook.bookTitle}
          fill
          className="object-cover"
        />
      </div>

      {/* TITLE + INFO */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{ebook.bookTitle}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
          <p>📚 Genre: {ebook.genre}</p>
          <p>💰 Price: ${ebook.price}</p>
          <p>
            📅 Date:{" "}
            {ebook.createdAt
              ? new Date(ebook.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            Status:{" "}
            <span className="text-green-400">{ebook.publishingStatus}</span>
          </p>
        </div>

        {/* WRITER */}
        <div className="mt-4">
          <p className="text-gray-300">
            ✍ Writer:{" "}
            <Link href="#" className="text-blue-400 underline">
              {ebook.writerName || "Unknown"}
            </Link>
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{ebook.shortDescription}</p>
        </div>

        {/* CONTENT PREVIEW */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Preview Content</h2>
          <div className="bg-[#111] p-4 rounded-lg text-gray-300 whitespace-pre-line max-h-[300px] overflow-y-auto">
            {ebook.ebookContent?.slice(0, 500)}...
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">
          {/* BUY BUTTON */}
          <button
            onClick={handleBuyNow}
            disabled={!canBuy || paymentLoading}
            className={`px-6 py-3 rounded-xl font-semibold transition flex items-center justify-center min-w-[160px]
              ${canBuy && !paymentLoading ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-500 cursor-not-allowed text-gray-300"}
            `}
          >
            {paymentLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : !isLoggedIn ? (
              "Login to Buy"
            ) : isWriter ? (
              "You can't buy your own book"
            ) : isAdmin ? (
              "Admin can't buy"
            ) : (
              `Buy Now ($${ebook.price})`
            )}
          </button>

          {/* DYNAMIC BOOKMARK BUTTON */}
          <button
            onClick={handleBookmarkToggle}
            disabled={bookmarkLoading}
            className={`px-6 py-3 rounded-xl transition flex items-center gap-2 font-semibold ${
              isBookmarked
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            }`}
          >
            {bookmarkLoading ? (
              <span>Processing...</span>
            ) : isBookmarked ? (
              <>❤️ Bookmarked</>
            ) : (
              <>🤍 Bookmark</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookDetailsPage;
