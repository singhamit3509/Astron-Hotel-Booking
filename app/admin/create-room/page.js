'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { connectDB } from "@/lib/utils";


export default function CreateRoomPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pricePerNight: '',
    totalRooms: '',
    availableRooms: '',
    location: '',
    roomType: 'Standard',
    rating: 4,
    amenities: '',
    images: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/admin/create-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        amenities: formData.amenities.split(',').map(a => a.trim()),
        images: formData.images.split(',').map(i => i.trim()),
        pricePerNight: Number(formData.pricePerNight),
        totalRooms: Number(formData.totalRooms),
        availableRooms: Number(formData.availableRooms),
        rating: Number(formData.rating),
      }),
    });

    if (res.ok) {
      alert('Room created successfully');
      router.push('/');
    } else {
      alert('Error creating room');
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl mb-4">Create New Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description' },
          { name: 'pricePerNight', label: 'Price Per Night', type: 'number' },
          { name: 'totalRooms', label: 'Total Rooms', type: 'number' },
          { name: 'availableRooms', label: 'Available Rooms', type: 'number' },
          { name: 'location', label: 'Location' },
          { name: 'amenities', label: 'Amenities (comma separated)' },
          { name: 'images', label: 'Image URLs (comma separated)' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {/* Room Type */}
        <div>
          <label className="block mb-1 font-medium">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}
