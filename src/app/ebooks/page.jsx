"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react"; // আইকন ব্যবহারের জন্য

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

  // ২. সার্চ এবং ক্যাটাগরি অনুযায়ী বই ফিল্টার করার মূল লজিক
  const filteredEbooks = ebooks.filter((book) => {
    const matchesSearch =
      book.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-red-500 flex items-center justify-center font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 p-6 md:p-12 font-sans">
      {/* Top Banner / Heading */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
          Explore Ebooks
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Find your next favorite read from our diverse collection
        </p>
      </div>

      {/* Search & Filter Bar Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-4xl">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full bg-[#141414] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Genre Filter Dropdown */}
        <div className="relative min-w-[180px]">
          <Filter
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={16}
          />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full bg-[#141414] border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre} className="bg-[#141414]">
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ebooks Grid */}
      {filteredEbooks.length === 0 ? (
        <div className="bg-[#121212] border border-zinc-900 rounded-2xl p-12 text-center max-w-xl mx-auto mt-10">
          <p className="text-zinc-500 text-base">
            No ebooks match your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEbooks.map((book) => (
            <div
              key={book._id || book.bookTitle}
              className="border border-zinc-900 rounded-2xl overflow-hidden bg-[#141414] flex flex-col group hover:border-zinc-800 transition-all duration-300"
            >
              {/* Cover Image Wrapper */}
              <div className="w-full h-52 relative overflow-hidden bg-zinc-900">
                {book.coverImageUrl ? (
                  <img
                    src={book.coverImageUrl}
                    alt={book.bookTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    📖
                  </div>
                )}
              </div>

              {/* Book Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <span className="bg-blue-950/50 text-blue-400 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-blue-900/50">
                    {book.genre || "General"}
                  </span>
                  <h2 className="font-bold text-lg text-zinc-100 mt-2 line-clamp-1 group-hover:text-white">
                    {book.bookTitle}
                  </h2>
                  <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {book.shortDescription}
                  </p>
                </div>

                {/* Pricing & Link */}
                <div className="flex justify-between items-center mt-5 pt-3 border-t border-zinc-900">
                  <span className="font-bold text-base text-emerald-400">
                    ${book.price}
                  </span>

                  <Link
                    href={`/ebooks/${book._id}`}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/10"
                  >
                    Read
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
