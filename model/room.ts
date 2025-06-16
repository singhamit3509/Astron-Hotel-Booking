import mongoose, { Schema, model, models } from 'mongoose';

const RoomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  totalRooms: {
    type: Number,
    required: true,
  },
  availableRooms: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ["Standard", "Deluxe", "Suite"],
    default: "Standard",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4,
  },
});

const Room = models.Room || model('Room', RoomSchema);
export default Room;
