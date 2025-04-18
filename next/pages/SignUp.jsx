"use client"; // Ensure this runs only on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Use Next.js router for navigation

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      router.push("/SignIn"); // Redirect to sign-in page after successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Card className="rounded-2xl shadow-xl bg-black backdrop-blur-lg text-white p-6 border border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSignup}>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Username Input */}
              <div className="relative">
                <Label htmlFor="username" className="text-gray-400 text-sm mb-2 block">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 bg-transparent border border-gray-500 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <Label htmlFor="email" className="text-gray-400 text-sm mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 bg-transparent border border-gray-500 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Label htmlFor="password" className="text-gray-400 text-sm mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 bg-transparent border border-gray-500 rounded-md p-3 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition font-bold py-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-400 hover:underline">
                Sign in
              </a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
