import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaMapMarkedAlt, FaUtensils, FaHiking, FaLandmark, FaComments } from "react-icons/fa";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FaRoute, FaTrain, FaPlane, FaCar } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FaPlaneDeparture } from "react-icons/fa";
const GEMINI_API_KEY = "AIzaSyAt8rRekvOqmJU6bGkrev24aHiog6ewA0k";
const API_KEY = "79edc6ae47484a5251cd513721dc2f35";
const places = [
  { name: "Paris, France", image: "/images/paris.jpg" },
  { name: "Santorini, Greece", image: "/images/santorini.jpg" },
  { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
  { name: "New York, USA", image: "/images/nyc.jpg" },
];


export default function Home() {
  const [query, setQuery] = useState("");
  const [route, setRoute] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [placeIndex, setPlaceIndex] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flightType, setFlightType] = useState("Economy");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState({ from: null, to: null });
  const [itinerary, setItinerary] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Holds user data



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No authentication token found");
      router.push("/signin"); // Redirect to signin if no token
      return;
    }
  
    // Fetch user data with the token
    fetch("http://localhost:5000/user", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching user:", err));
  }, []);
  
  const handleAddToItinerary = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Auto-hide after 3 sec
  };

  useEffect(() => {
    const savedItinerary = JSON.parse(localStorage.getItem("itinerary")) || [];
    setItinerary(savedItinerary);
  }, []);

  useEffect(() => {
    localStorage.setItem("itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceIndex((prevIndex) => (prevIndex + 1) % places.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testGemini = async () => {
    if (!query) {
      alert("Please enter a query (e.g., 'Mumbai to Goa' or 'Best places in Mumbai').");
      return;
    }
    setLoading(true);
    let promptText = "";
    
    // Check if the query is asking about a place or travel route
    if (query.toLowerCase().includes("best place") || query.toLowerCase().includes("places in")) {
      promptText = `Suggest the best places to visit in ${query.replace("best place in", "").replace("places in", "").trim()}.
                    - Consider top-rated attractions based on public reviews.
                    - Include brief descriptions and why they are popular.
                    - Mention if they are famous for food, nature, nightlife, or culture.`;
    } else {
      promptText = `Find the best available travel route from ${query}.  
                    - Consider flights, highways, trains, and buses.  
                    - Provide the best option based on travel time and cost.  
                    - Give an approximate expense for one person, including tickets and fuel if needed.`;  
    }
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptText }]
              }
            ]
          }),
        }
      );
  
      const data = await response.json();
      console.log("Gemini Response:", data);
  
      const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                           "Sorry, I couldn't find relevant information at the moment.";
  
      setRoute({ recommended: responseText });
      setLoading(false);
    } catch (err) {
      console.error("Gemini API Error:", err);
      setRoute({ recommended: "Error fetching information. Please try again later." });
    }
   
  };
  
     
  
 
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
    if (!from || !to || !departureDate) {
      alert("Please enter origin, destination, and departure date.");
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
        const filteredFlights = data.data.filter(flight => {
          const flightDate = flight.departure.scheduled ? flight.departure.scheduled.substring(0, 10) : null;
          return flightDate === departureDate;
        });
  
        setFlights(filteredFlights.length > 0 ? filteredFlights.slice(0, 10) : []);
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
  
  console.log("Flight Data:", flights);
  const cleanResponse = (text) => text.replace(/\*/g, ""); 
  const formatTime = (timeString, timezone) => {
    if (!timeString) return "N/A";
    const date = new Date(timeString);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone, // Ensures correct local time
    }).format(date);
  };
  
  const addToItinerary = (flight) => {
    const newFlight = { ...flight, date: departureDate };
    setItinerary([...itinerary, newFlight]);
  };

  const removeFromItinerary = (flightIndex) => {
    setItinerary(itinerary.filter((_, index) => index !== flightIndex));
  };

  return (
    <div className="min-h-screen">
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-blue-600">Travel Odyssey</h1>
        <div className="flex items-center gap-2">
    <Button onClick={() => setIsModalOpen(true)} variant="outline" className="flex items-center mr-5">
      <FaPlaneDeparture size={20} />
      Itinerary ({itinerary.length})
    </Button>
    {user ? (
  <span className="text-lg font-semibold text-blue-600">Hi, {user.username}</span>
) : (
  <Button>Sign In</Button>
)}
<Button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        onClick={() => setIsChatbotOpen(true)}
      >
        <FaComments size={24} />
      </Button>
      <Dialog open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
      <DialogContent className="max-w-2xl w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">AI Travel Assistant</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Input Field */}
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter route (e.g., Mumbai to Goa)"
            className="w-full p-2 border rounded-md"
          />

          {/* Button */}
          <Button 
  onClick={testGemini} 
  className="w-full flex items-center justify-center gap-2"
  disabled={loading} // Disable button when loading
>
  {loading ? (
    <span className="flex items-center gap-2">
      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
      </svg>
      Fetching...
    </span>
  ) : (
    "Get Best Travel Info"
  )}
