"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LuHistory, LuDownload } from "react-icons/lu";

const PurchaseHistory = () => {
  // ১. লগইন থাকা ইউজারের সেশন ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // স্টেট ম্যানেজমেন্ট
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ২. ডাটাবেজ থেকে এই ইউজারের কেনা সব অর্ডারের ডাটা নিয়ে আসা
  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-orders/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching purchase history:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // লোডিং স্ক্রিন
  if (loading && user?.email) {
    return (
      <div className="min-h-screen  bg-[#09090b] text-white flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-zinc-400 text-sm">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#09090b] min-h-screen w-screen text-zinc-100">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-zinc-800 rounded-lg text-white">
          <LuHistory className="size-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Purchase History</h1>
          <p className="text-xs text-zinc-400">
            View and manage your ebook transactions
          </p>
        </div>
      </div>

      {/* Table Container */}
      {orders.length === 0 ? (
        <div className="bg-[#18181b] border border-zinc-800 p-8 rounded-xl text-center text-zinc-500 text-sm">
          No transactions found. You havent bought any ebooks yet.
        </div>
      ) : (
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-4">Ebook Details</th>
                  <th className="py-4 px-4">Writer</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-zinc-900/40 transition-colors group"
                  >
                    {/* Image & Title */}
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-9 h-11 bg-zinc-800 border border-zinc-700 rounded flex items-center justify-center text-base overflow-hidden flex-shrink-0">
                        {order.coverImageUrl ? (
                          <img
                            src={order.coverImageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "📖"
                        )}
                      </div>
                      <span className="font-medium text-zinc-200 group-hover:text-white transition-colors line-clamp-1 max-w-[180px]">
                        {order.bookTitle}
                      </span>
                    </td>

                    {/* Writer */}
                    <td className="py-4 px-4 text-zinc-400">
                      {order.writerName || "Indie Writer"}
                    </td>

                    {/* Purchase Date */}
                    <td className="py-4 px-4 text-zinc-400">
                      {order.purchaseDate
                        ? new Date(order.purchaseDate).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-semibold text-zinc-200">
                      ${order.price}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-400 border border-emerald-900">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
