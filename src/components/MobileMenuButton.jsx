"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Drawer, useDisclosure } from "@heroui/react";
import { Bars } from "@gravity-ui/icons";

export default function MobileMenuButton({ logo, currentNavItems }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#0b0b0f] w-full">
        <Image src={logo} alt="Logo" width={100} height={32} />

        <Button
          variant="secondary"
          size="sm"
          className="bg-zinc-900 text-white border border-zinc-700 font-medium"
          onPress={onOpen}
        >
          <Bars />
          Menu
        </Button>
      </div>

      {/* DRAWER MOBILE MENU */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="left"
        size="xs"
      >
        <Drawer.Content className="bg-[#0b0b0f] text-zinc-100 border-r border-zinc-800/50">
          {(onClose) => (
            <>
              <Drawer.Header className="flex flex-col gap-1 border-b border-zinc-900 px-6 py-4">
                <Image src={logo} alt="Logo" width={110} height={35} />
              </Drawer.Header>
              <Drawer.Body className="px-4 py-6">
                <nav className="flex flex-col gap-1.5">
                  {currentNavItems.map((item) => (
                    <Link
                      href={item.path}
                      key={item.label}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
                    >
                      <item.icon className="size-5 text-zinc-400" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </Drawer.Body>
            </>
          )}
        </Drawer.Content>
      </Drawer>
    </>
  );
}
