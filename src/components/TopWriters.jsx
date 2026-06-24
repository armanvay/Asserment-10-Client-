"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaAward } from "react-icons/fa"; // react-icons import
import Link from "next/link";

const TopWriters = () => {
  const writers = [
    {
      id: 1,
      name: "Humayun Ahmed",
      sales: "1.2k+ Sales",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    {
      id: 2,
      name: "Zafar Iqbal",
      sales: "950+ Sales",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    },
    {
      id: 3,
      name: "Rocko Rahman",
      sales: "820+ Sales",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
  ];

  return (
    <section className="py-12 bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
         
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <FaAward className="text-yellow-500 text-2xl sm:text-3xl animate-pulse" />{" "}
            Top Authors
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Meet our most popular and best-selling writers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {writers.map((writer, index) => (
            <motion.div
              key={writer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 text-center shadow-lg hover:border-zinc-700 transition-all duration-300"
            >
              {writer.avatar ? (
                <img
                  src={writer.avatar}
                  alt={writer.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-zinc-700 mb-4"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto bg-zinc-800 border-2 border-zinc-700 mb-4 flex items-center justify-center text-zinc-400">
                  <FaUserTie className="text-3xl" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-zinc-100">
                {writer.name}
              </h3>
              <p className="text-xs text-emerald-400 font-medium mt-1 bg-emerald-500/10 px-2 py-1 rounded-full inline-block">
                {writer.sales}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWriters;
