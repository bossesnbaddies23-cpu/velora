import React from "react";

export default function BossedUpLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-300 cursor-pointer">Profile</li>
          <li className="hover:text-gray-300 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold">BOSS'D UP</h1>

          <div className="space-x-4">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Sign In
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Sign Up
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Welcome to Bossed Up</h2>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Extras</h2>
        <ul className="space-y-4">
          <li className="hover:text-gray-300 cursor-pointer">Notifications</li>
          <li className="hover:text-gray-300 cursor-pointer">Messages</li>
          <li className="hover:text-gray-300 cursor-pointer">Activity</li>
        </ul>
      </div>
    </div>
  );
}
