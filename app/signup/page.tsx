"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../src/utils/auth";
import { EnvelopeIcon, LockClosedIcon, ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import loginbackGround from "../../src/images/login-background.png"
import customerSupportIcon from "../../src/images/customer_support_icon.svg"
import toast from "react-hot-toast";

export interface SignupForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<SignupForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [role, setRole] = useState<"admin" | "user">("user");
    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        try {
            await signup(formData.firstName, formData.lastName, formData.email, formData.password, role);
            toast.success("Account created successfully");
            router.replace("/login");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${loginbackGround.src})` }}
        >
            <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                <div className="flex items-center justify-center mb-6 space-x-2">
                    <img src={customerSupportIcon.src} alt="Logo" className="w-10 h-10" />
                    <span className="text-2xl font-bold text-blue-600">deskSupport</span>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="relative">
                        <UserCircleIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Firstname"
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    <div className="relative">
                        <UserCircleIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                        <input
                            type="lastname"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Lastname"
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    <div className="relative">
                        <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    <div className="relative">
                        <ShieldCheckIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                        <select
                            value={role}
                            onChange={(e) =>
                            setRole(e.target.value as "admin" | "user")
                            }
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                            required
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="relative">
                        <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-900" />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-xl py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </button>
                </p>

                <p className="text-center text-gray-400 text-xs mt-4">
                    © 2026 deskSupport. All rights reserved.
                </p>
            </div>
        </div>
    );
}
