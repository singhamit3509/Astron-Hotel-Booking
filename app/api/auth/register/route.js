import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/model/user";
import connectDB from "@/lib/utils";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
