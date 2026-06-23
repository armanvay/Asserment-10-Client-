"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; // অথেনটিকেশন ক্লায়েন্ট

const BookmarkedBooks = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [bookmarksData, setBookmarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেজ থেকে এই ইউজারের বুকমার্ক করা বইগুলো নিয়ে আসা
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookmarks/${user.email}`,
        );
        const data = await res.json();
        setBookmarksData(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user?.email]);

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm">Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen border border-green-300 bg-[#0d0d0d] text-white p-6 md:p-12 font-sans">
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📚 Bookmarked Books
        </h1>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border border-[#1a1a1a] overflow-hidden">
        {bookmarksData.length === 0 ? (
          <div className="p-8 text-center bg-[#141414] text-gray-500 text-sm">
            You havent bookmarked any books yet.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Head */}
              <thead>
                <tr className="bg-[#141414] text-gray-300 text-sm font-semibold border-b border-[#1a1a1a]">
                  <th className="p-4 pl-6 border-r border-[#1a1a1a] w-2/5">
                    Book
                  </th>
                  <th className="p-4 border-r border-[#1a1a1a] w-1/5">Genre</th>
                  <th className="p-4 border-r border-[#1a1a1a] w-1/5">Price</th>
                  <th className="p-4 pr-6 w-1/5">Saved Date</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-[#1a1a1a]">
                {bookmarksData.map((bookmark) => (
                  <tr
                    key={bookmark._id}
                    className="hover:bg-[#111111] transition-colors text-sm text-gray-200"
                  >
                    {/* Book Info (Image + Title) */}
                    <td className="p-4 pl-6 border-r border-[#1a1a1a] font-medium flex items-center gap-3">
                      <div className="w-8 h-10 bg-[#1c1c1c] border border-[#2d2d2d] rounded flex items-center justify-center overflow-hidden flex-shrink-0 text-xs">
                        {bookmark.coverImageUrl ? (
                          <img
                            src={bookmark.coverImageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "📖"
                        )}
                      </div>
                      <span className="line-clamp-1">{bookmark.bookTitle}</span>
                    </td>

                    {/* Genre */}
                    <td className="p-4 border-r border-[#1a1a1a] text-gray-300">
                      <span className="bg-[#0f1e36] text-[#3b82f6] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#1d3557]">
                        {bookmark.genre || "N/A"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 border-r border-[#1a1a1a] text-gray-300 font-semibold">
                      ${bookmark.price}
                    </td>

                    {/* Date */}
                    <td className="p-4 pr-6 text-gray-400">
                      {bookmark.bookmarkedAt
                        ? new Date(bookmark.bookmarkedAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedBooks;
