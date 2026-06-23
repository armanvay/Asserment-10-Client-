"use client";

import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

const BookRow = ({ book, onEdit, onDelete, onRefresh }) => {
  // স্ট্যাটাস টগল লজিক (Published <-> Draft)
  const handleStatusToggle = async () => {
    try {
      const newStatus =
        book.publishingStatus === "Published" ? "Draft" : "Published";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${book._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        onRefresh();
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <tr className="border-b border-[#161616] hover:bg-[#111111]/60 transition-colors group">
      {/* Book Image & Details */}
      <td className="py-4 pl-2 flex items-center gap-4">
        <div className="w-11 h-14 bg-[#161616] border border-[#262626] rounded-xl flex items-center justify-center text-lg overflow-hidden flex-shrink-0 shadow-md">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.bookTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          ) : (
            "📖"
          )}
        </div>

        <div className="space-y-0.5">
          <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors line-clamp-1 max-w-[200px]">
            {book.bookTitle}
          </h4>
          <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">
            {book.shortDescription || "No description provided."}
          </p>
        </div>
      </td>

      {/* Genre */}
      <td className="py-4">
        <span className="bg-[#1e1b4b] text-[#818cf8] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#312e81]">
          {book.genre}
        </span>
      </td>

      {/* Price */}
      <td className="py-4 text-sm font-semibold text-gray-300">
        ${book.price}
      </td>

      {/* Sales */}
      <td className="py-4 text-sm text-gray-400">0</td>

      {/* Status (Button) */}
      <td className="py-4">
        <button
          onClick={handleStatusToggle}
          className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all border ${
            book.publishingStatus === "Published"
              ? "bg-[#062f1e] text-[#4ade80] border-[#14532d] hover:bg-[#14532d]"
              : "bg-[#2a1215] text-[#f87171] border-[#4c1d24] hover:bg-[#4c1d24]"
          }`}
        >
          {book.publishingStatus}
        </button>
      </td>

      {/* Actions */}
      <td className="py-4 text-right pr-4">
        <div className="flex items-center justify-end gap-3 text-gray-400">
          <Link
            href={`/ebooks/${book._id}`}
            className="hover:text-emerald-400 p-1.5 hover:bg-[#161616] rounded-lg transition-all"
            title="View Book"
          >
            <Eye size={15} />
          </Link>

          <button
            onClick={() => onEdit(book)}
            className="hover:text-blue-400 p-1.5 hover:bg-[#161616] rounded-lg transition-all"
            title="Edit Book"
          >
            <Edit2 size={14} />
          </button>

          <button
            onClick={() => onDelete(book._id)}
            className="hover:text-rose-500 p-1.5 hover:bg-[#161616] rounded-lg transition-all"
            title="Delete Book"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;