</Button>




           {/* Loading Animation */}
    
          {/* Error Message */}
          {error && <p className="text-center text-red-600">{error}</p>}

          {/* Route Recommendation */}
          {route && (
            <Card className="mt-2">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Travel Option</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="max-h-60 overflow-y-auto p-2 border rounded-md">
                  <p className="whitespace-pre-line">{cleanResponse(route.recommended)}</p>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>


  </div>
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
       
{flights.map((flight, index) => (
  <Card key={index} className="mb-4 p-6 shadow-lg rounded-lg border bg-white">
    <CardHeader className="flex items-center space-x-4">
      {/* Airline Logo */}
      {flight.airline.iata && (
        <img
          src={`https://content.airhex.com/content/logos/airlines_${flight.airline.iata}_150_150_s.png`}
          alt={flight.airline.name}
          className="w-14 h-14 object-contain bg-gray-100 rounded-lg p-2"
        />
      )}
      <div>
        <CardTitle className="text-xl font-bold">{flight.airline.name}</CardTitle>
        <p className="text-gray-500">Flight {flight.flight.iata}</p>
      </div>
    </CardHeader>

    <CardContent className="grid grid-cols-2 gap-4 border-t pt-4">
      {/* Departure Info */}
      <div>
        <p className="text-lg font-semibold text-gray-700">Departure</p>
        <p className="text-xl font-bold">{flight.departure.iata} ✈️</p>
        <p className="text-gray-600">{flight.departure.airport}</p>
        <p className="text-gray-500">📅 {flight.departure.scheduled?.substring(0, 10) || "N/A"}</p>
        <p className="text-gray-500">⏰ {flight.departure.estimated || flight.departure.actual || flight.departure.scheduled?.substring(11, 16) || "N/A"}</p>
      </div>

      {/* Arrival Info */}
      <div>
        <p className="text-lg font-semibold text-gray-700">Arrival</p>
        <p className="text-xl font-bold">{flight.arrival.iata} 🛬</p>
        <p className="text-gray-600">{flight.arrival.airport}</p>
        <p className="text-gray-500">📅 {flight.arrival.scheduled?.substring(0, 10) || "N/A"}</p>
        <p className="text-gray-500">⏰ {flight.arrival.estimated || flight.arrival.actual || flight.arrival.scheduled?.substring(11, 16) || "N/A"}</p>
      </div>
    </CardContent>

    {/* Status & Actions */}
    <div className="flex justify-between items-center mt-4 px-6">
      <Badge
        className={`text-lg px-4 py-2 rounded-lg ${
          flight.flight_status === "active"
            ? "bg-green-500 text-white"
            : flight.flight_status === "scheduled"
            ? "bg-blue-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {flight.flight_status.toUpperCase()}
      </Badge>
      <Button variant="outline" className="text-blue-600 border-blue-600">
        View Details
      </Button>
      {showAlert && (
        <Alert className="fixed top-4 right-4 border-green-500 bg-green-100 text-green-700 shadow-lg w-72">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Added to your itinerary successfully.</AlertDescription>
        </Alert>
      )}

      {/* Single Button */}
      <Button variant="outline" className="text-blue-600 border-blue-600" onClick={handleAddToItinerary}>
        Add to Itinerary
      </Button>
    </div>
  </Card>
))}

<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>My Itinerary</DialogTitle>
    </DialogHeader>
    {itinerary.length === 0 ? (
      <p className="text-gray-500 text-center">No flights added yet.</p>
    ) : (
      itinerary.map((flight, index) => {
        const { airline, departure, arrival, date, flight: flightInfo } = flight;

        // Convert date to airline-supported format (YYYY-MM-DD)
        const formattedDate = new Date(date).toISOString().split("T")[0];

        // Airline booking URLs with autofill parameters
        const airlineBookingUrls = {
          "6E": `https://book.goindigo.in/?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}&adults=1&children=0&infants=0&tripType=O`,
          "AA": `https://www.aa.com/booking/find-flights?origin=${departure.iata}&destination=${arrival.iata}&date=${formattedDate}`,
          "DL": `https://www.delta.com/flight-search/search?origin=${departure.iata}&destination=${arrival.iata}&departureDate=${formattedDate}`,
          "UA": `https://www.united.com/en-us/book-flight?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}`,
          "BA": `https://www.britishairways.com/travel/flight-search?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}`,
          "LH": `https://www.lufthansa.com/booking?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}`,
          "SQ": `https://www.singaporeair.com/en_UK/plan-and-book/book-a-flight?from=${departure.iata}&to=${arrival.iata}&departureDate=${formattedDate}`,
          "EK": `https://www.emirates.com/flight-search?departure=${departure.iata}&arrival=${arrival.iata}&departureDate=${formattedDate}`,
          "QR": `https://www.qatarairways.com/en-us/book/find-flights?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}`,
          "AI": `https://www.airindia.com/booking?from=${departure.iata}&to=${arrival.iata}&departDate=${formattedDate}`
        };

        // If airline is supported, use their booking link; otherwise, fallback to Google search
        const bookingUrl = airlineBookingUrls[airline.iata] 
          ? airlineBookingUrls[airline.iata] 
          : `https://www.google.com/search?q=${airline.name}+flight+booking+${departure.iata}+to+${arrival.iata}+${formattedDate}`;

        return (
          <Card key={index} className="mb-4 p-4 flex items-center gap-4">
            {/* Airline Logo */}
            {airline.iata && (
              <img
                src={`https://content.airhex.com/content/logos/airlines_${airline.iata}_150_150_s.png`}
                alt={airline.name}
                className="w-14 h-14 object-contain bg-gray-100 rounded-lg p-2"
              />
            )}

            <div className="flex-1">
              <p className="font-bold">{airline.name} - {flightInfo.iata}</p>
              <p>{departure.iata} → {arrival.iata}</p>
              <p className="text-gray-600">Date: {formattedDate}</p>
              <div className="mt-2 flex gap-2">
                <Button variant="destructive" size="sm" onClick={() => removeFromItinerary(index)}>
                  Remove
                </Button>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" size="sm">
                    Buy Tickets
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        );
      })
    )}
  </DialogContent>
</Dialog>


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
