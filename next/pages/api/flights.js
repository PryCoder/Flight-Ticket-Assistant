export default async function handler(req, res) {
    const API_KEY = "79edc6ae47484a5251cd513721dc2f35";
    const apiUrl = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.data) {
            return res.status(500).json({ error: "Invalid response from API" });
        }

        const flights = data.data.slice(0, 10).map(flight => ({
            airline: flight.airline.name,
            flightNumber: flight.flight.number,
            departure: flight.departure.airport,
            arrival: flight.arrival.airport,
            price: Math.floor(Math.random() * 15000) + 5000, // Simulating prices
            status: flight.flight_status
        }));

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: "Error fetching flight data" });
    }
}
