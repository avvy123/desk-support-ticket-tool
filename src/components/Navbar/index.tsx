"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";
import { getUser, logout } from "@/src/utils/auth";
import customerSupportLogo from "../../../src/images/customer_support_icon.svg";
import Sidebar from "../Sidebar";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentUser = getUser();

  useEffect(() => {
    setMounted(true);
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
    setIsSidebarOpen(false);
  };

  if (!mounted || !user) return null;

  return (
    <>
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={customerSupportLogo.src}
            alt="logo"
            className="h-8 w-8 mr-2"
          />
          <span className="font-bold text-xl text-blue-600">
            DeskSupport
          </span>
        </div>

        {user && (
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-gray-700">
              Welcome, {user.firstName}
            </span>
            <PowerIcon className="w-5 h-5 text-black cursor-pointer" onClick={handleLogout} />
          </div>
        )}

        {user && (
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-7 w-7 text-gray-700" />
          </button>
        )}
      </nav>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
