let itineraries = [];

export default function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json(itineraries);
    } else if (req.method === "POST") {
        const { destination, dates, activities } = req.body;
        const newItinerary = { id: Date.now(), destination, dates, activities };
        itineraries.push(newItinerary);
        return res.status(201).json(newItinerary);
    }
}
