"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const SalesHistory = () => {
  // ১. সেশন থেকে লগইন থাকা রাইটারের ডাটা নেওয়া
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // ২. ডাইনামিক স্টেট ম্যানেজমেন্ট
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ৩. ব্যাকঅ্যান্ড থেকে সেলস ডাটা ফেচ করা
  useEffect(() => {
    const fetchSalesHistory = async () => {
      if (!user?.email) return;

      try {
        // আপনার এক্সপ্রেস ব্যাকঅ্যান্ডের রাইটার স্পেসিফিক সেলস এপিআই কল
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/payments/writer/${user.email}`,
        );
        const data = await res.json();

        setSalesData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sales history:", err);
        setError("Failed to load sales history.");
        setLoading(false);
      }
    };

    fetchSalesHistory();
  }, [user?.email]);

  // ৪. ডাইনামিক ক্যালকুলেশন (ডাটাবেজের ডাটা থেকে অটো হিসেব হবে)
  const totalSales = salesData.length;

  const totalRevenue = salesData.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0,
  );

  const averageSale =
    totalSales > 0 ? (totalRevenue / totalSales).toFixed(2) : "0.00";

  // লোডিং ও এরর হ্যান্ডলিং UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading sales history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] text-white p-6 md:p-12 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Sales History 💰
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track all purchases made on your stories.
        </p>
      </div>

      {/* Dynamic Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Sales Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <p className="text-gray-400 text-sm font-medium">Total Sales</p>
          <h2 className="text-4xl font-bold mt-2">{totalSales}</h2>
        </div>

        {/* Revenue Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <p className="text-gray-400 text-sm font-medium">Revenue</p>
          <h2 className="text-4xl font-bold mt-2">
            ${totalRevenue.toFixed(2)}
          </h2>
        </div>

        {/* Average Sale Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6">
          <p className="text-gray-400 text-sm font-medium">Average Sale</p>
          <h2 className="text-4xl font-bold mt-2">${averageSale}</h2>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#1c1c1c] text-gray-300 text-sm font-semibold border-b border-[#222]">
                <th className="p-4 pl-6">Book</th>
                <th className="p-4">Buyer</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6">Purchased On</th>
              </tr>
            </thead>

            {/* Dynamic Table Body */}
            <tbody className="divide-y divide-[#222]">
              {salesData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    No sales recorded yet.
                  </td>
                </tr>
              ) : (
                salesData.map((sale, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#1c1c1c] transition-colors text-sm"
                  >
                    <td className="p-4 pl-6 font-semibold text-white">
                      {sale.bookTitle}
                    </td>
                    <td className="p-4 text-gray-400">{sale.userEmail}</td>
                    <td className="p-4 font-semibold text-white">
                      ${parseFloat(sale.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-gray-500">
                      {sale.purchaseDate
                        ? new Date(sale.purchaseDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
