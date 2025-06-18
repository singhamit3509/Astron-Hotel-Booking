'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 auto-manage">
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" />
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            <ArrowRight className="mr-2 h-5 w-5" /> Sign in
          </Button>

          <p className="text-center text-sm">
            Don’t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>

          <Button className="w-full bg-black text-white hover:bg-gray-900">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
