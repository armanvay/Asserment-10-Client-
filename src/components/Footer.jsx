"use client";

import React from "react";
import Link from "next/link";
// ভুল সংশোধন: Github-এর পরিবর্তে lucide-react এর সঠিক নাম Github ব্যবহার করা হয়েছে
// import { BookOpen,  Linkedin, Twitter, Mail } from "lucide-react";
import { GiThunderBlade, GiThunderSkull } from "react-icons/gi";
import { BookOpen, Mail } from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="w-full bg-[#09090b] border-t border-zinc-900 text-zinc-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-bold text-xl"
            >
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <BookOpen size={18} />
              </div>
              <span>Ebook</span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Discover, read, and publish your favorite ebooks instantly. A
              modern platform built for passionate readers and writers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/ebooks"
                  className="hover:text-white transition-colors"
                >
                  Explore Ebooks
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/writer/add-ebook"
                  className="hover:text-white transition-colors"
                >
                  Publish Book
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3 text-zinc-500">
              <a
                href="https://github.com/armanvay"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="GitHub"
              >
                {/* সঠিক আইকন ট্যাগ */}
                <GiThunderSkull size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <LiaLinkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                title="Twitter"
              >
                <BsTwitter size={18} />
              </a>
              <a
                href="mailto:support@ejanala.com"
                className="hover:text-white transition-colors"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-xs text-zinc-600 pt-1">
              Need help? support@ejanala.com
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} E-Janala. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-zinc-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
