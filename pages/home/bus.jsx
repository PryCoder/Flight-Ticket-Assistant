import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Custom Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Custom Card component
import { Badge } from "@/components/ui/badge"; // Custom Badge component
import { FaMapMarkedAlt, FaHiking } from "react-icons/fa"; // Icons for route and hiking
import { Input } from "@/components/ui/input"; // Custom Input component
import { ScrollArea } from "@/components/ui/scroll-area"; // Custom Scroll Area component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Custom Alert components
import { Loader2 } from "lucide-react"; // Loading spinner
import { motion } from "framer-motion"; // Animation library
import routesData from './route.json'; // Import JSON file from the same folder

const BusRoute = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeDetails, setRouteDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to handle loading
  const [busAnimation, setBusAnimation] = useState(false); // State for bus animation trigger

  const handleSearch = () => {
    setLoading(true);
    setError('');
    const routes = routesData.routes;
    let foundRoute = null;
    let totalPrice = 0;
    let totalTime = '';
    let stopsBetween = [];

    setTimeout(() => {  // Simulate API call delay
      for (const route of routes) {
        const stops = route.route.stops;
        const fromStop = from.toLowerCase();
        const toStop = to.toLowerCase();

        const fromIndex = stops.findIndex(stop => stop.stop.toLowerCase().includes(fromStop));
        const toIndex = stops.findIndex(stop => stop.stop.toLowerCase().includes(toStop));

        if (fromIndex >= 0 && toIndex >= 0 && fromIndex < toIndex) {
          foundRoute = route;
          stopsBetween = stops.slice(fromIndex + 1, toIndex); // Excluding the 'from' and 'to' stops
          totalPrice = parseInt(stops[toIndex].price_in_inr) - parseInt(stops[fromIndex].price_in_inr);
          totalTime = stops[fromIndex].arrival_times[0]; // Arrival time of the 'from' stop
          break;
        }
      }

      if (foundRoute) {
        setRouteDetails({
          busNumber: foundRoute.route.bus_number,
          companyName: foundRoute.route.start,
          price: totalPrice,
          time: totalTime,
          stops: stopsBetween,
        });
        setBusAnimation(true); // Trigger bus animation when route is found
      } else {
        setRouteDetails(null);
        setError('No route found between the given stops.');
      }

      setLoading(false); // Hide loading spinner after search
    }, 1500); // Simulating a delay for API call
  };

  return (
    <div className="relative container mx-auto p-8 max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-gray-800">Bus Route Finder</h1>

      <div className="mb-6">
        <label htmlFor="from" className="block text-lg font-semibold text-gray-700 mb-2">From:</label>
        <Input
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500"
          placeholder="Enter your starting point"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="to" className="block text-lg font-semibold text-gray-700 mb-2">To:</label>
        <Input
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500"
          placeholder="Enter your destination"
        />
      </div>

      <Button
        onClick={handleSearch}
        className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
      >
        Find Route
      </Button>

      {error && (
        <Alert className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <div className="text-center mt-4">
          <Loader2 className="animate-spin text-gray-500" size={30} />
        </div>
      )}

      {routeDetails && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200">
          <Card>
            <CardHeader>
              <CardTitle>{routeDetails.companyName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">Departure</p>
                  <p className="text-xl font-bold text-green-600">{from} 🚌</p>
                  <p className="text-gray-600">Price: ₹{routeDetails.price}</p>
                  <p className="text-gray-600">Bus Number: {routeDetails.busNumber}</p>
                  <p className="text-gray-500">Arrival Time: {routeDetails.time}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-700">Arrival</p>
                  <p className="text-xl font-bold text-green-600">{to}🚌 </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stops in Between */}
          {routeDetails.stops && routeDetails.stops.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700">Stops Along the Way:</h4>
              <ScrollArea>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  {routeDetails.stops.map((stop, index) => (
                    <li key={index}>{stop.stop}</li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          <Button
            onClick={() => alert('Added to your itinerary!')}
            className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add to Itinerary
          </Button>
        </div>
      )}

      {/* Bus Animation */}
      {busAnimation && (
        <motion.img
          src="https://pngpix.com/images/hd/city-line-bus-png-moi-6vo19us7cjbegu12.jpg"
          alt="Bus"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-1/4 z-10"
          initial={{ x: -200 }}
          animate={{ x: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
        />
      )}
    </div>
  );
};

export default BusRoute;
