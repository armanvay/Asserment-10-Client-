"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EbooksPage = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // API call
  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks`); // 👈 তোমার backend URL বসাবে
        const data = await res.json();

        setEbooks(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load ebooks");
        setLoading(false);
      }
    };

    fetchEbooks();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading ebooks...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ebooks.map((book) => (
        <div
          key={book._id || book.bookTitle}
          className="border rounded-lg shadow-md overflow-hidden bg-white"
        >
          <Image
          width={300}
            height={300}
            src={book.coverImageUrl}
            alt={book.bookTitle}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="font-bold text-lg">{book.bookTitle}</h2>
            <p className="text-sm text-gray-500">{book.genre}</p>

            <p className="mt-2 text-sm">
              {book.shortDescription?.slice(0, 80)}...
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold text-green-600">
                ${book.price}
              </span>

              <Link href={`/ebooks/${book._id}`} className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
                Read
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EbooksPage;
