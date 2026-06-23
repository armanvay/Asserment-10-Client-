"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  ToggleRight,
  Users,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import BookRow from "@/components/BookRow";
import EditBookModal from "@/components/EditBookModal";


const ManageBooks = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [booksData, setBooksData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // মডাল স্টেট
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ebooks/${user.email}`,
      );
      const data = await res.json();
      setBooksData(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [user?.email]);

  // ডিলিট লজিক
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        alert("Book deleted successfully!");
        setBooksData(booksData.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // এডিট ওপেন লজিক
  const openEditModal = (book) => {
    setEditingBook({ ...book });
    setIsEditModalOpen(true);
  };

  // এডিট সাবমিট লজিক
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${editingBook._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingBook),
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        alert("Book updated successfully!");
        setIsEditModalOpen(false);
        fetchBooks();
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const filteredBooks = booksData.filter(
    (book) =>
      book.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[#0d0d0d] text-white p-6 md:p-12 font-sans relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-200">
            Manage Books
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all your published and unpublished ebooks
          </p>
        </div>
        <Link
          href="/dashboard/writer/add-ebook"
          className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm"
        >
          <Plus size={18} /> Add New Book
        </Link>
      </div>

      {/* Stats Cards (কোড ছোট রাখার জন্য ভেতরের অংশ আগের মতোই থাকবে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#141414] border border-[#1f1f1f] rounded-xl p-5 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs font-semibold">Total Books</p>
            <h2 className="text-3xl font-bold mt-1">{booksData.length}</h2>
          </div>
          <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
            <BookOpen size={20} />
          </div>
        </div>
        {/* বাকি ৩টি কার্ডও আগের মতোই থাকবে... */}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title or genre..."
          className="w-full bg-[#141414] border border-[#222] rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-gray-700"
        />
      </div>

      {/* Books Table */}
      <div className="w-full overflow-x-auto">
        {filteredBooks.length === 0 ? (
          <div className="bg-[#121212] border border-[#1f1f1f] rounded-xl p-8 text-center">
            <p className="text-gray-500 text-sm">
              No books found. Try creating one!
            </p>
          </div>
        ) : (
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
              {filteredBooks.map((book) => (
                <BookRow
                  key={book._id}
                  book={book}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onRefresh={fetchBooks}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal Component */}
      <EditBookModal
        isOpen={isEditModalOpen}
        book={editingBook}
        onClose={() => setIsEditModalOpen(false)}
        onChange={setEditingBook}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default ManageBooks;
