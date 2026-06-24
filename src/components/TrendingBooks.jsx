"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TrendingBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
        setLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  return (
    <div className="bg-[#070708]  text-white p-6 md:p-12 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* গ্লোয়িং ইমোজি সহ প্রিমিয়াম সেকশন হেডার */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-2.5 tracking-tight text-white bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
          <span className="animate-pulse">🔥</span> Trending Books
        </h2>

        <Link
          href="/ebooks"
          className="mb-5 border p-2 text-black rounded-2xl bg-blue-400"
        >
          View All Ebooks
        </Link>
      </div>

      {/* গ্রিড আকারে বইগুলো দেখানো */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? /* 🚀 ডাইনামিক রিয়্যাক্ট স্কেলিটন লোডার (Trending কার্ডের মাপে ৩টি কঙ্কাল অবয়ব) */
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="border border-zinc-900 rounded-2xl overflow-hidden bg-[#0f0f11] flex flex-col h-[390px] animate-pulse"
              >
                <div className="w-full h-52 bg-zinc-900" />
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    <div className="w-3/4 h-5 bg-zinc-800 rounded-md" />
                    <div className="w-16 h-4 bg-zinc-900 rounded-md" />
                    <div className="w-full h-3 bg-zinc-900 rounded-md" />
                    <div className="w-5/6 h-3 bg-zinc-900 rounded-md" />
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                    <div className="w-14 h-5 bg-zinc-800 rounded-md" />
                    <div className="w-16 h-8 bg-zinc-800 rounded-xl" />
                  </div>
                </div>
              </div>
            ))
          : /* রিয়েল ডেটা রেন্ডারিং */
            books.map((book) => (
              <div
                key={book._id || book.bookTitle}
                className="border border-zinc-800/60 rounded-2xl overflow-hidden bg-[#0f0f11] hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 relative top-0 hover:-top-1 group"
              >
                {/* বুক কভার ইমেজ */}
                <div className="relative w-full h-52 bg-zinc-950 overflow-hidden border-b border-zinc-900/80">
                  <Image
                    width={400}
                    height={300}
                    src={
                      book.coverImageUrl ||
                      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                    }
                    alt={book.bookTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* ইমেজ ওভারলে শ্যাডো */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* কার্ড কন্টেন্ট */}
                <div className="p-5 bg-gradient-to-b from-[#111113] to-[#0f0f11] flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                      {book.bookTitle}
                    </h3>

                    {/* জেনারের ব্যাজ */}
                    <span className="inline-block mt-2 bg-blue-950/40 text-blue-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-blue-900/30">
                      {book.genre || "General"}
                    </span>

                    <p className="mt-3.5 text-xs text-zinc-500 leading-relaxed h-10 line-clamp-2">
                      {book.shortDescription}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-zinc-900/80">
                    <span className="font-bold text-base text-emerald-400">
                      ${book.price}
                    </span>

                    <Link
                      href={`/ebooks/${book._id}`}
                      className="px-4.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-95"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TrendingBooks;
