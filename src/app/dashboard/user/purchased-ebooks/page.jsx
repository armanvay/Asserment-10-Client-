"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { LuBookOpen } from "react-icons/lu";

const PurchasedEbook = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [purchasedBooks, setPurchasedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ২. ডাটাবেজ থেকে ইউজারের কেনা বইগুলো নিয়ে আসা
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchasedBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching purchased ebooks:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen  bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Opening your library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#09090b] min-h-screen w-screen text-zinc-100">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-zinc-800 rounded-lg text-white">
          <LuBookOpen className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">My Purchased Ebooks</h1>
          <p className="text-xs text-zinc-400">
            Your personal collection of digital masterpieces
          </p>
        </div>
      </div>

      {/* Grid Layout / Gallery */}
      {purchasedBooks.length === 0 ? (
        <div className="bg-[#18181b] border border-zinc-800 p-12 rounded-xl text-center text-zinc-500 text-sm max-w-xl mx-auto mt-10">
          🔒 You havent purchased any ebooks yet. Explore the shop to add
          stories to your library!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {purchasedBooks.map((order) => (
            <div
              key={order._id}
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition group shadow-lg"
            >
              <div>
                {/* Book Cover Image Container */}
                <div className="w-full h-52 bg-zinc-900 border border-zinc-800 rounded-lg mb-4 overflow-hidden shadow-md">
                  {order.coverImageUrl ? (
                    <img
                      src={order.coverImageUrl}
                      alt={order.bookTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      📖
                    </div>
                  )}
                </div>

                {/* Book Info */}
                <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                  {order.bookTitle}
                </h3>
                <p className="text-xs text-zinc-500 mb-4 mt-0.5">
                  By {order.writerName || "Indie Author"}
                </p>
              </div>

              {/* Read Now Button */}
              <Link
                href={`/ebooks/${order.ebookId}`}
                className="block text-center bg-zinc-100 text-black hover:bg-zinc-200 text-xs font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
              >
                Read Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedEbook;
