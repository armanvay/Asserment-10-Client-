import React from "react";
import {
  LuBookOpen,
  LuCoins,
  LuStar,
  LuTrendingUp,
  LuPlus,
} from "react-icons/lu";

const stats = [
  { id: 1, label: "Published Stories", value: "18", icon: LuBookOpen },
  { id: 2, label: "Total Sales", value: "127", icon: LuCoins },
  { id: 3, label: "Bookmarks", value: "84", icon: LuStar },
  { id: 4, label: "Revenue", value: "$1,248", icon: LuTrendingUp },
];

const activities = [
  "The Last Ember of Valtheria was purchased by a reader.",
  "Echoes of Midnight received a new bookmark.",
  "You published The Clockmaker's Promise.",
  "A reader left a review on The Silent Garden.",
];

const topStories = [
  {
    rank: "#1",
    title: "The Last Ember of Valtheria",
    tag: "Bestseller Story",
    sales: "42 Sales",
    label: "Readers purchased",
  },
  {
    rank: "#2",
    title: "Echoes of Midnight",
    tag: "Bestseller Story",
    sales: "31 Sales",
    label: "Readers purchased",
  },
  {
    rank: "#3",
    title: "The Silent Garden",
    tag: "Bestseller Story",
    sales: "24 Sales",
    label: "Readers purchased",
  },
];

const monthlyData = [30, 60, 40, 80, 50, 100];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const reviews = [
  { text: "Amazing story! Couldn't stop reading.", stars: 5 },
  { text: "Great character development.", stars: 4 },
];

const WriterDashboardPage = () => {
  return (
    <div className=" bg-[#09090b] text-zinc-100 flex flex-col">
      <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
        {/* PROFILE */}
        <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold">
              A
            </div>
            <div>
              <h2 className="text-lg font-semibold">Arman</h2>
              <p className="text-sm text-zinc-400">Verified Writer</p>
              <p className="text-xs text-zinc-500">
                18 ebooks published • Active creator
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <div className="p-2 bg-zinc-800 rounded-lg w-fit mb-2">
                  <stat.icon className="size-5" />
                </div>
                <p className="text-xs text-zinc-400">{stat.label}</p>
              </div>
              <span className="text-3xl font-bold">{stat.value}</span>
            </div>
          ))}
        </section>

        {/* QUICK ACTIONS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 text-left">
            <h3 className="font-semibold">📚 Add New Ebook</h3>
            <p className="text-sm text-zinc-400">Publish a new story</p>
          </button>

          <button className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 text-left">
            <h3 className="font-semibold">💰 Check Revenue</h3>
            <p className="text-sm text-zinc-400">View earnings</p>
          </button>

          <button className="bg-[#18181b] border border-zinc-800 rounded-xl p-5 text-left">
            <h3 className="font-semibold">⭐ Reader Reviews</h3>
            <p className="text-sm text-zinc-400">See feedback</p>
          </button>
        </section>

        {/* CHART + ACTIVITY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Performance</h2>

            <div className="flex items-end justify-between h-44 gap-2">
              {monthlyData.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full bg-zinc-800 rounded-md h-full flex items-end">
                    <div
                      className="w-full bg-white rounded-md"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                  <span className="text-xs text-zinc-500">{months[i]}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <p key={i} className="text-sm text-zinc-300">
                  • {a}
                </p>
              ))}
            </div>
          </section>
        </div>

        {/* TOP + REVIEWS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Top Stories</h2>
            <div className="space-y-3">
              {topStories.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between p-4 bg-zinc-900 rounded-xl"
                >
                  <div>
                    <p className="font-medium">{s.title}</p>
                    <span className="text-xs text-zinc-500">{s.tag}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{s.sales}</p>
                    <p className="text-xs text-zinc-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#18181b] border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Latest Reviews</h2>

            <div className="space-y-3">
              {reviews.map((r, i) => (
                <div key={i} className="p-4 bg-zinc-900 rounded-xl">
                  <div className="text-amber-400 text-xs mb-2">
                    {"★".repeat(r.stars)}
                    {"☆".repeat(5 - r.stars)}
                  </div>
                  <p className="text-sm text-zinc-300">{r.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* CTA */}
        <footer className="bg-black border border-zinc-800 rounded-xl p-6 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Keep creating inspiring stories</h3>
            <p className="text-xs text-zinc-400">
              Publish, manage, and grow your audience
            </p>
          </div>

          <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-xs font-semibold">
            <LuPlus className="size-4" />
            Publish Story
          </button>
        </footer>
      </main>
    </div>
  );
};

export default WriterDashboardPage;
