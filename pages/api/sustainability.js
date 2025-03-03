export default function handler(req, res) {
    const { transportType, distance } = req.body;
    
    const emissionFactors = {
        flight: 0.09,  // kg CO₂ per km
        bus: 0.03,     // kg CO₂ per km
        train: 0.02    // kg CO₂ per km
    };

    const emissions = (emissionFactors[transportType] || 0) * distance;
    
    res.status(200).json({ emissions: emissions.toFixed(2) });
}
