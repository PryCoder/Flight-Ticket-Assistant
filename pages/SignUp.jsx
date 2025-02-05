import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaGithub } from "react-icons/fa";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent w-[500px] h-[500px] blur-3xl opacity-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <Card className="rounded-2xl shadow-xl shadow-[0px_0px_30px_5px_rgba(0,128,255,0.4),0px_0px_60px_10px_rgba(255,0,255,0.2)] bg-black backdrop-blur-lg text-white p-6 border border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold">Join Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-3">
              <Button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md hover:bg-gray-200">
                <FcGoogle className="text-xl" /> Sign up with Google
              </Button>
              <Button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800">
                <FaApple className="text-xl" /> Sign up with Apple
              </Button>
              <Button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
                <FaGithub className="text-xl" /> Sign up with GitHub
              </Button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-950 px-2 text-gray-400">or</span>
              </div>
            </div>
            <form className="space-y-6">
              <div className="relative">
                <Input id="email" type="email" placeholder=" " className="peer mt-1 bg-transparent border border-gray-500 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
                <Label htmlFor="email" className="absolute left-2 top-2 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">Email</Label>
              </div>
              <div className="relative">
                <Input id="password" type="password" placeholder=" " className="peer mt-1 bg-transparent border border-gray-500 rounded-md p-2 focus:ring-2 focus:ring-blue-500" />
                <Label htmlFor="password" className="absolute left-2 top-2 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 transition-all">Password</Label>
              </div>
              <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 transition font-bold py-2 rounded-lg">Sign Up</Button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account? <a href="#" className="text-blue-400 hover:underline">Sign in</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
