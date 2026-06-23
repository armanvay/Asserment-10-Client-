"use client";

import React from "react";

const EditBookModal = ({ isOpen, book, onClose, onChange, onSubmit }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-[#141414] border border-[#222] rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto text-zinc-200">
        <h3 className="text-xl font-bold text-white mb-4">
          Edit Ebook Details
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 font-semibold block mb-1">
              Book Title
            </label>
            <input
              type="text"
              value={book.bookTitle || ""}
              onChange={(e) => onChange({ ...book, bookTitle: e.target.value })}
              className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">
                Genre
              </label>
              <input
                type="text"
                value={book.genre || ""}
                onChange={(e) => onChange({ ...book, genre: e.target.value })}
                className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-semibold block mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={book.price || ""}
                onChange={(e) => onChange({ ...book, price: e.target.value })}
                className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-semibold block mb-1">
              Publishing Status
            </label>
            <select
              value={book.publishingStatus || "Published"}
              onChange={(e) =>
                onChange({ ...book, publishingStatus: e.target.value })
              }
              className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="Published">Published</option>
              <option value="Unpublished">Unpublished</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-semibold block mb-1">
              Short Description
            </label>
            <textarea
              value={book.shortDescription || ""}
              onChange={(e) =>
                onChange({ ...book, shortDescription: e.target.value })
              }
              rows={3}
              className="w-full bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
              required
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
