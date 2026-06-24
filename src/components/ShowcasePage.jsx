"use client";

import React, { useState } from "react";
import {
  Trophy,
  Flame,
  Star,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Users,
} from "lucide-react";

const ShowcasePage = () => {
  // ডেমো ডাটা (পরবর্তীতে ব্যাকএন্ড বা ডাটাবেজ থেকে নিয়ে আসতে পারবে)
  const [topAuthors] = useState([
    {
      id: 1,
      name: "Arman",
      books: 12,
      sales: "1.2k",
      rating: 4.9,
      points: 2500,
      badge: "Grandmaster",
    },
    {
      id: 2,
      name: "Salman",
      books: 8,
      sales: "940",
      rating: 4.7,
      points: 1850,
      badge: "Expert",
    },
    {
      id: 3,
      name: "Hasan",
      books: 9,
      sales: "820",
      rating: 4.8,
      points: 1720,
      badge: "Expert",
    },
    {
      id: 4,
      name: "Asif",
      books: 6,
      sales: "500",
      rating: 4.5,
      points: 1200,
      badge: "Rising Star",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#070708] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none"></div>

      {/* Hero Section with Unique Gradient */}
      <div className="relative z-10 max-w-6xl mx-auto text-center md:text-left my-8 space-y-4">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 backdrop-blur-md">
          <Sparkles size={14} className="animate-pulse" /> Creator Arena
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Top Creators <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
           Ebooks 
          </span>
        </h1>
        <p className="text-zinc-500 text-sm md:text-base max-w-xl">
          Meet the minds behind the most successful ebooks. Track live stats,
          leaderboards, and milestones.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 relative z-10">
        {/* Left 2 Columns: Leaderboard Table */}
        <div className="lg:col-span-2 bg-[#0d0d11]/60 border border-zinc-900 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Trophy size={18} className="text-amber-500" /> Creator
              Leaderboard
            </h3>
            <span className="text-xs text-zinc-500">Updated hourly</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-900 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
                  <th className="pb-3 pl-2">Rank</th>
                  <th className="pb-3">Author</th>
                  <th className="pb-3">Books</th>
                  <th className="pb-3">Sales</th>
                  <th className="pb-3 text-right pr-2">XP Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/50">
                {topAuthors.map((author, index) => (
                  <tr
                    key={author.id}
                    className="hover:bg-zinc-900/30 transition-colors group"
                  >
                    {/* Rank */}
                    <td className="py-4 pl-2 font-bold text-sm">
                      {index === 0
                        ? "🥇"
                        : index === 1
                          ? "🥈"
                          : index === 2
                            ? "🥉"
                            : `#${index + 1}`}
                    </td>

                    {/* Author Info */}
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                        {author.name[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors">
                          {author.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 font-medium bg-zinc-900 px-2 py-0.5 rounded-md border border-zinc-800">
                          {author.badge}
                        </span>
                      </div>
                    </td>

                    {/* Books Count */}
                    <td className="py-4 text-sm text-zinc-400">
                      {author.books}
                    </td>

                    {/* Sales */}
                    <td className="py-4 text-sm font-semibold text-emerald-400">
                      {author.sales}
                    </td>

                    {/* XP Points */}
                    <td className="py-4 text-right pr-2 text-sm font-mono text-purple-400">
                      {author.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Platform Highlights & Goals */}
        <div className="space-y-6">
          {/* Card 1: Live Platform Stats */}
          <div className="bg-gradient-to-br from-[#12121a] to-[#0a0a0f] border border-zinc-900 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Flame size={80} className="text-orange-500" />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Flame size={16} className="text-orange-500" /> Platform Hot
              Streak
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-black text-white">45,210+</p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Total Ebooks Read This Week
                </p>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-[78%]"></div>
              </div>
              <p className="text-[11px] text-zinc-400">
                🔥 78% closer to monthly target milestones.
              </p>
            </div>
          </div>

          {/* Card 2: Community Challenge */}
          <div className="bg-[#0d0d11]/60 border border-zinc-900 backdrop-blur-xl rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
              <Star size={16} className="text-amber-400" /> Creator Challenge
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Publish a new ebook in the{" "}
              <span className="text-zinc-300 font-semibold">Sci-Fi</span> or{" "}
              <span className="text-zinc-300 font-semibold">Tech</span> genre
              this month and earn double XP points + guaranteed featured slot!
            </p>
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors group">
              Join Challenge{" "}
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;
