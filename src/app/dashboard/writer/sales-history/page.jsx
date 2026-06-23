import React from "react";
// Lucide icons ব্যবহার করা হয়েছে, আপনি চাইলে react-icons বা অন্য কিছু ব্যবহার করতে পারেন
import { DollarSign, ShoppingBag, BarChart3 } from "lucide-react";

const HistoryPage = () => {
  // স্ট্যাটিক ডেটা (ইমেজ অনুযায়ী)
  const salesData = [
    {
      book: "UwU UwU UwU",
      buyer: "wemmbu@gmail.com",
      amount: "$890",
      date: "6/16/2026",
    },
    {
      book: "UwU UwU UwU",
      buyer: "wemmbu@gmail.com",
      amount: "$890",
      date: "6/16/2026",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-12 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Sales History 💰
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Track all purchases made on your stories.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Sales Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
          <p className="text-gray-400 text-sm font-medium">Total Sales</p>
          <h2 className="text-4xl font-bold mt-2">2</h2>
        </div>

        {/* Revenue Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
          <p className="text-gray-400 text-sm font-medium">Revenue</p>
          <h2 className="text-4xl font-bold mt-2">$1780</h2>
        </div>

        {/* Average Sale Card */}
        <div className="bg-[#141414] border border-[#222] rounded-2xl p-6 relative overflow-hidden">
          <p className="text-gray-400 text-sm font-medium">Average Sale</p>
          <h2 className="text-4xl font-bold mt-2">$890.00</h2>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-[#141414] border border-[#222] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-[#f5f5f5] text-gray-700 text-sm font-semibold">
                <th className="p-4 pl-6">Book</th>
                <th className="p-4">Buyer</th>
                <th className="p-4">Amount</th>
                <th className="p-4 pr-6">Purchased On</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#222]">
              {salesData.map((sale, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#1c1c1c] transition-colors text-sm"
                >
                  <td className="p-4 pl-6 font-semibold text-white">
                    {sale.book}
                  </td>
                  <td className="p-4 text-gray-400">{sale.buyer}</td>
                  <td className="p-4 font-semibold text-white">
                    {sale.amount}
                  </td>
                  <td className="p-4 text-gray-500">{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
