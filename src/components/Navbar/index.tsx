"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import customerSupportLogo from "../../../src/images/customer_support_icon.svg"

interface NavbarProps {
    userName?: string;
    onLogout: () => void;
}

export default function Navbar({ userName, onLogout }: NavbarProps) {
    const handleLogout = () => {
        onLogout();
    };

    return (
        <nav className="bg-white shadow p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src={customerSupportLogo.src} alt="logo" className="h-8 w-8 mr-2"/>
                <span className="font-bold text-xl text-blue-600">DeskSupport</span>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-blue-600">Dashboard</button>
                <button className="text-gray-700 hover:text-blue-600">Tickets</button>
                {userName && <span className="text-gray-700">Welcome, {userName}</span>}

                <ArrowRightOnRectangleIcon
                    className="h-6 w-6 text-gray-600 cursor-pointer"
                    onClick={handleLogout}
                    title="Logout"
                />
            </div>
        </nav>
    );
}
