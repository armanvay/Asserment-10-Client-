"use client";

import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

const BookRow = ({ book, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-[#111] transition-colors">
      {/* Book Image & Info */}
      <td className="py-4 pl-2 flex items-center gap-3">
        <div className="w-10 h-12 bg-[#1c1c1c] border border-[#2d2d2d] rounded flex items-center justify-center text-lg overflow-hidden flex-shrink-0">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.bookTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            "📖"
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-200">
            {book.bookTitle}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 max-w-[180px]">
            {book.shortDescription}
          </p>
        </div>
      </td>

      {/* Genre */}
      <td className="py-4">
        <span className="bg-[#0f1e36] text-[#3b82f6] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#1d3557]">
          {book.genre}
        </span>
      </td>

      {/* Price */}
      <td className="py-4 text-sm font-semibold text-gray-300">
        ${book.price}
      </td>

      {/* Sales */}
      <td className="py-4 text-sm text-gray-400">0</td>

      {/* Status */}
      <td className="py-4">
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
            book.publishingStatus === "Published"
              ? "bg-[#062615] text-[#10b981] border-[#0a3d21]"
              : "bg-[#2a1b0a] text-[#f59e0b] border-[#4d3311]"
          }`}
        >
          {book.publishingStatus || "Published"}
        </span>
      </td>

      {/* Actions */}
      <td className="py-4 text-right pr-4">
        <div className="flex items-center justify-end gap-3 text-gray-400">
          <Link
            href={`/ebooks/${book._id}`}
            className="hover:text-white transition-colors"
            title="View Book"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => onEdit(book)}
            className="hover:text-white transition-colors"
            title="Edit Book"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="hover:text-red-500 transition-colors"
            title="Delete Book"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookRow;
