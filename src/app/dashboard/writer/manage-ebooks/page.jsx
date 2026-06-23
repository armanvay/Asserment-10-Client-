import React from "react";
import {
  Plus,
  Search,
  BookOpen,
  Eye,
  Edit2,
  Trash2,
  ToggleRight,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

const ManageBooks = () => {
  // ইমেজ অনুযায়ী স্ট্যাটিক ডেটা
  const booksData = [
    {
      id: 1,
      title: "UwU UwU UwU",
      subtitle: "Sequi recusandae De...",
      genre: "Drama",
      price: "$890",
      sales: 0,
      status: "published",
      image: "🪐", // এখানে ইমেজের বদলে ইমোজি দেওয়া, আপনি src বসিয়ে নিতে পারবেন
    },
    {
      id: 2,
      title: "Testing 2",
      subtitle: "Amet sed culpa sae...",
      genre: "Adventure",
      price: "$93",
      sales: 0,
      status: "published",
      image: "📖",
    },
    {
      id: 3,
      title: "ajono",
      subtitle: "asfasdf...",
      genre: "afad",
      price: "$129.99",
      sales: 0,
      status: "published",
      image: "📖",
    },
    {
      id: 4,
      title: "ajono",
      subtitle: "asfasdf...",
      genre: "afad",
      price: "$129.99",
      sales: 0,
      status: "published",
      image: "📖",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-12 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-200">
            Manage Books
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all your published and unpublished ebooks
          </p>
        </div>
        <Link href="/dashboard/writer/add-ebook" className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 self-start md:self-auto transition-colors text-sm">
          <Plus size={18} /> Add New Book
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Books */}
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold">Total Books</p>
            <h2 className="text-3xl font-bold mt-1">4</h2>
          </div>
          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
            <BookOpen size={20} />
          </div>
        </div>

        {/* Published */}
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold">Published</p>
            <h2 className="text-3xl font-bold mt-1">4</h2>
          </div>
          <div className="bg-green-100 p-2.5 rounded-lg text-green-600">
            <ToggleRight size={20} />
          </div>
        </div>

        {/* Total Sales */}
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold">Total Sales</p>
            <h2 className="text-3xl font-bold mt-1">0</h2>
          </div>
          <div className="bg-purple-100 p-2.5 rounded-lg text-purple-600">
            <Users size={20} />
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold">Revenue</p>
            <h2 className="text-3xl font-bold mt-1">$0.00</h2>
          </div>
          <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600">
            <DollarSign size={20} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <input
          type="text"
          placeholder="Search by title or genre..."
          className="w-full bg-[#141414] border border-[#222] rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-gray-700"
        />
      </div>

      {/* Books Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1f1f1f] text-[11px] font-bold tracking-wider text-gray-500 uppercase">
              <th className="pb-3 pl-2">Book</th>
              <th className="pb-3">Genre</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Sales</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181818]">
            {booksData.map((book) => (
              <tr key={book.id} className="hover:bg-[#111] transition-colors">
                {/* Book Info */}
                <td className="py-4 pl-2 flex items-center gap-3">
                  <div className="w-10 h-12 bg-[#1c1c1c] border border-[#2d2d2d] rounded flex items-center justify-center text-lg overflow-hidden">
                    {book.image}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">
                      {book.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {book.subtitle}
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
                  {book.price}
                </td>

                {/* Sales */}
                <td className="py-4 text-sm text-gray-400">{book.sales}</td>

                {/* Status */}
                <td className="py-4">
                  <span className="bg-[#062615] text-[#10b981] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#0a3d21]">
                    {book.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 text-right pr-4">
                  <div className="flex items-center justify-end gap-3 text-gray-400">
                    <button className="hover:text-white transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="hover:text-white transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button className="text-[#10b981] hover:opacity-80 transition-opacity">
                      <ToggleRight size={20} />
                    </button>
                    <button className="hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
