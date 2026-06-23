"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const role = formData.get("role");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        plan: "free",
      });

      if (error) {
        setError(error.message || "Signup failed");
        return;
      }

      if (data) {
        toast.success("Signup successful 🎉");
        router.push("/");
      }
    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[radial-gradient(circle_at_top,#4f46e5_0%,#1e1b4b_35%,#020617_100%)]">
      <div className="relative w-full max-w-md">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl" />

        <Surface className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)] p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <FaUser className="text-white text-3xl" />
            </div>

            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Create Account
            </h1>

            <p className="text-slate-300 mt-3">
              Start publishing and selling your ebooks today
            </p>
          </div>

          <Form onSubmit={onSubmit}>
            <Fieldset className="w-full">
              <Fieldset.Legend className="text-white text-xl font-semibold">
                Sign Up
              </Fieldset.Legend>

              <Description className="text-slate-300">
                Create your Ebook account
              </Description>

              <Fieldset.Group className="space-y-4 mt-4">
                {/* Name */}
                <TextField isRequired name="name">
                  <Label className="text-white">Full Name</Label>

                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="Enter your full name"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>

                {/* Email */}
                <TextField isRequired name="email" type="email">
                  <Label className="text-white">Email</Label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="Enter your email"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>

                {/* Password */}
                <TextField isRequired name="password" type="password">
                  <Label className="text-white">Password</Label>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="Enter password"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>

                {/* Confirm Password */}
                <TextField isRequired name="confirmPassword" type="password">
                  <Label className="text-white">Confirm Password</Label>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" />

                    <Input
                      placeholder="Confirm password"
                      variant="secondary"
                      className="pl-10"
                    />
                  </div>

                  <FieldError />
                </TextField>

                {/* Role */}
                <Select isRequired name="role" placeholder="Select Role">
                  <Label className="text-white">Role</Label>

                  <Select.Trigger className="h-12">
                    <div className="flex items-center gap-2">
                      <FaUserTag className="text-slate-400" />
                      <Select.Value />
                    </div>

                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="user" textValue="user">
                        User
                        <ListBox.ItemIndicator />
                      </ListBox.Item>

                      <ListBox.Item id="writer" textValue="writer">
                        Writer
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Fieldset.Group>

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3">
                  <p className="text-sm text-red-300 text-center">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-14 mt-6 text-base font-bold rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-indigo-500/40"
              >
                Create Account
              </Button>

              <p className="text-center text-slate-400 mt-6">
                Already have an account?
                <Link href={"/signin"} className="ml-1 text-blue-400 font-semibold cursor-pointer hover:text-blue-300">
                  Sign In
                </Link>
              </p>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
