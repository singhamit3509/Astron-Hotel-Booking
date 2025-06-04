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
});

const Room = models.Room || model('Room', RoomSchema);
export default Room;
