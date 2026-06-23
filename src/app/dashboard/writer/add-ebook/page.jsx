"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const PublishEbookForm = () => {


      const { data: session } = authClient.useSession();
      const user = session?.user;





  const [formData, setFormData] = useState({
    bookTitle: "",
    genre: "",
    price: "",
    coverImageUrl: "",
    shortDescription: "",
    ebookContent: "",
    publishingStatus: "Published",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ebooks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();

      if (data.success) {
        alert("Ebook Published Successfully!");
        console.log("Saved:", data);
      } else {
        alert("Failed to publish ebook");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full  max-w-2xl bg-[#121212] border border-[#1f1f1f] rounded-2xl p-6 md:p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Publish a New Ebook
          </h2>
          <p className="text-sm text-gray-400">
            Share your stories with readers around the world.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            placeholder="Book Title"
            className="w-full bg-[#181818] p-3 rounded-xl text-white"
            required
          />

          {/* Genre + Price */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre"
              className="bg-[#181818] p-3 rounded-xl text-white"
              required
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="bg-[#181818] p-3 rounded-xl text-white"
              required
            />
          </div>

          {/* Cover Image */}
          <input
            type="url"
            name="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full bg-[#181818] p-3 rounded-xl text-white"
            required
          />

          {/* Short Description */}
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Short Description"
            className="w-full bg-[#181818] p-3 rounded-xl text-white"
            rows={3}
            required
          />

          {/* Content */}
          <textarea
            name="ebookContent"
            value={formData.ebookContent}
            onChange={handleChange}
            placeholder="Ebook Content"
            className="w-full bg-[#181818] p-3 rounded-xl text-white"
            rows={6}
            required
          />

          {/* Status */}
          <select
            name="publishingStatus"
            value={formData.publishingStatus}
            onChange={handleChange}
            className="w-full bg-[#181818] p-3 rounded-xl text-white"
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            disabled={user?.role !== "writer"}
            className={`w-full font-semibold p-3 rounded-xl transition
    ${
      user?.role === "writer"
        ? "bg-white text-black"
        : "bg-gray-500 text-gray-300 cursor-not-allowed"
    }
  `}
          >
            {user?.role === "writer"
              ? "Publish Ebook"
              : "Only Writers Can Publish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishEbookForm;
