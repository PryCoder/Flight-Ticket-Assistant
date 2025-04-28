import { useEffect, useState } from "react";

export default function Home() {
    const [flights, setFlights] = useState([]);
    const [buses, setBuses] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch("/api/flights").then(res => res.json()).then(setFlights);
        fetch("/api/buses").then(res => res.json()).then(setBuses);
        fetch("/api/hotels").then(res => res.json()).then(setHotels);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">✈️ Flights</h1>
            <ul>
                {flights.map(f => (
                    <li key={f.flightNumber}>{f.airline} - {f.departure} → {f.arrival} - ₹{f.price}</li>
                ))}
            </ul>

            <h1 className="text-3xl font-bold mt-6 mb-4">🚌 Buses</h1>
            <ul>
                {buses.map(b => (
                    <li key={b.id}>{b.operator} - {b.route} - ₹{b.price}</li>
                ))}
            </ul>

            <h1 className="text-3xl font-bold mt-6 mb-4">🏨 Hotels</h1>
            <ul>
                {hotels.map(h => (
                    <li key={h.id}>{h.name} - {h.location} - ₹{h.price}</li>
                ))}
            </ul>
        </div>
    );
}
