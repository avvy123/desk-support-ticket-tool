"use client";

import {
  PowerIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  user,
  onLogout,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/40"
        onClick={onClose}
      />

      <div className="w-64 bg-white p-5 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-black">Menu</h3>
          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-black"
            onClick={onClose}
          />
        </div>

        <p className="text-gray-700 mb-4">
          👋 Hi, {user?.firstName}
        </p>

        <button
          onClick={onLogout}
          className="w-full flex items-center pl-2 gap-2 bg-red-500 text-white py-2 rounded"
        >
          <PowerIcon className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
