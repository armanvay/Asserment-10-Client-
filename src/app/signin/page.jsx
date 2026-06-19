"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form, // HeroUI এর Form কম্পোনেন্ট ব্যবহার করতে পারেন, অথবা নেটিভ <form>
  Input,
  Label,
  Surface,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import React from "react";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      // 'redirect' ভ্যারিয়েবলটি ডিফাইন করা না থাকলে এখানে আপনার টার্গেট URL (যেমন: "/dashboard") লিখে দিন
      callbackURL: "/",
    });

    if (data) {
      alert("Login successful 🎉");
    }

    if (error) {
      alert(error.message || "Login failed ❌");
    }
  }; // এখানে বাড়তি }; টি বাদ দেওয়া হয়েছে

  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5">
      <Surface className="w-full">
        {/* <from> বানান ঠিক করে <form> করা হয়েছে */}
        <form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Signup</Fieldset.Legend>
            <Description>Create your account</Description>
            <Fieldset.Group>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>
            </Fieldset.Group>

            <Button type="submit" className={"w-full"}>
              Signin
            </Button>
          </Fieldset>
        </form>
      </Surface>
    </div>
  );
}
