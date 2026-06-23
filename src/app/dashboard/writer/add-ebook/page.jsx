"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // রিডাইরেক্ট করার জন্য হুক ইম্পোর্ট করা হলো

const PublishEbookForm = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করা হলো

  const [formData, setFormData] = useState({
    bookTitle: "",
    genre: "",
    price: "",
    coverImageUrl: "",
    shortDescription: "",
    ebookContent: "",
    publishingStatus: "Published",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    setFormData((prev) => ({
      ...prev,
      coverImageUrl: "",
    }));

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({
          ...prev,
          coverImageUrl: result.data.url,
        }));

        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image!");
      }
    } catch (error) {
      alert("Something went wrong while uploading the image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImageUrl) {
      alert("Please upload a cover image first!");
      return;
    }

    const ebookData = {
      ...formData,
      writerName: user?.name,
      writerEmail: user?.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ebookData),
      });

      const data = await res.json();

      if (data.acknowledged || data.success) {
        alert("Ebook Published Successfully!");

        // স্টেট রিসেট করা
        setFormData({
          bookTitle: "",
          genre: "",
          price: "",
          coverImageUrl: "",
          shortDescription: "",
          ebookContent: "",
          publishingStatus: "Published",
        });

        // সফলভাবে পাবলিশ হওয়ার পর রিডাইরেক্ট
        router.push("/dashboard/writer/manage-ebooks");
      } else {
        alert(data.message || "Failed to publish ebook!");
      }
    } catch (error) {
      alert("Server Error! Please try again.");
    }
  };

  return (
    <div className="min-h-screen  w-screen max-w-7xl border border-green-300 bg-[#0d0d0d] text-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Publish a New Ebook
          </h2>
          <p className="text-sm text-gray-400">
            Share your stories with readers around the world.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Title */}
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full bg-[#181818] p-3 rounded-xl text-white outline-none"
            required
          />

          {/* Genre + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="bg-[#181818] p-3 rounded-xl text-white outline-none"
              required
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="bg-[#181818] p-3 rounded-xl text-white outline-none"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 block">Cover Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full bg-[#181818] p-3 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white file:text-black"
              required={!formData.coverImageUrl}
            />

            {uploading && (
              <p className="text-yellow-500 text-sm">Uploading image...</p>
            )}

            {formData.coverImageUrl && (
              <div className="mt-3">
                <p className="text-green-500 text-sm mb-2">
                  Image uploaded successfully!
                </p>

                <img
                  src={formData.coverImageUrl}
                  alt="Preview"
                  className="w-32 h-44 object-cover rounded-xl border border-gray-700"
                />
              </div>
            )}
          </div>

          {/* Short Description */}
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            rows={3}
            className="w-full bg-[#181818] p-3 rounded-xl text-white outline-none"
            required
          />

          {/* Ebook Content */}
          <textarea
            name="ebookContent"
            value={formData.ebookContent}
            onChange={handleChange}
            placeholder="Ebook Content"
            rows={8}
            className="w-full bg-[#181818] p-3 rounded-xl text-white outline-none"
            required
          />

          {/* Publishing Status */}
          <select
            name="publishingStatus"
            value={formData.publishingStatus}
            onChange={handleChange}
            className="w-full bg-[#181818] p-3 rounded-xl text-white outline-none"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={user?.role !== "writer" || uploading}
            className={`w-full p-3 rounded-xl font-semibold transition ${
              user?.role === "writer" && !uploading
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
          >
            {uploading
              ? "Uploading Image..."
              : user?.role === "writer"
                ? "Publish Ebook"
                : "Only Writers Can Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishEbookForm;
