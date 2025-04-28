export default function handler(req, res) {
    const buses = [
        { id: 1, operator: "RedBus", route: "Mumbai → Pune", price: 500, url: "https://www.redbus.in" },
        { id: 2, operator: "AbhiBus", route: "Delhi → Jaipur", price: 450, url: "https://www.abhibus.com" }
    ];
    res.status(200).json(buses);
}
