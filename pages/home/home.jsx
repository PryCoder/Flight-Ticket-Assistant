import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaMapMarkedAlt, FaUtensils, FaHiking, FaLandmark } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const API_KEY = "79edc6ae47484a5251cd513721dc2f35";
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
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState({ from: null, to: null });

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceIndex((prevIndex) => (prevIndex + 1) % places.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

 
  const fetchCoordinates = async (fromIATA, toIATA) => {
    const geoAPI = (iata) =>
      `https://nominatim.openstreetmap.org/search?format=json&q=${iata} airport`;

    try {
      const [fromRes, toRes] = await Promise.all([
        fetch(geoAPI(fromIATA)).then((res) => res.json()),
        fetch(geoAPI(toIATA)).then((res) => res.json()),
      ]);

      if (fromRes.length && toRes.length) {
        setCoordinates({
          from: [fromRes[0].lat, fromRes[0].lon],
          to: [toRes[0].lat, toRes[0].lon],
        });
      }
    } catch (err) {
      console.error("Failed to fetch coordinates", err);
    }
  };

  const handleSearch = async () => {
    if (!from || !to) {
      alert("Please enter both origin and destination.");
      return;
    }
    setLoading(true);
    setError("");
    setFlights([]);
    try {
      const response = await fetch(
        `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${from}&arr_iata=${to}`
      );
      const data = await response.json();
      if (data && data.data) {
        setFlights(data.data.slice(0, 5));
        fetchCoordinates(from, to);
      } else {
        setError("No flights found.");
      }
    } catch (err) {
      setError("Failed to fetch flights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-600">Travel Odyssey</h1>
        <Button>Sign In</Button>
      </nav>

      <header className="text-white bg-cover h-screen flex items-center justify-center" style={{ backgroundImage: `url(${places[placeIndex].image})` }}>
        <div className="text-center">
          <h2 className="text-7xl font-extrabold">{places[placeIndex].name}</h2>
          <p className="mt-4 text-2xl">Discover breathtaking destinations.</p>
        </div>
      </header>

      <section className="p-10 bg-white">
        <h2 className="text-4xl font-bold mb-6 text-center">Search Flights</h2>
        <div className="flex justify-between gap-6">
          <Input id="from" value={from} onChange={(e) => setFrom(e.target.value.toUpperCase())} placeholder="From (IATA)" />
          <Input id="to" value={to} onChange={(e) => setTo(e.target.value.toUpperCase())} placeholder="To (IATA)" />
          <Input type="date" id="departureDate" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          <Select value={flightType} onValueChange={setFlightType}>
            <SelectTrigger>{flightType}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Economy">Economy</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="First Class">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSearch} className="mt-6">Search Flights</Button>
        {loading && <p className="mt-4 text-center">Loading flights...</p>}
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        {coordinates.from && coordinates.to && (
        <MapContainer center={coordinates.from} zoom={4} className="h-96 w-full mt-6">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coordinates.from} icon={L.icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41] })} />
          <Marker position={coordinates.to} icon={L.icon({ iconUrl: "/marker-icon.png", iconSize: [25, 41] })} />
          <Polyline positions={[coordinates.from, coordinates.to]} color="blue" />
        </MapContainer>
      )}

        {flights.map((flight, index) => (
  <div key={index} className="p-4 border-b">
    <p className="font-bold">
      {flight.departure.iata} → {flight.arrival.iata}
    </p>
    <p>Flight Number: {flight.flight.iata}</p>
    <p>Airline: {flight.airline.name}</p>
    <p>Status: {flight.flight_status}</p>
  </div>
))}

      </section>

      <section className="p-10">
        <h3 className="text-3xl font-bold text-center">Explore By Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <CategoryCard icon={<FaMapMarkedAlt />} title="Key Attractions" />
          <CategoryCard icon={<FaUtensils />} title="Culinary Delights" />
          <CategoryCard icon={<FaHiking />} title="Outdoor Adventures" />
          <CategoryCard icon={<FaLandmark />} title="Cultural Experiences" />
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ icon, title }) {
  return (
    <Card className="p-6 text-center">
      <CardHeader>
        <div className="text-blue-600 text-5xl">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Discover amazing {title.toLowerCase()}.</p>
        <Badge variant="outline" className="mt-2">Explore</Badge>
      </CardContent>
    </Card>
  );
}
