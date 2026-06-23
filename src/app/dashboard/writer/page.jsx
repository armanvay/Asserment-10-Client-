"use client";

import React, { useEffect, useState } from "react";
import {
  LuBookOpen,
  LuCoins,
  LuStar,
  LuTrendingUp,
  LuPlus,
} from "react-icons/lu";
import Link from "next/link"; // পেজ চেঞ্জ করার জন্য ইম্পোর্ট করা হলো
import { authClient } from "@/lib/auth-client"; // আপনার অথেনটিকেশন ক্লায়েন্ট

const WriterDashboardPage = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [booksData, setBooksData] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState(0); // বুকমার্ক কাউন্ট স্টেট
  const [loading, setLoading] = useState(true);

  // ২. ডাটাবেজ থেকে এই নির্দিষ্ট রাইটারের বই এবং বুকমার্কের ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;

      try {
        // রাইটারের নিজের বই নিয়ে আসা
        const booksRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ebooks/${user.email}`,
        );
        const booksData = await booksRes.json();
        setBooksData(booksData);

        // রাইটারের বুকমার্ক করা বইয়ের সংখ্যা নিয়ে আসা
        const bookmarkRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookmarks/${user.email}`,
        );
        const bookmarkData = await bookmarkRes.json();
        setBookmarkCount(bookmarkData.length); // বুকমার্কের সংখ্যা সেট করা হলো
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email]);

  // ডাইনামিক স্ট্যাটাস কার্ডের ভ্যালু
  const totalPublishedBooks = booksData.length;

  const stats = [
    {
      id: 1,
      label: "Published Stories",
      value: totalPublishedBooks,
      icon: LuBookOpen,
    },
    { id: 2, label: "Total Sales", value: "0", icon: LuCoins },
    { id: 3, label: "Bookmarks", value: bookmarkCount, icon: LuStar }, // বুকমার্কের সংখ্যা এখানে বসানো হয়েছে
    { id: 4, label: "Revenue", value: "$0.00", icon: LuTrendingUp },
  ];

  const activities = [
    "Welcome to your new dashboard!",
    booksData.length > 0
      ? `You have successfully tracked ${booksData.length} ebooks.`
      : "Start by publishing your very first ebook!",
  ];

  const monthlyData = [30, 40, 45, 60, 50, 70];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const reviews = [
    { text: "No reviews received yet. Keep pushing great content!", stars: 5 },
  ];

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] text-zinc-100 flex flex-col min-h-screen">
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* PROFILE SECTION (DYNAMIC) */}
        <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name}
                className="w-14 h-14 rounded-full object-cover border border-zinc-700"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold uppercase text-white">
                {user?.name ? user.name[0] : "A"}
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-white">
                {user?.name || "Writer"}
              </h2>
              <p className="text-sm text-zinc-400">Verified Writer</p>
              <p className="text-xs text-zinc-500">
                {totalPublishedBooks} ebooks published • Active creator
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <div className="p-2 bg-zinc-800 rounded-lg w-fit mb-2">
                  <stat.icon className="size-5 text-zinc-300" />
                </div>
                <p className="text-xs text-zinc-400">{stat.label}</p>
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          ))}
        </section>

        {/* QUICK ACTIONS (LINKED TO REAL ROUTES) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/writer/add-ebook"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block"
          >
            <h3 className="font-semibold text-white">📚 Add New Ebook</h3>
            <p className="text-sm text-zinc-400">Publish a new story</p>
          </Link>

          <Link
            href="/dashboard/writer/sales-history"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block"
          >
            <h3 className="font-semibold text-white">💰 Check Revenue</h3>
            <p className="text-sm text-zinc-400">View earnings</p>
          </Link>

          <Link
            href="/dashboard/writer/manage-ebooks"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block"
          >
            <h3 className="font-semibold text-white">⭐ Manage Ebooks</h3>
            <p className="text-sm text-zinc-400">See book list & feedback</p>
          </Link>
        </section>

        {/* CHART + ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Monthly Performance
            </h2>

            <div className="flex items-end justify-between h-44 gap-2">
              {monthlyData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full bg-zinc-800 rounded-md h-full flex items-end">
                    <div
                      className="w-full bg-white rounded-md transition-all duration-500"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500">{months[i]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <p key={i} className="text-sm text-zinc-300">
                  • {a}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* TOP STORIES + REVIEWS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Your Books Overview
            </h2>
            <div className="space-y-3">
              {booksData.slice(0, 3).map((book, i) => (
                <div
                  key={book._id || i}
                  className="flex justify-between items-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-10 bg-zinc-800 rounded flex items-center justify-center text-xs overflow-hidden">
                      {book.coverImageUrl ? (
                        <img
                          src={book.coverImageUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "📖"
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-200">
                        {book.bookTitle}
                      </p>
                      <span className="text-xs text-zinc-500">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-zinc-300">
                      ${book.price}
                    </p>
                    <p className="text-[11px] text-green-500">
                      {book.publishingStatus || "Published"}
                    </p>
                  </div>
                </div>
              ))}
              {booksData.length === 0 && (
                <p className="text-zinc-500 text-sm text-center py-4">
                  No stories published yet.
                </p>
              )}
            </div>
          </section>

          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">
              Latest Reviews
            </h2>
            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
                >
                  <div className="text-amber-400 text-xs mb-2">
                    {"★".repeat(r.stars)}
                    {"☆".repeat(5 - r.stars)}
                  </div>
                  <p className="text-sm text-zinc-300">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* DYNAMIC CTA FOOTER */}
        <footer className="bg-black border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-white">
              Keep creating inspiring stories
            </h3>
            <p className="text-xs text-zinc-400">
              Publish, manage, and grow your audience
            </p>
          </div>

          <Link
            href="/dashboard/writer/add-ebook"
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
          >
            <LuPlus className="size-4" />
            Publish Story
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default WriterDashboardPage;
