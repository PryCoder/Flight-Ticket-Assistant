import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaMapMarkedAlt, FaUtensils, FaHiking, FaLandmark } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input"; // Assuming Input is imported
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select"; // Assuming Select is imported
import { Label } from "@/components/ui/label"; // Assuming Label is imported


// Use direct URLs OR place images inside the `public/` folder
const places = [
    { name: "Paris, France", image: "/images/paris.jpg" },
    { name: "Santorini, Greece", image: "/images/santorini.jpg" },
    { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
    { name: "New York, USA", image: "/images/nyc.jpg" },
  ];
  

export default function Home() {
  const [placeIndex, setPlaceIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightType, setFlightType] = useState("Economy");

  const handleSearch = () => {
    console.log({
      from,
      to,
      departureDate,
      flightType,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceIndex((prevIndex) => (prevIndex + 1) % places.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <nav className="p-4 flex justify-between items-center ">
      <h1 className="text-xl font-bold text-blue-600 ml-10">Travel Odyssey</h1>

      <NavigationMenu>
        <NavigationMenuList className="flex space-x-6">
          {/* Destinations Menu */}
          <NavigationMenuItem className="relative group">
            <NavigationMenuTrigger className="px-4 py-2 text-sm">Destinations</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Europe</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Asia</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">America</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Africa</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Experiences Menu */}
          <NavigationMenuItem className="relative group">
            <NavigationMenuTrigger className="px-4 py-2 text-sm">Experiences</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Outdoor Adventures</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Cultural Tours</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Food & Drinks</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* More Menu */}
          <NavigationMenuItem className="relative group">
            <NavigationMenuTrigger className="px-4 py-2 text-sm">More</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 top-full mt-2 w-48 bg-white border shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">About Us</NavigationMenuLink>
              <NavigationMenuLink className="block px-4 py-2 hover:bg-gray-100" href="#">Contact</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button className="mr-10 px-4 py-2">Sign In</Button>
    
      </nav>

      {/* Hero Section with Background Changing Carousel */}
      <header
  className="text-white rounded-lg bg-cover bg-center transition-all duration-700 h-screen flex items-center mx-auto"
  style={{ 
    backgroundImage: `url(${places[placeIndex].image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "calc(100% - 2cm)", // Reduce width by 2cm
    maxWidth: "calc(100% - 1cm)", // Ensure it doesn't exceed full width
  }}
>
  <div className=" p-10 rounded-lg text-left max-w-2xl ml-16">
    <h2 className="text-7xl font-extrabold tracking-wide font-[Poppins]">
      {places[placeIndex].name}
    </h2>
    <p className="mt-4 text-2xl font-light">
      Discover breathtaking destinations and plan your next adventure.
    </p>
    <Button className="mt-6  px-6 py-7 text-xl bg-white text-black hover:bg-gray-200 rounded-lg">
      Get Started
    </Button>
  </div>
</header>

<section className="p-10 bg-white">
 
    <h2 className="text-4xl font-bold mb-6 text-center">Search Flights</h2>

    {/* Flex Container for Inputs */}
    <div className="flex justify-between gap-6">
      {/* From Field */}
      <div className="flex flex-col w-1/4">
        <Label htmlFor="from" className="text-lg font-semibold">From</Label>
        <Input
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Delhi"
          className="mt-2 p-6 border rounded-lg text-lg focus:outline-none focus:ring-2 h-20 focus:ring-blue-500 w-full placeholder:text-2xl"
        />
      </div>

      {/* To Field */}
      <div className="flex flex-col w-1/4">
        <Label htmlFor="to" className="text-lg font-semibold">To</Label>
        <Input
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Mumbai"
          className="mt-2 p-6 border rounded-lg text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 w-full placeholder:text-xl" />
      </div>

      {/* Departure Date */}
      <div className="flex flex-col w-1/4">
        <Label htmlFor="departureDate" className="text-lg font-semibold">Departure Date</Label>
        <Input
          type="date"
          id="departureDate"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-2 p-6 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 w-full placeholder:text-2xl"
        />
      </div>

      {/* Flight Type */}
      <div className="flex flex-col w-1/4">
        <Label htmlFor="flightType" className="text-lg font-semibold">Flight Type</Label>
        <Select
          value={flightType}
          onValueChange={setFlightType}
          id="flightType"
          className="mt-2 p-6 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 w-full"
        >
          <SelectTrigger>
            <span>{flightType}</span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Economy">Economy</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="First Class">First Class</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {/* Search Button */}
    <Button
      onClick={handleSearch}
      className="mt-6 w-40 h-10 bg-blue-600 text-white p-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
    >
      Search Flights
    </Button>

</section>


      {/* Categories */}
      <section className="p-10">
        <h3 className="text-3xl font-bold text-center">Explore By Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <CategoryCard icon={<FaMapMarkedAlt />} title="Key Attractions" />
          <CategoryCard icon={<FaUtensils />} title="Culinary Delights" />
          <CategoryCard icon={<FaHiking />} title="Outdoor Adventures" />
          <CategoryCard icon={<FaLandmark />} title="Cultural Experiences" />
        </div>
      </section>

      {/* Carousel for Featured Places */}
      <section className="p-10">
        <h3 className="text-3xl font-bold text-center mb-4">Featured Destinations</h3>
        <Carousel>
          <CarouselContent>
            {places.map((place, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Card className="w-[400px]"> {/* Increased width */}
                  <CardHeader>
                    <img 
                      src={place.image} 
                      alt={place.name} 
                      className="rounded-lg h-[300px] w-full object-cover" 
                    />
                    <CardTitle className="mt-2 text-2xl">{place.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-lg">Experience the beauty of {place.name}.</p>
                    <Badge variant="outline" className="mt-2 text-lg">Explore</Badge>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}

// Category Card Component
function CategoryCard({ icon, title }) {
  return (
    <Card className="p-6 text-center">
      <CardHeader>
        <div className="text-blue-600 text-5xl">{icon}</div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-lg">Discover amazing {title.toLowerCase()} around the world.</p>
        <Badge variant="outline" className="mt-2 text-lg">Explore</Badge>
      </CardContent>
    </Card>
  );
}
