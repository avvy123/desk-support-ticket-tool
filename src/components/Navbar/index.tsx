"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";
import customerSupportLogo from "../../../src/images/customer_support_icon.svg";
import Sidebar from "../Sidebar";
import { logout } from "@/src/utils/auth";
import { useState } from "react";
import { clearUser } from "@/src/store/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();       
    dispatch(clearUser());
    router.replace("/login");
    setIsSidebarOpen(false);
  };

  if (!user) return null;

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

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-700">
            Welcome, {user.firstName}
          </span>
          <PowerIcon
            className="w-5 h-5 text-black cursor-pointer"
            onClick={handleLogout}
          />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Bars3Icon className="h-7 w-7 text-gray-700" />
        </button>
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