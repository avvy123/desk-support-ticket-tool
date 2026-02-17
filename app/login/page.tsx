"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../src/utils/auth";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import loginbackGround from "../../src/images/login-background.png";
import customerSupportIcon from "../../src/images/customer_support_icon.svg";
import { toast } from "react-hot-toast";

export interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setError("");

    if (!loginFormData.email || !loginFormData.password) {
      setError("All fields are required");
      return;
    }

    try {
      await login(loginFormData.email, loginFormData.password);
      toast.success("Login successfully");
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError("Password or email is incorrect");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginbackGround.src})` }}
    >
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 mx-4 sm:mx-auto bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-center mb-6 space-x-2">
          <img src={customerSupportIcon.src} alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-blue-600">deskSupport</span>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="email"
              value={loginFormData.email}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, email: e.target.value })
              }
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="password"
              value={loginFormData.password}
              onChange={(e) =>
                setLoginFormData({ ...loginFormData, password: e.target.value })
              }
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-600 hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => router.push("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>

        <p className="text-center text-gray-400 text-xs mt-4">
          © 2026 deskSupport. All rights reserved.
        </p>
      </div>
    </div>
  );
}
