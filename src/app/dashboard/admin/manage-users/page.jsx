"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AdminManageUsers = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 security check
  useEffect(() => {
    if (!isPending && (!user || user.role !== "admin")) {
      router.push("/");
    }
  }, [user, isPending, router]);

  // 📦 fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  // 🔄 role update
  const updateRole = async (id, role) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });

    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  // 🚫 block/unblock
  const toggleBlock = async (id, isBlocked) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked: !isBlocked }),
    });

    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, isBlocked: !isBlocked } : u)),
    );
  };

  if (isPending || loading) {
    return <div className="text-white p-6">Loading users...</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-[#09090b] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-800">
          <thead className="bg-[#18181b]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-zinc-800">
                <td className="p-3">{u.name}</td>
                <td className="p-3 text-zinc-400">{u.email}</td>

                {/* ROLE */}
                <td className="p-3">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    className="bg-black border border-zinc-700 p-1 rounded"
                  >
                    <option value="user">user</option>
                    <option value="writer">writer</option>
                    <option value="admin">admin</option>
                  </select>
                </td>

                {/* STATUS */}
                <td className="p-3">
                  {u.isBlocked ? (
                    <span className="text-red-400">Blocked</span>
                  ) : (
                    <span className="text-green-400">Active</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => toggleBlock(u._id, u.isBlocked)}
                    className="px-2 py-1 bg-zinc-800 rounded"
                  >
                    {u.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
