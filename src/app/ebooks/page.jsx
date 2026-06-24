"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search, Filter, BookOpen } from "lucide-react";

const EbooksPage = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // সার্চ এবং ফিল্টারিং স্টেট
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // API call
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks`);
        const data = await res.json();
        setEbooks(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load ebooks");
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  // ১. ডাইনামিকভাবে সমস্ত বই থেকে ইউনিক জনরা/ক্যাটাগরি বের করা (ড্রপডাউনের জন্য)
  const genres = [
    "All",
    ...new Set(ebooks.map((book) => book.genre).filter(Boolean)),
  ];

  // ২. সার্চ এবং ক্যাটাগরি অনুযায়ী বই ফিল্টার করার মূল লজিক
  const filteredEbooks = ebooks.filter((book) => {
    const matchesSearch =
      book.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-[#070708] text-red-400 flex items-center justify-center font-medium tracking-wide">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 p-6 md:p-12 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Banner / Heading */}
      <div className="mb-12 text-center md:text-left border-b border-zinc-900 pb-6">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Explore Ebooks
        </h1>
        <p className="text-zinc-500 text-sm mt-2 max-w-xl">
          Find your next favorite read from our diverse, handpicked digital
          collection.
        </p>
      </div>

      {/* Search & Filter Bar Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-4xl">
        {/* Search Input */}
        <div className="relative flex-1 group">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            placeholder="Search by title or description..."
            className="w-full bg-[#0f0f11] border border-zinc-800/80 rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 bg-gradient-to-b from-[#111113] to-[#0f0f11] transition-all duration-200 disabled:opacity-50"
          />
        </div>

        {/* Genre Filter Dropdown */}
        <div className="relative min-w-[200px]">
          <Filter
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
            size={16}
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            disabled={loading}
            className="w-full bg-[#0f0f11] border border-zinc-800/80 rounded-xl pl-10 pr-8 py-3 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 appearance-none cursor-pointer bg-gradient-to-b from-[#111113] to-[#0f0f11] transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <option>Loading...</option>
            ) : (
              genres.map((genre) => (
                <option
                  key={genre}
                  value={genre}
                  className="bg-[#0f0f11] text-zinc-300"
                >
                  {genre}
                </option>
              ))
            )}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Ebooks Grid & Loading State Wrapper */}
      {loading ? (
        /* 🚀 ডাইনামিক রিয়্যাক্ট স্কেলিটন লোডার (Skeleton Loader UI) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="border border-zinc-900 rounded-2xl overflow-hidden bg-[#0f0f11] flex flex-col h-[380px] animate-pulse"
            >
              {/* Image Box Skeleton */}
              <div className="w-full h-56 bg-zinc-900" />

              {/* Content Skeleton */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  {/* Badge Skeleton */}
                  <div className="w-16 h-4 bg-zinc-900 rounded-md" />
                  {/* Title Skeleton */}
                  <div className="w-4/5 h-5 bg-zinc-800 rounded-md" />
                  {/* Description Skeletons */}
                  <div className="w-full h-3 bg-zinc-900 rounded-md" />
                  <div className="w-2/3 h-3 bg-zinc-900 rounded-md" />
                </div>

                {/* Footer Skeleton */}
                <div className="flex justify-between items-center pt-3 border-t border-zinc-900">
                  <div className="space-y-1">
                    <div className="w-8 h-2 bg-zinc-900 rounded-sm" />
                    <div className="w-12 h-4 bg-zinc-800 rounded-md" />
                  </div>
                  <div className="w-20 h-8 bg-zinc-800 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredEbooks.length === 0 ? (
        <div className="bg-[#0f0f11] border border-zinc-800/50 rounded-2xl p-16 text-center max-w-xl mx-auto mt-16 backdrop-blur-sm">
          <BookOpen
            className="mx-auto text-zinc-600 mb-4 stroke-[1.5]"
            size={40}
          />
          <p className="text-zinc-400 font-medium text-base">No ebooks found</p>
          <p className="text-zinc-600 text-xs mt-1">
            Try adjusting your keywords or selecting another category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEbooks.map((book) => (
            <div
              key={book._id || book.bookTitle}
              className="border border-zinc-800/60 rounded-2xl overflow-hidden bg-[#0f0f11] flex flex-col group hover:border-zinc-700/80 hover:shadow-xl hover:shadow-black/40 transition-all duration-300 relative top-0 hover:-top-1"
            >
              {/* Cover Image Wrapper */}
              <div className="w-full h-56 relative overflow-hidden bg-zinc-950 border-b border-zinc-900">
                {book.coverImageUrl ? (
                  <img
                    src={book.coverImageUrl}
                    alt={book.bookTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-700">
                    📖
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/40 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Book Content */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-[#111113] to-[#0f0f11]">
                <div>
                  <span className="inline-block bg-blue-950/40 text-blue-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border border-blue-900/30">
                    {book.genre || "General"}
                  </span>

                  <h2 className="font-bold text-base text-zinc-100 mt-3 line-clamp-1 group-hover:text-white transition-colors">
                    {book.bookTitle}
                  </h2>

                  <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed min-h-[32px]">
                    {book.shortDescription}
                  </p>
                </div>

                {/* Pricing & Link */}
                <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-zinc-900/80">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 uppercase font-semibold tracking-wider">
                      Price
                    </span>
                    <span className="font-bold text-base text-emerald-400">
                      ${book.price}
                    </span>
                  </div>

                  <Link
                    href={`/ebooks/${book._id}`}
                    className="px-4.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 active:scale-95"
                  >
                    Read Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EbooksPage;
