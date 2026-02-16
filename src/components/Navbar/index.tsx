"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PowerIcon } from "@heroicons/react/24/outline";
import { getUser, logout } from "@/src/utils/auth";
import customerSupportLogo from "../../../src/images/customer_support_icon.svg";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  if (!mounted) return null;

  return (
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

      <div className="flex items-center space-x-6">
        {user && (
          <>
            <span className="text-gray-700">
              Welcome, {user.firstName}
            </span>

            <PowerIcon
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={handleLogout}
            />
          </>
        )}
      </div>
    </nav>
  );
}
