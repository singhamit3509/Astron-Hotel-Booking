import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const publicPaths = ["/login", "/register", "/"];

  // Allow public routes
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirect if not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Restrict access to /admin routes for non-admin users
    if (request.nextUrl.pathname.startsWith("/admin") && decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Apply middleware only on these paths
export const config = {
  matcher: ["/admin/:path*", "/create-room", "/dashboard", "/profile"], // Add more protected paths as needed
};
