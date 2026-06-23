"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  LuBookOpen,
  LuTrash2,
  LuRefreshCw,
  LuExternalLink,
} from "react-icons/lu";

const AdminManageEbooks = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Security Check (অ্যাডমিন ছাড়া অন্য কেউ ঢুকলে হোমপেজে পাঠিয়ে দেবে)
  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, isPending, router]);

  // 📦 ডাটাবেজ থেকে সব ইবুক ফেচ করার ফাংশন
  const fetchEbooks = async () => {
    try {
      setLoading(true);
      // এখানে আপনার অলরেডি থাকা app.get("/ebooks") ব্যাকএন্ড এপিআই কল হচ্ছে
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks`);
      const data = await res.json();
      setEbooks(data);
    } catch (err) {
      console.error("Error fetching ebooks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchEbooks();
    }
  }, [user]);

  // 🔄 ইবুকের পাবলিশিং স্ট্যাটাস (Pending/Published) আপডেট করার হ্যান্ডলার
  const handleStatusChange = async (bookId, newStatus) => {
    try {
      // ব্যাকএন্ডের app.patch("/ebooks/:id/status") এপিআই কল করা হচ্ছে
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${bookId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (res.ok) {
        setEbooks((prev) =>
          prev.map((book) =>
            book._id === bookId
              ? { ...book, publishingStatus: newStatus }
              : book,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 🗑️ ইবুক ডিলিট করার হ্যান্ডলার
  const handleDeleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ebook?",
    );
    if (!confirmDelete) return;

    try {
      // ব্যাকএন্ডের app.delete("/ebooks/:id") এপিআই কল করা হচ্ছে
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${bookId}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        setEbooks((prev) => prev.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Loading ebooks list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] text-zinc-100 p-4 sm:p-6 lg:p-8 min-h-screen w-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* হেডার সেকশন */}
        <div className="flex justify-between items-center border-b border-zinc-900 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <LuBookOpen className="text-blue-400" /> Manage Ebooks
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Total ebooks:{" "}
              <span className="text-white font-semibold">{ebooks.length}</span>
            </p>
          </div>
          <button
            onClick={fetchEbooks}
            className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh list"
          >
            <LuRefreshCw className="size-4" />
          </button>
        </div>

        {/* ইবুক টেবিল কন্টেইনার */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/50 border-b border-zinc-800 text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  <th className="p-4">Book Info</th>
                  <th className="p-4">Writer Email</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {ebooks.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-zinc-900/20 transition-colors"
                  >
                    {/* বইয়ের কভার ও নাম */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 bg-zinc-800 border border-zinc-700 rounded overflow-hidden flex-shrink-0 relative">
                          {book.coverImageUrl ? (
                            <img
                              src={book.coverImageUrl}
                              alt={book.bookTitle}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500">
                              No Cover
                            </div>
                          )}
                        </div>
                        <div className="max-w-[200px] sm:max-w-xs truncate">
                          <p
                            className="font-medium text-white truncate"
                            title={book.bookTitle}
                          >
                            {book.bookTitle || "Untitled Book"}
                          </p>
                          <p className="text-xs text-zinc-400 truncate">
                            {book.genre || "General"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* রাইটারের ইমেইল */}
                    <td className="p-4 text-zinc-400 truncate max-w-[180px]">
                      {book.writerEmail || "Unknown"}
                    </td>

                    {/* দাম */}
                    <td className="p-4 font-medium text-zinc-200">
                      {book.price ? `$${book.price}` : "Free"}
                    </td>

                    {/* স্ট্যাটাস ড্রপডাউন */}
                    <td className="p-4">
                      <select
                        value={book.publishingStatus || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(book._id, e.target.value)
                        }
                        className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-medium px-2.5 py-1.5 text-zinc-200 focus:outline-none focus:border-zinc-700 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Published">Published</option>
                      </select>
                    </td>

                    {/* অ্যাকশন বাটন (Delete) */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
                          title="Delete Ebook"
                        >
                          <LuTrash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* কোনো ইবুক না থাকলে এম্পটি স্টেট */}
          {ebooks.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No ebooks found in the database.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManageEbooks;
