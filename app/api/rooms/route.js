import Room from "@/model/room";
import { connectDB } from "@/lib/utils"; // or wherever your db connection is

export async function GET() {
  await connectDB();

  const rooms = await Room.find();

  return Response.json({ rooms }); // important
}
