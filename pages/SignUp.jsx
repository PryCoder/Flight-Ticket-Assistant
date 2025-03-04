import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function SignupPage() {
  const [username, setUsername] = useState(""); // New username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // Include username
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setSuccess("Signup successful! You can now log in.");
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
            <CardTitle className="text-center text-3xl font-extrabold">Join Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              <Button className="w-full flex items-center justify-center gap-2 bg-white text-black">
                <FcGoogle className="text-xl" /> Sign up with Google
              </Button>
              <Button className="w-full flex items-center justify-center gap-2 bg-black text-white">
                <FaApple className="text-xl" /> Sign up with Apple
              </Button>
              <Button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white">
                <FaGithub className="text-xl" /> Sign up with GitHub
              </Button>
            </div>
            <div className="my-6 text-center text-gray-400">or</div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            
            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="relative">
                <Label htmlFor="username" className="text-gray-400">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required
                />
              </div>
              
              <div className="relative">
                <Label htmlFor="email" className="text-gray-400">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                />
              </div>
              
              <div className="relative">
                <Label htmlFor="password" className="text-gray-400">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account? <a href="/signin" className="text-blue-400 hover:underline">Sign in</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
