"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaBookOpen } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Login successful 🎉");
    }

    if (error) {
      toast.error(error.message || "Login failed ❌");
    }
  };

  // গুগল লগইনের জন্য নতুন ফাংশন যোগ করা হলো
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // লগইন সফল হওয়ার পর যেখানে রিডাইরেক্ট হবে
      });
    } catch (error) {
      toast.error("Google login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,#4f46e5_0%,#1e1b4b_35%,#020617_100%)]">
      {" "}
      <div className="relative w-full max-w-md">
        {" "}
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />{" "}
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />{" "}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />
        <Surface className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <FaBookOpen className="text-white text-3xl" />
            </div>

            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h1>

            <p className="text-slate-300 mt-3">
              Sign in to continue your ebook journey
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <Fieldset className="w-full space-y-4">
              <Fieldset.Legend className="text-white text-xl font-semibold">
                Sign In
              </Fieldset.Legend>

              <Description className="text-slate-300">
                Enter your email and password to access your account.
              </Description>

              <Fieldset.Group className="space-y-4">
                <TextField isRequired name="email" type="email">
                  <Label className="text-white">Email</Label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="john@example.com"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>

                <TextField isRequired name="password" type="password">
                  <Label className="text-white">Password</Label>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="Enter your password"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>
              </Fieldset.Group>

              <Button
                type="submit"
                className="w-full h-14 mt-4 text-base font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/40"
              >
                Sign In
              </Button>
            </Fieldset>
          </form>

          <div className="relative my-6">
            <div className="border-t border-white/10"></div>

            <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-slate-900 px-3 text-sm text-slate-400">
              OR
            </span>
          </div>

          <Button
            type="button"
            onPress={handleGoogleLogin}
            variant="bordered"
            className="w-full h-14 font-medium border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            <FcGoogle size={24} />
            Continue with Google
          </Button>

          <div className="mt-6 text-center text-sm text-slate-400">
            Dont have an account?
            <Link
              href="/signup"
              className="ml-1 font-semibold text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </Link>
          </div>
        </Surface>
      </div>
    </div>
  );
}
