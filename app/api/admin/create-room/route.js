import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils";
import Room from "@/model/room";

// POST route: for room creation
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    // Optional: simple validation
    if (!data.title || !data.description || !data.pricePerNight || !data.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newRoom = new Room(data);
    await newRoom.save();

    return NextResponse.json({ success: true, room: newRoom }, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
