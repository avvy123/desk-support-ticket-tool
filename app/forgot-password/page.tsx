"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import loginbackGround from "../../src/images/login-background.png"
import bcrypt from "bcryptjs";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotData, setForgotData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !forgotData.email ||
      !forgotData.password ||
      !forgotData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (forgotData.password !== forgotData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const userIndex = users.findIndex((u: any) => u.email === forgotData.email);

    if (userIndex === -1) {
      setError("You are not registered with us !!!");
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
      return;
    }
    const hashedPassword = await bcrypt.hash(forgotData.password, 10);
    users[userIndex] = {
      ...users[userIndex],
      password: hashedPassword,
    };

    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Password updated successfully");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginbackGround.src})` }}>
      <div className="relative z-10 w-full max-w-md sm:p-8 mx-4 sm:mx-auto">
        <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-black">Reset Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-600 text-sm mb-2 text-center">{error}</p>
          )}
          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={forgotData.email}
              onChange={(e) =>
                setForgotData({ ...forgotData, email: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={forgotData.password}
              onChange={(e) =>
                setForgotData({ ...forgotData, password: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={forgotData.confirmPassword}
              onChange={(e) =>
                setForgotData({
                  ...forgotData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Update Password
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
