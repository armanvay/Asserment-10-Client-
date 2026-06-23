"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { 
  LuBookOpen, 
  LuShoppingBag, 
  LuHeart, 
  LuClock, 
  LuUser, 
  LuMail, 
  LuCalendar,
  LuChevronRight
} from "react-icons/lu";

const UserProfile = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [purchasedCount, setPurchasedCount] = useState(0);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ২. ড্যাশবোর্ড ডাটাবেজ থেকে ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.email) return;

      try {
        // কেনা বইয়ের সংখ্যা
        const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${user.email}`);
        const ordersData = await ordersRes.json();
        setPurchasedCount(ordersData.length || 0);

        // বুকমার্ক করা বইয়ের সংখ্যা
        const bookmarkRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookmarks/${user.email}`);
        const bookmarkData = await bookmarkRes.json();
        setBookmarkCount(bookmarkData.length || 0);
      } catch (error) {
        console.error("Error fetching profile stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.email]);

  if (loading && user?.email) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#09090b] text-zinc-100 min-h-screen w-screen">
      
      {/* TOP HEADER HERO BANNER (As per image_281897.png) */}
      <section className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 border-b border-zinc-800 px-6 py-8 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          {/* Avatar Area */}
          <div className="relative">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold uppercase text-white shadow-xl">
                {user?.name ? user.name[0] : "U"}
              </div>
            )}
            <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-zinc-900" title="Online"></span>
          </div>

          {/* User Meta */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-wide">{user?.name || "Username"}</h1>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-xs text-zinc-300">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <LuUser size={12} /> Reader
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <LuMail size={13} /> {user?.email}
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <LuCalendar size={13} /> Member since June 2026
              </span>
            </div>
          </div>
        </div>

        {/* Action Top Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/user/purchased-ebooks" className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-xs font-semibold px-4 py-2 rounded-lg transition">
            📖 My Ebooks
          </Link>
          <Link href="/dashboard/user/bookmarks" className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 text-xs font-semibold px-4 py-2 rounded-lg transition">
            ❤️ Bookmarks
          </Link>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE: STATS & ACCOUNT DETAILS */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Activity Stats Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Activity Stats</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-blue-950/20 border border-blue-900/30 rounded-xl">
                <div className="flex items-center gap-3 text-blue-400">
                  <LuBookOpen size={18} /> <span className="text-sm font-medium text-zinc-300">Books Read</span>
                </div>
                <span className="text-lg font-bold text-blue-400">{purchasedCount}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl">
                <div className="flex items-center gap-3 text-emerald-400">
                  <LuShoppingBag size={18} /> <span className="text-sm font-medium text-zinc-300">Purchased</span>
                </div>
                <span className="text-lg font-bold text-emerald-400">{purchasedCount}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl">
                <div className="flex items-center gap-3 text-rose-400">
                  <LuHeart size={18} /> <span className="text-sm font-medium text-zinc-300">Bookmarks</span>
                </div>
                <span className="text-lg font-bold text-rose-400">{bookmarkCount}</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl">
                <div className="flex items-center gap-3 text-purple-400">
                  <LuClock size={18} /> <span className="text-sm font-medium text-zinc-300">Last Active</span>
                </div>
                <span className="text-xs font-semibold text-purple-400">Just Now</span>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Account Details</h3>
            
            <div className="divide-y divide-zinc-800 text-sm">
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">User ID</span>
                <span className="text-zinc-300 font-mono text-xs max-w-[150px] truncate">{user?.id || "6a30f9458722..."}</span>
              </div>
              <div className="flex justify-between py-3 items-center">
                <span className="text-zinc-400">Email Verified</span>
                <span className="bg-amber-950 text-amber-400 border border-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">Verified</span>
              </div>
              <div className="flex justify-between py-3 items-center">
                <span className="text-zinc-400">Account Status</span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-zinc-400">Account Type</span>
                <span className="text-zinc-300 font-medium">Reader</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: RECENT ACTIVITY & BOX CARDS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Activity Logs */}
          <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Recent Activity</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-zinc-800 text-emerald-400 rounded-full"><LuShoppingBag size={14} /></span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Logged into Fable Dashboard</p>
                    <p className="text-xs text-zinc-500">Today</p>
                  </div>
                </div>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">System</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="p-2 bg-zinc-800 text-rose-400 rounded-full"><LuHeart size={14} /></span>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Synchronized wishlist & bookmarks</p>
                    <p className="text-xs text-zinc-500">Just now</p>
                  </div>
                </div>
                <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">Sync</span>
              </div>
            </div>
          </div>

          {/* TWO COLORFUL BOTTOM CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* My Library Box */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between h-40 hover:border-zinc-700 transition">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base">My Library</h4>
                  <LuBookOpen className="text-zinc-500 size-5" />
                </div>
                <p className="text-xs text-zinc-400 mt-1">View all your purchased ebooks</p>
              </div>
              <Link href="/dashboard/user/purchased-ebooks" className="flex items-center gap-1 w-fit bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold px-4 py-2 rounded-xl text-white transition">
                Go to Library <LuChevronRight size={14} />
              </Link>
            </div>

            {/* Saved Books Box (Purple theme from image_281897.png) */}
            <div className="bg-gradient-to-br from-purple-700 to-purple-900 border border-purple-600 rounded-2xl p-5 flex flex-col justify-between h-40 shadow-lg shadow-purple-900/20 hover:from-purple-600 hover:to-purple-800 transition">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-base">Saved Books</h4>
                  <LuHeart className="text-purple-200 size-5 fill-white/20" />
                </div>
                <p className="text-xs text-purple-200/80 mt-1">Manage your bookmarks</p>
              </div>
              <Link href="/dashboard/user/bookmarks" className="flex items-center gap-1 w-fit bg-white text-purple-900 hover:bg-purple-50 text-xs font-bold px-4 py-2 rounded-xl transition shadow-md">
                View Bookmarks <LuChevronRight size={14} />
              </Link>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};

export default UserProfile;