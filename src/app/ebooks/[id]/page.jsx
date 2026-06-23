"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const EbookDetailsPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { id } = useParams();

  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= ROLE LOGIC =================
  const isLoggedIn = !!user;

  const userRole = user?.role;

  const isWriter = userRole === "writer";
  const isAdmin = userRole === "admin";

  const canBuy = isLoggedIn && !isWriter && !isAdmin;

  // fetch ebook
  useEffect(() => {
    const fetchEbook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks/${id}`,
        );

        const data = await res.json();
        setEbook(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load ebook");
        setLoading(false);
      }
    };

    if (id) fetchEbook();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400">
        Loading ebook details...
      </p>
    );

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!ebook)
    return <p className="text-center mt-10 text-gray-500">Ebook not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      {/* COVER IMAGE */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={ebook.coverImageUrl}
          alt={ebook.bookTitle}
          fill
          className="object-cover"
        />
      </div>

      {/* TITLE + INFO */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{ebook.bookTitle}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
          <p>📚 Genre: {ebook.genre}</p>
          <p>💰 Price: ${ebook.price}</p>

          <p>
            📅 Date:{" "}
            {ebook.createdAt
              ? new Date(ebook.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            Status:{" "}
            <span className="text-green-400">{ebook.publishingStatus}</span>
          </p>
        </div>

        {/* WRITER */}
        <div className="mt-4">
          <p className="text-gray-300">
            ✍ Writer:{" "}
            <Link href="#" className="text-blue-400 underline">
              {ebook.writerName || "Unknown"}
            </Link>
          </p>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-300">{ebook.shortDescription}</p>
        </div>

        {/* CONTENT PREVIEW */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Preview Content</h2>

          <div className="bg-[#111] p-4 rounded-lg text-gray-300 whitespace-pre-line max-h-[300px] overflow-y-auto">
            {ebook.ebookContent?.slice(0, 500)}...
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-8 flex gap-4">
          {/* BUY BUTTON */}
          <button
            disabled={!canBuy}
            className={`px-6 py-3 rounded-xl font-semibold transition
              ${
                canBuy
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500 cursor-not-allowed"
              }
            `}
          >
            {!isLoggedIn
              ? "Login to Buy"
              : isWriter
                ? "You can't buy your own book"
                : isAdmin
                  ? "Admin can't buy"
                  : `Buy Now ($${ebook.price})`}
          </button>

          {/* BOOKMARK */}
          <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-xl">
            ❤️ Bookmark
          </button>
        </div>
      </div>
    </div>
  );
};

export default EbookDetailsPage;
