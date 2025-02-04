// Navbar.tsx
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // ShadCN Avatar
import { Link } from "next/link"; // Using Next.js Link instead of react-router-dom

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isUserLoggedIn = false; // Replace with actual login state

  const profilePic =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white px-5 md:px-10">
      <nav className="flex justify-between items-center w-full max-w-screen-xl mx-auto mt-5 z-10">
        <Link href="/">
          <div className="font-bold text-3xl cursor-pointer">ABVS</div>
        </Link>

        <div
          className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${
            menuOpen ? "top-[8%]" : "top-[-100%]"
          } md:w-auto w-full flex items-center px-5 z-10`}
        >
          <ul className="flex md:flex-row flex-col md:items-center gap-8">
            <li>
              <Link href="/search" className="hover:text-gray-500">
                Search Flights
              </Link>
            </li>
            <li>
              <Link href="/hotels" className="hover:text-gray-500">
                Search Hotels
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {isUserLoggedIn ? (
            <Link href="/profile">
              <Avatar>
                <AvatarImage src={profilePic} alt="Profile" />
                <AvatarFallback>AB</AvatarFallback> {/* Placeholder initials */}
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-[#a6c1ee] text-white hover:bg-[#87acec]">
                Sign In
              </Button>
            </Link>
          )}

          <RxHamburgerMenu
            onClick={toggleMenu}
            className="text-3xl cursor-pointer md:hidden"
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
