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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
      await authClient.signUp.email({
        name,
        email,
        password,
        role,
        plan: "free",
      });

      router.push("/");
    } catch (err) {
      setError(err?.message || "Signup failed");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-3xl border bg-surface p-6">
      <Surface className="w-full">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>Create Account</Fieldset.Legend>
            <Description>Create your Ebook account</Description>

            <Fieldset.Group>
              <TextField isRequired name="name">
                <Label>Full Name</Label>
                <Input placeholder="Enter your full name" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="Enter your email" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Enter password" variant="secondary" />
                <FieldError />
              </TextField>

              <TextField isRequired name="confirmPassword" type="password">
                <Label>Confirm Password</Label>
                <Input placeholder="Confirm password" variant="secondary" />
                <FieldError />
              </TextField>

              <Select isRequired name="role" placeholder="Select Role">
                <Label>Role</Label>

                <Select.Trigger>
                  <Select.Value />
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

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
