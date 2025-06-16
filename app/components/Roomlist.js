"use client";

import React, { useEffect, useState } from "react";

export default function RoomList() {
  const [rooms, setRooms] = useState([]); // rooms initialized as an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();

        console.log("API Response:", data);

        if (Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        } else {
          console.warn("Expected data.rooms to be an array");
        }

      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p className="p-6">Loading rooms...</p>;

  if (rooms.length === 0) return <p className="p-6">No rooms available</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={room.images?.[0] || "/placeholder.jpg"}
            alt={room.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{room.title}</h3>
            <p className="text-gray-600">{room.location}</p>
            <p className="text-green-700 font-semibold">₹{room.pricePerNight}/night</p>
          </div>
        </div>
      ))}
    </div>
  );
}
