"use client";

import React, { useEffect, useState } from "react";
import { LuBookOpen, LuHeart, LuHistory, LuShoppingBag } from "react-icons/lu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserDashboardPage = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [orders, setOrders] = useState([]); // পুরো অর্ডারের ডাটা রাখার জন্য স্টেট
  const [purchasedBooksCount, setPurchasedBooksCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ২. ড্যাশবোর্ড ডাটা ফেচ করা
  useEffect(() => {
    const fetchUserDashboardData = async () => {
      if (!user?.email) return;

      try {
        // ইউজারের কেনা বইয়ের সংখ্যা ও ডাটা নিয়ে আসা
        const ordersRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${user.email}`,
        );
        const ordersData = await ordersRes.json();
        setOrders(ordersData); // স্টেট আপডেট
        setPurchasedBooksCount(ordersData.length || 0);

        // ইউজারের বুকমার্ক করা বইয়ের সংখ্যা নিয়ে আসা
        const bookmarkRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookmarks/${user.email}`,
        );
        const bookmarkData = await bookmarkRes.json();
        setBookmarkCount(bookmarkData.length || 0);
      } catch (error) {
        console.error("Error fetching user dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDashboardData();
  }, [user?.email]);

  // ৩. ডাইনামিক ক্যালকুলেশন (Total Spent হিসেব করা)
  const totalSpent = orders.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0,
  );

  // স্ট্যাটাসカード কনফিগুরেশন (Total Spent ভ্যালু ডাইনামিক করা হলো)
  const stats = [
    {
      id: 1,
      label: "Purchased Books",
      value: purchasedBooksCount,
      icon: LuShoppingBag,
    },
    {
      id: 2,
      label: "Bookmarked Items",
      value: bookmarkCount,
      icon: LuHeart,
    },
    {
      id: 3,
      label: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`, // ডাইনামিক ভ্যালু এখানে সেট করা হয়েছে
      icon: LuBookOpen,
    },
  ];

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Loading Reader Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] text-zinc-100 flex flex-col min-h-screen w-screen">
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* PROFILE SECTION */}
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
                {user?.name ? user.name[0] : "R"}
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-white">
                {user?.name || "Reader"}
              </h2>
              <p className="text-sm text-zinc-400">Avid Reader & Collector</p>
              <p className="text-xs text-zinc-500">
                {purchasedBooksCount} books owned • {bookmarkCount} saved
                stories
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* QUICK NAVIGATION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/dashboard/user/purchased-ebooks"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block group"
          >
            <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
              📖 My Library
            </h3>
            <p className="text-sm text-zinc-400">
              Start reading your purchased ebooks
            </p>
          </Link>

          <Link
            href="/dashboard/user/bookmarks"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block group"
          >
            <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
              ❤️ Wishlist & Bookmarks
            </h3>
            <p className="text-sm text-zinc-400">
              View items you saved for later
            </p>
          </Link>

          <Link
            href="/dashboard/user/purchase-history"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 text-left transition-colors block group"
          >
            <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
              🕒 Purchase History
            </h3>
            <p className="text-sm text-zinc-400">
              Track your billing and transactions
            </p>
          </Link>
        </section>

        {/* WELCOME BANNER / DISCOVER MORE */}
        <footer className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-white">
              Hungry for more original stories?
            </h3>
            <p className="text-xs text-zinc-400">
              Explore hundreds of indie ebooks published by global writers.
            </p>
          </div>

          <Link
            href="/browse-ebooks"
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors"
          >
            Browse Catalog
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default UserDashboardPage;
