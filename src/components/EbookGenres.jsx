"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaUserSecret,
  FaHeart,
  FaRocket,
  FaDragon,
  FaGhost,
  FaGhost as FaGridIcon,
} from "react-icons/fa"; // react-icons imports

const EbookGenres = () => {
  const router = useRouter();

  const genres = [
    {
      name: "Fiction",
      icon: <FaQuoteLeft className="text-blue-400" />,
      count: "120 Books",
      bg: "hover:border-blue-500/50",
    },
    {
      name: "Mystery",
      icon: <FaUserSecret className="text-purple-400" />,
      count: "85 Books",
      bg: "hover:border-purple-500/50",
    },
    {
      name: "Romance",
      icon: <FaHeart className="text-pink-400" />,
      count: "94 Books",
      bg: "hover:border-pink-500/50",
    },
    {
      name: "Sci-Fi",
      icon: <FaRocket className="text-cyan-400" />,
      count: "62 Books",
      bg: "hover:border-cyan-500/50",
    },
    {
      name: "Fantasy",
      icon: <FaDragon className="text-yellow-400" />,
      count: "110 Books",
      bg: "hover:border-yellow-500/50",
    },
    {
      name: "Horror",
      icon: <FaGhost className="text-red-400" />,
      count: "43 Books",
      bg: "hover:border-red-500/50",
    },
  ];

  const handleGenreClick = (genreName) => {
    router.push(`/browse?genre=${genreName.toLowerCase()}`);
  };

  return (
    <section className="py-12 bg-[#09090b] text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            Explore Genres
          </h2>
          <p className="text-zinc-400 text-sm mt-2">
            Find your next favorite story by category
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleGenreClick(genre.name)}
              className={`bg-[#18181b] border border-zinc-800 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 ${genre.bg} group`}
            >
              <div className="text-3xl flex justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                {genre.icon}
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white">
                {genre.name}
              </h3>
              <p className="text-[11px] text-zinc-500 mt-1">{genre.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EbookGenres;
