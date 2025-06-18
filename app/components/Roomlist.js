"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Wifi,
  Snowflake,
  Waves,
  Coffee,
  Tv,
  Car,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [roomType, setRoomType] = useState("all");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("/api/rooms");
        if (Array.isArray(res.data.rooms)) {
          setRooms(res.data.rooms);
        } else {
          console.error("Invalid response format: rooms is not an array");
          setRooms([]);
        }
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const filteredRooms = Array.isArray(rooms)
    ? rooms
        .filter((room) =>
          room.title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((room) => {
          const withinMin =
            minPrice === "" || room.pricePerNight >= parseInt(minPrice);
          const withinMax =
            maxPrice === "" || room.pricePerNight <= parseInt(maxPrice);
          const matchesRoomType =
            roomType === "all" || room.roomType === roomType;
          const matchesAmenities = selectedAmenities.every((amenity) =>
            room.amenities?.includes(amenity)
          );
          return withinMin && withinMax && matchesRoomType && matchesAmenities;
        })
        .sort((a, b) => {
          if (sortOption === "lowToHigh")
            return a.pricePerNight - b.pricePerNight;
          if (sortOption === "highToLow")
            return b.pricePerNight - a.pricePerNight;
          if (sortOption === "rating")
            return (b.rating || 0) - (a.rating || 0);
          if (sortOption === "newest")
            return new Date(b.createdAt) - new Date(a.createdAt);
          return 0;
        })
    : [];

  if (loading) return <p className="p-6">Loading rooms...</p>;

  return (
  <> 
     <div className="flex bg-zinc-50 flex-col lg:flex-row gap-6 p-6">
      

      <div className="w-full lg:w-64 space-y-6">
        {/* Sort */}
        <div>
          <label className="text-sm font-medium">Sort by</label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger>
              <SelectValue placeholder="Newest First" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search */}
        <div>
          <label className="text-sm font-medium">Search by Location</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border-orange-300 border  outline-none rounded-md"
            placeholder="e.g. Nainital"
          />
        </div>

        {/* Price */}
        <div>
          <label className="text-sm  font-medium">Price Range</label>
          <div className="flex gap-2">
            <input
            type="number"
            placeholder="₹ 0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-3 py-1 border border-orange-300 rounded-md"
          />
          <input
            type="number"
            placeholder="₹ 5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3 py-1 border border-orange-300 outline-none rounded-md"
          />
          </div>
        </div>

        {/* Room Type */}
        <div className="w-52">
          <label className="text-sm  font-medium">Room Type</label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className={"w-full"}>
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities */}
        <div>
  <label className="font-semibold mb-2">Amenities</label>
  {[
    { name: "WiFi", icon: <Wifi className="w-4 h-4" /> },
    { name: "AC", icon: <Snowflake className="w-4 h-4" /> },
    { name: "Pool", icon: <Waves className="w-4 h-4" /> },
    { name: "Breakfast", icon: <Coffee className="w-4 h-4" /> },
    { name: "TV", icon: <Tv className="w-4 h-4" /> },
    { name: "Parking", icon: <Car className="w-4 h-4" /> },
  ].map((amenity) => (
    <div key={amenity.name} className="flex items-center gap-2 mb-1">
      <Checkbox
        id={amenity.name}
        checked={selectedAmenities.includes(amenity.name)}
        onCheckedChange={() => toggleAmenity(amenity.name)}
      />
      {amenity.icon}
      <label htmlFor={amenity.name} className="text-sm">
        {amenity.name}
      </label>
    </div>
  ))}
</div>

        
        <button
          onClick={() => {
            setSearchQuery("");
            setMinPrice("");
            setMaxPrice("");
            setSortOption("newest");
            setRoomType("all");
            setSelectedAmenities([]);
          }}
          className="w-full px-4 py-2 mt-2 bg-gray-100 border rounded hover:bg-gray-200 text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {filteredRooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white shadow rounded-xl overflow-hidden flex flex-col"
            >
              <img
                src={room.images?.[0] || "/placeholder.jpg"}
                alt={room.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-sm text-teal-600 font-semibold">
                  {room.location || "Unknown"}
                </p>
                <h3 className="text-lg font-bold mb-1 truncate">
                  {room.title || "Untitled"}
                </h3>
                <p className="text-gray-500 text-sm mb-1">
                  Type: {room.roomType || "-"}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  Amenities: {room.amenities?.join(", ") || "-"}
                </p>
                <div className="mt-auto">
                  <p className="text-green-700 font-semibold text-lg">
                    ₹{room.pricePerNight || 0}
                  </p>
                  <p className="text-yellow-500 text-sm">
                    ⭐ {room.rating || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  
    </>
  );
}
