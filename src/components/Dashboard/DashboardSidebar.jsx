import { Bars } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Image from "next/image";
import logo from "@/at/logo-xl.png";

import {
  LuHistory,
  LuBookOpen,
  LuBookmark,
  LuUser,
  LuSettings,
  LuDollarSign,
  LuLayoutDashboard,
  LuUsers,
  LuBellPlus,
} from "react-icons/lu";
import { BiHome } from "react-icons/bi";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

const DashboardSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const dashboardItems = {
    user: [
      { icon: BiHome, label: "Overview", path: "/dashboard/user" },
      { icon: LuHistory, label: "Purchase History", path: "/dashboard/user/purchase-history" },
      { icon: LuBookOpen, label: "Purchased Ebooks", path: "/dashboard/user/purchased-ebooks" },
      { icon: LuBookmark, label: "Bookmarked Ebooks", path: "/dashboard/user/bookmarks" },
      { icon: LuUser, label: "Profile Management", path: "/dashboard/user/profile" },
    ],
    writer: [
      { icon: BiHome, label: "Overview", path: "/dashboard/writer" },
      { icon: LuSettings, label: "Manage Ebooks", path: "/dashboard/writer/manage-ebooks" },
      { icon: LuBellPlus, label: "Add Ebook", path: "/dashboard/writer/add-ebook" },
      { icon: LuBookmark, label: "Bookmarked Ebooks", path: "/dashboard/writer/bookmarks" },
      { icon: LuDollarSign, label: "Sales History", path: "/dashboard/writer/sales-history" },
    ],
    admin: [
      { icon: LuLayoutDashboard, label: "Analytics Dashboard", path: "/dashboard/admin" },
      { icon: LuUsers, label: "Manage Users", path: "/dashboard/admin/manage-users" },
      { icon: LuBookOpen, label: "Manage All Ebooks", path: "/dashboard/admin/manage-ebooks" },
      { icon: LuHistory, label: "View All Transactions", path: "/dashboard/admin/transactions" },
    ],
  };

  const currentNavItems = dashboardItems[user?.role] || [];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#0b0b0f]">
        <Image src={logo} alt="Logo" width={100} height={32} />

        <Button variant="secondary" size="sm" className="bg-zinc-900 text-white border border-zinc-700">
          <Bars />
          Menu
        </Button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <nav className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-[#0b0b0f] border-r border-zinc-800 p-4">
        
        {/* LOGO */}
        <div className="mb-8 px-2">
          <Image src={logo} alt="Logo" width={140} height={40} />
        </div>

        {/* NAV ITEMS */}
        <div className="flex flex-col gap-1">
          {currentNavItems.map((item) => (
            <Link
              href={item.path}
              key={item.label}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-200"
            >
              <item.icon className="size-5 text-zinc-400 group-hover:text-white transition" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* DRAWER MOBILE MENU */}
      <Drawer>
        <Drawer.Backdrop>
          <Drawer.Content placement="left" className="w-[280px] bg-[#0b0b0f]">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-white px-2">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                <nav className="flex flex-col gap-1 mt-2">
                  {currentNavItems.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
                    >
                      <item.icon className="size-5 text-zinc-400" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSidebar;