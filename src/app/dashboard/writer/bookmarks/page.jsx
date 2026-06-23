import React from "react";

const BookmarkedBooks = () => {
  // ইমেজ অনুযায়ী স্ট্যাটিক ডেটা
  const booksData = [
    {
      title: "The Silent Horizon",
      author: "Elena Rivers",
      price: "$12.99",
      date: "23/06/2026",
    },
    {
      title: "Ashes of Tomorrow",
      author: "Mark Dalton",
      price: "$9.5",
      date: "23/06/2026",
    },
    {
      title: "Neon Dreams",
      author: "Aiko Tanaka",
      price: "$15",
      date: "23/06/2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-12 font-sans">
      {/* Header Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📚 Bookmarked Books
        </h1>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto rounded-lg border border-[#1a1a1a]">
        <table className="w-full text-left border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#141414] text-gray-300 text-sm font-semibold border-b border-[#1a1a1a]">
              <th className="p-4 pl-6 border-r border-[#1a1a1a] w-1/4">
                Title
              </th>
              <th className="p-4 border-r border-[#1a1a1a] w-1/4">Author</th>
              <th className="p-4 border-r border-[#1a1a1a] w-1/4">Price</th>
              <th className="p-4 pr-6 w-1/4">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#1a1a1a]">
            {booksData.map((book, index) => (
              <tr
                key={index}
                className="hover:bg-[#111111] transition-colors text-sm text-gray-200"
              >
                <td className="p-4 pl-6 border-r border-[#1a1a1a] font-medium">
                  {book.title}
                </td>
                <td className="p-4 border-r border-[#1a1a1a] text-gray-300">
                  {book.author}
                </td>
                <td className="p-4 border-r border-[#1a1a1a] text-gray-300">
                  {book.price}
                </td>
                <td className="p-4 pr-6 text-gray-400">{book.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookmarkedBooks;
