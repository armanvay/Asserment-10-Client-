"use client";

// ভুল সংশোধন: lucide-react এর বদলে next/link ব্যবহার করা হয়েছে
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
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
        setLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center p-10 min-h-[400px] flex items-center justify-center">
        Loading Trending Books...
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] mt-10 text-white p-6 md:p-12 font-sans">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🔥 Trending Books
      </h2>

      {/* গ্রিড আকারে বইগুলো দেখানো */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id || book.bookTitle}
            className="border border-[#1f1f1f] rounded-xl overflow-hidden bg-[#141414] hover:border-gray-700 transition-all duration-300 group"
          >
            {/* বুক কভার ইমেজ */}
            <div className="relative w-full h-52 bg-[#1c1c1c] overflow-hidden">
              <Image
                width={400}
                height={300}
                src={
                  book.coverImageUrl ||
                  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e"
                }
                alt={book.bookTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* কার্ড কন্টেন্ট */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-200 line-clamp-1">
                {book.bookTitle}
              </h3>

              {/* জেনারের ব্যাজ */}
              <span className="inline-block mt-1 bg-[#0f1e36] text-[#3b82f6] text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-[#1d3557]">
                {book.genre}
              </span>

              <p className="mt-3 text-sm text-gray-400 h-10 line-clamp-2">
                {book.shortDescription}
              </p>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1f1f1f]">
                <span className="font-bold text-green-400 text-lg">
                  ${book.price}
                </span>

                <Link
                  href={`/ebooks/${book._id}`}
                  className="px-4 py-1.5 bg-[#2563eb] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
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
