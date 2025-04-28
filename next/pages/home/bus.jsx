import { useState } from 'react';
<<<<<<< HEAD
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
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import routesData from './route.json';
import jsPDF from "jspdf"; // <--- Added import
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8

const BusRoute = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routeDetails, setRouteDetails] = useState(null);
  const [error, setError] = useState('');
<<<<<<< HEAD
  const [loading, setLoading] = useState(false); // State to handle loading
  const [busAnimation, setBusAnimation] = useState(false); // State for bus animation trigger
=======
  const [loading, setLoading] = useState(false);
  const [busAnimation, setBusAnimation] = useState(false);
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8

  const handleSearch = () => {
    setLoading(true);
    setError('');
    const routes = routesData.routes;
    let foundRoute = null;
    let totalPrice = 0;
    let totalTime = '';
    let stopsBetween = [];

<<<<<<< HEAD
    setTimeout(() => {  // Simulate API call delay
=======
    setTimeout(() => {
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
      for (const route of routes) {
        const stops = route.route.stops;
        const fromStop = from.toLowerCase();
        const toStop = to.toLowerCase();

        const fromIndex = stops.findIndex(stop => stop.stop.toLowerCase().includes(fromStop));
        const toIndex = stops.findIndex(stop => stop.stop.toLowerCase().includes(toStop));

        if (fromIndex >= 0 && toIndex >= 0 && fromIndex < toIndex) {
          foundRoute = route;
<<<<<<< HEAD
          stopsBetween = stops.slice(fromIndex + 1, toIndex); // Excluding the 'from' and 'to' stops
          totalPrice = parseInt(stops[toIndex].price_in_inr) - parseInt(stops[fromIndex].price_in_inr);
          totalTime = stops[fromIndex].arrival_times[0]; // Arrival time of the 'from' stop
=======
          stopsBetween = stops.slice(fromIndex + 1, toIndex);
          totalPrice = parseInt(stops[toIndex].price_in_inr) - parseInt(stops[fromIndex].price_in_inr);
          totalTime = stops[fromIndex].arrival_times[0];
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
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
<<<<<<< HEAD
        setBusAnimation(true); // Trigger bus animation when route is found
=======
        setBusAnimation(true);
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
      } else {
        setRouteDetails(null);
        setError('No route found between the given stops.');
      }

<<<<<<< HEAD
      setLoading(false); // Hide loading spinner after search
    }, 1500); // Simulating a delay for API call
=======
      setLoading(false);
    }, 1500);
  };

  // 🔽 Generate PDF Ticket styled like a real-world bus ticket
  const generateBusTicketPDF = () => {
    const doc = new jsPDF();

    // Set up fonts and styles for the ticket
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    // Create a border for the ticket
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277); // Full ticket border

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204);
    doc.text("Travel Odyssey", 105, 25, { align: "center" });
    doc.setFontSize(14);
    doc.setTextColor(50);

    // Ticket Details
    doc.text(`Passenger: Guest User`, 20, 40);
    doc.text(`From: ${from}`, 20, 55);
    doc.text(`To: ${to}`, 20, 70);
    doc.text(`Bus No: ${routeDetails.busNumber}`, 20, 85);
    doc.text(`Company: ${routeDetails.companyName}`, 20, 100);
    doc.text(`Departure Time: ${routeDetails.time}`, 20, 115);
    doc.text(`Amount Paid: ₹${routeDetails.price}`, 20, 130);

    // Dividing Line
    doc.setLineWidth(0.5);
    doc.line(10, 135, 200, 135); // A horizontal line

    // Additional information
    doc.setFontSize(12);
    doc.text("Important Information", 20, 150);
    doc.text("Ensure you carry a valid ID while traveling.", 20, 160);
    doc.text("This ticket is valid for the stated journey only.", 20, 170);

    // Footer
    const footerMsg = "Thank you for choosing Travel Odyssey 🚌";
    const textWidth = doc.getTextWidth(footerMsg);
    const boxWidth = textWidth + 20;
    const boxX = (210 - boxWidth) / 2;

    doc.setFillColor(0, 102, 204);
    doc.rect(boxX, 250, boxWidth, 15, "F");
    doc.setTextColor(255);
    doc.setFontSize(10);
    doc.text(footerMsg, 105, 260, { align: "center" });

    // Save the PDF
    doc.save(`Bus_Ticket_${from}_to_${to}.pdf`);
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
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
<<<<<<< HEAD
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500"
=======
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 text-black"
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
          placeholder="Enter your starting point"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="to" className="block text-lg font-semibold text-gray-700 mb-2">To:</label>
        <Input
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
<<<<<<< HEAD
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500"
=======
          className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 text-black"
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
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
<<<<<<< HEAD
                  <p className="text-xl font-bold text-green-600">{to}🚌 </p>
=======
                  <p className="text-xl font-bold text-green-600">{to} 🚌</p>
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
                </div>
              </div>
            </CardContent>
          </Card>

<<<<<<< HEAD
          {/* Stops in Between */}
=======
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
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
<<<<<<< HEAD
            onClick={() => alert('Added to your itinerary!')}
            className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add to Itinerary
=======
            onClick={generateBusTicketPDF}
            className="w-full p-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 mt-6"
          >
            Book Bus Ticket
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
          </Button>
        </div>
      )}

<<<<<<< HEAD
      {/* Bus Animation */}
=======
>>>>>>> 20cb37df65ea6e5cdba4523184871ae61181d6d8
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
