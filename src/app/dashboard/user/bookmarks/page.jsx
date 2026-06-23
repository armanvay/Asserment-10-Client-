"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { LuHeart, LuTrash2, LuEye } from "react-icons/lu";

const UserBookmarks = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ২. ডাটাবেজ থেকে বুকমার্কড করা বইগুলো নিয়ে আসা
  const fetchBookmarks = () => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookmarks/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user?.email]);

  // ৩. বুকমার্ক রিমুভ বা টগল করার হ্যান্ডলার (আপনার তৈরি করা API অনুযায়ী)
  const handleRemoveBookmark = async (ebookId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user.email,
          ebookId: ebookId,
        }),
      });
      const data = await res.json();
      
      if (data.success) {
        // সফলভাবে রিমুভ হলে স্টেট ফিল্টার করে সাথে সাথে UI থেকে সরিয়ে দেওয়া
        setBookmarks((prev) => prev.filter((item) => item.ebookId !== ebookId));
      }
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Loading your saved items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#09090b] min-h-screen text-zinc-100">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-zinc-800 rounded-lg text-white">
          <LuHeart className="size-5 text-red-400 fill-red-400/20" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">My Saved Bookmarks</h1>
          <p className="text-xs text-zinc-400">Ebooks you are planning to read or buy later</p>
        </div>
      </div>

      {/* Grid Layout */}
      {bookmarks.length === 0 ? (
        <div className="bg-[#18181b] border border-zinc-800 p-12 rounded-xl text-center text-zinc-500 text-sm max-w-xl mx-auto mt-10">
          🤍 Your bookmark list is empty. Explore and save some interesting stories!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookmarks.map((item) => (
            <div 
              key={item._id} 
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 flex flex-col justify-between hover:border-zinc-700 transition group shadow-lg relative"
            >
              <div>
                {/* Book Cover */}
                <div className="w-full h-52 bg-zinc-900 border border-zinc-800 rounded-lg mb-4 overflow-hidden shadow-md relative">
                  {item.coverImageUrl ? (
                    <img
                      src={item.coverImageUrl}
                      alt={item.bookTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      📖
                    </div>
                  )}

                  {/* Genre Tag inside cover */}
                  {item.genre && (
                    <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-zinc-300 border border-zinc-700 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      {item.genre}
                    </span>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors line-clamp-1">
                  {item.bookTitle}
                </h3>
                <p className="text-sm font-semibold text-zinc-400 mt-1">
                  ${item.price || "Free"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-4">
                <Link
                  href={`/ebooks/${item.ebookId}`}
                  className="flex-1 flex items-center justify-center gap-1 text-center bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                >
                  <LuEye size={14} /> View details
                </Link>
                
                <button
                  onClick={() => handleRemoveBookmark(item.ebookId)}
                  className="p-2.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-lg hover:bg-rose-950/40 hover:text-rose-500 hover:border-rose-900 transition-all"
                  title="Remove Bookmark"
                >
                  <LuTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookmarks;