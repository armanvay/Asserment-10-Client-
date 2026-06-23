"use client";

import React, { useEffect, useState } from "react";
import {
  LuUsers,
  LuBookOpen,
  LuDollarSign,
  LuClock,
  LuShieldAlert,
  LuSettings,
  LuLayers,
} from "react-icons/lu";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminDashboardPage = () => {
  const router = useRouter();

  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // ডাইনামিক ডাটা রাখার জন্য স্টেটসমূহ
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [totalEbooksCount, setTotalEbooksCount] = useState(0);
  const [pendingBooksCount, setPendingBooksCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  // ২. সিকিউরিটি চেক এবং নতুন /admin-stats API থেকে ডাটা ফেচ করা
  useEffect(() => {
    // সেশন লোড শেষ হলে ইউজার এডমিন না হলে হোমপেজে পাঠিয়ে দেবে
    if (!isPending && (!user || user?.role !== "admin")) {
      router.push("/");
      return;
    }

    const fetchAdminDashboardData = async () => {
      try {
        // ব্যাকএন্ডের নতুন ওয়ান-স্টপ এপিআই কল করা হচ্ছে
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin-stats`,
        );
        const data = await res.json();

        // একবারে সব স্টেট আপডেট
        setTotalUsersCount(data.totalUsers || 0);
        setTotalEbooksCount(data.totalEbooks || 0);
        setPendingBooksCount(data.pendingBooks || 0);
        setTotalRevenue(data.totalRevenue || 0);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchAdminDashboardData();
    }
  }, [user, isPending, router]);

  // লোডিং স্ক্রিন
  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Securing Admin Panel...</p>
        </div>
      </div>
    );
  }

  // ৪টি স্ট্যাটাসカード কনফিগুরেশন (রিয়েল ডাটা পাস করা হয়েছে)
  const statCards = [
    {
      id: 1,
      label: "Total Users",
      value: totalUsersCount,
      icon: LuUsers,
      color: "text-blue-400",
    },
    {
      id: 2,
      label: "Total Ebooks",
      value: totalEbooksCount,
      icon: LuBookOpen,
      color: "text-emerald-400",
    },
    {
      id: 3,
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: LuDollarSign,
      color: "text-amber-400",
    },
    {
      id: 4,
      label: "Pending Approvals",
      value: pendingBooksCount,
      icon: LuClock,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="bg-[#09090b] text-zinc-100 flex flex-col min-h-screen">
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* এডমিন প্রোফাইল হেডার */}
        <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl font-bold uppercase text-white shadow-md">
              👑
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {user?.name || "Admin"}{" "}
                <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">
                  Super Admin
                </span>
              </h2>
              <p className="text-sm text-zinc-400">{user?.email}</p>
            </div>
          </div>
          <div className="text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            System Status:{" "}
            <span className="text-green-400 font-medium">Healthy</span>
          </div>
        </section>

        {/* চারটা মূল স্ট্যাটাস কার্ড */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 flex justify-between items-center hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg w-fit mb-2">
                  <card.icon className={`size-5 ${card.color}`} />
                </div>
                <p className="text-xs text-zinc-400">{card.label}</p>
              </div>
              <span className="text-3xl font-bold tracking-tight text-white">
                {card.value}
              </span>
            </div>
          ))}
        </section>

        {/* এডমিন অ্যাকশন কন্ট্রোল কেন্দ্র */}
        <h3 className="text-base font-semibold text-zinc-400 pt-2">
          System Management
        </h3>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/admin/manage-users"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 block group transition-colors"
          >
            <div className="flex items-center gap-3 mb-2 text-white font-semibold group-hover:text-blue-400 transition-colors">
              <LuUsers className="size-5" />
              <h4>Manage Users</h4>
            </div>
            <p className="text-xs text-zinc-400">
              Control roles, block users & view user list.
            </p>
          </Link>

          <Link
            href="/dashboard/admin/pending-ebooks"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 block group transition-colors"
          >
            <div className="flex items-center gap-3 mb-2 text-white font-semibold group-hover:text-rose-400 transition-colors">
              <LuShieldAlert className="size-5" />
              <h4>Ebook Approval</h4>
            </div>
            <p className="text-xs text-zinc-400">
              Approve or reject books submitted by writers.
            </p>
          </Link>

          <Link
            href="/dashboard/admin/categories"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 block group transition-colors"
          >
            <div className="flex items-center gap-3 mb-2 text-white font-semibold group-hover:text-emerald-400 transition-colors">
              <LuLayers className="size-5" />
              <h4>Book Categories</h4>
            </div>
            <p className="text-xs text-zinc-400">
              Add, delete or modify ebook book categories.
            </p>
          </Link>

          <Link
            href="/dashboard/admin/settings"
            className="bg-[#18181b] border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 block group transition-colors"
          >
            <div className="flex items-center gap-3 mb-2 text-white font-semibold group-hover:text-amber-400 transition-colors">
              <LuSettings className="size-5" />
              <h4>Platform Settings</h4>
            </div>
            <p className="text-xs text-zinc-400">
              Manage notices, system maintenance & site configurations.
            </p>
          </Link>
        </section>

        {/* সিস্টেম লগ */}
        <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
          <h3 className="text-sm font-semibold mb-3 text-white">
            System Logs Overview
          </h3>
          <div className="space-y-2 text-xs text-zinc-400">
            <p className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              • {pendingBooksCount} new ebooks are waiting in the verification
              queue.
            </p>
            <p className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              • Total platform user base synced with MongoDB Atlas successfully.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
