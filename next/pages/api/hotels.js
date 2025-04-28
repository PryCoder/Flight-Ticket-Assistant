export default function handler(req, res) {
    const hotels = [
        { id: 1, name: "Taj Mumbai", location: "Mumbai", price: 12000 },
        { id: 2, name: "Oberoi Delhi", location: "Delhi", price: 9000 }
    ];
    res.status(200).json(hotels);
}
