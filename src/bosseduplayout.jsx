import React, { useEffect, useState } from "react";

export default function BossedUpLayout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-bold">BOSS'D UP</h1>

          <div className="space-x-4">
            <button className="px-4 py-2 border rounded-lg">
              Sign In
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg">
              Sign Up
            </button>
          </div>
        </div>

        {/* API DATA DISPLAY */}
        <div className="p-6">
          <h2 className="text-xl">Backend Response:</h2>
          <p className="mt-2 text-green-600">{message}</p>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-64 bg-black text-white p-4">
        <h2 className="text-xl font-bold">Extras</h2>
      </div>
    </div>
  );
}
