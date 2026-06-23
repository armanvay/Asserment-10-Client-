"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  LuDollarSign,
  LuRefreshCw,
  LuCalendar,
  LuUser,
  LuBookOpen,
} from "react-icons/lu";

const AdminTarnsctionsHitorypage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Security Check (অ্যাডমিন ছাড়া অন্য কেউ ঢুকলে হোমপেজে পাঠিয়ে দেবে)
  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, isPending, router]);

  // 📦 ডাটাবেজ থেকে সব ট্রানজেকশন/অর্ডার ফেচ করার ফাংশন
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      // ব্যাকএন্ডের সব পেমেন্ট হিস্ট্রি গেট করার API (নিচে ব্যাকএন্ড কোডটি দেওয়া আছে)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payments`,
      );
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTransactions();
    }
  }, [user]);

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">
            Loading transactions history...
          </p>
        </div>
      </div>
    );
  }

  // মোট কত টাকা ইনকাম হলো তা ফ্রন্টএন্ডেও একবার যোগ করে দেখানো
  const totalRevenue = transactions.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0,
  );

  return (
    <div className="bg-[#09090b] text-zinc-100 p-4 sm:p-6 lg:p-8 min-h-screen w-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* হেডার সেকশন */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <LuDollarSign className="text-emerald-400" /> Transactions History
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Total Sales:{" "}
              <span className="text-white font-semibold">
                {transactions.length}
              </span>{" "}
              | Total Revenue:{" "}
              <span className="text-emerald-400 font-semibold">
                {" "}
                ${totalRevenue.toFixed(2)}
              </span>
            </p>
          </div>
          <button
            onClick={fetchTransactions}
            className="self-start sm:self-center p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium"
            title="Refresh list"
          >
            <LuRefreshCw className="size-4" /> Refresh
          </button>
        </div>

        {/* ট্রানজেকশন টেবিল কন্টেইনার */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/50 border-b border-zinc-800 text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                  <th className="p-4">Transaction Details</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Writer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-sm">
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-zinc-900/20 transition-colors"
                  >
                    {/* বইয়ের নাম ও সেশন আইডি */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <LuBookOpen className="text-zinc-500 size-4 flex-shrink-0" />
                        <div>
                          <p
                            className="font-medium text-white truncate max-w-[200px] sm:max-w-xs"
                            title={tx.bookTitle}
                          >
                            {tx.bookTitle || "Unknown Book"}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate max-w-[150px]">
                            ID:{" "}
                            {tx.sessionId
                              ? `${tx.sessionId.slice(0, 15)}...`
                              : tx._id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* কাস্টমার বা ইউজারের ইমেইল */}
                    <td className="p-4 text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <LuUser className="size-3.5 text-zinc-500" />
                        <span
                          className="truncate max-w-[160px]"
                          title={tx.userEmail}
                        >
                          {tx.userEmail || tx.email || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* রাইটারের ইমেইল */}
                    <td
                      className="p-4 text-zinc-400 truncate max-w-[160px]"
                      title={tx.writerName || tx.writerEmail}
                    >
                      {tx.writerName || tx.writerEmail || "Platform"}
                    </td>

                    {/* কেনার তারিখ */}
                    <td className="p-4 text-zinc-400">
                      <div className="flex items-center gap-1.5 text-xs">
                        <LuCalendar className="size-3.5 text-zinc-500" />
                        {tx.purchaseDate
                          ? new Date(tx.purchaseDate).toLocaleDateString()
                          : "Recent"}
                      </div>
                    </td>

                    {/* ট্রানজেকশন অ্যামাউন্ট বা দাম */}
                    <td className="p-4 text-right font-semibold text-emerald-400">
                      +${parseFloat(tx.price || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* কোনো ট্রানজেকশন না থাকলে এম্পটি স্টেট */}
          {transactions.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No transactions recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTarnsctionsHitorypage;
