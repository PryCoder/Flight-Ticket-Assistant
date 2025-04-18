import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import {
  FaUser,
  FaEnvelope,
  FaPassport,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";

const BookTicket = ({ flight, onBack }) => {
  const [form, setForm] = useState({ name: "", email: "", passport: "" });
  const [isValid, setIsValid] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormValid =
      form.name.trim().length > 0 &&
      emailRegex.test(form.email) &&
      /^[A-Za-z0-9]{6,}$/.test(form.passport);
    setIsValid(isFormValid);
  }, [form]);

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 51, 102);
    doc.text(flight.airline.name, pageWidth / 2, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 25, pageWidth - 20, 25);

    const gradientColors = [
      { color: [0, 77, 153], yStart: 30, yEnd: 60 },
      { color: [0, 179, 230], yStart: 60, yEnd: 90 },
    ];
    gradientColors.forEach(({ color, yStart, yEnd }) => {
      doc.setFillColor(...color);
      doc.rect(0, yStart, pageWidth, yEnd - yStart, "F");
    });

    doc.setFillColor(0, 102, 204);
    doc.rect(20, 40, pageWidth - 40, 20, "F");
    doc.setFontSize(18);
    doc.setTextColor(255);
    doc.text("BOARDING PASS", pageWidth / 2, 53, { align: "center" });

    const leftX = 20;
    const rightX = pageWidth / 2 + 10;
    const boxWidth = (pageWidth - 60) / 2;

    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(200);
    doc.rect(leftX, 70, boxWidth, 80, "FD");
    doc.rect(rightX, 70, boxWidth, 80, "FD");

    doc.setFontSize(12);
    doc.setTextColor(0, 51, 102);

    const drawRow = (label, value, x, y) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, x, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, x + 40, y);
    };

    drawRow("Name:", form.name, leftX + 10, 85);
    drawRow("Email:", form.email, leftX + 10, 95);
    drawRow("Passport No:", form.passport, leftX + 10, 105);
    drawRow("Seat No:", "17A", leftX + 10, 115);

    drawRow("Flight No:", flight.flight.iata, rightX + 10, 85);
    drawRow("From:", flight.departure.iata, rightX + 10, 95);
    drawRow("To:", flight.arrival.iata, rightX + 10, 105);
    drawRow("Departs:", flight.departure.scheduled, rightX + 10, 115);
    drawRow("Arrives:", flight.arrival.scheduled, rightX + 10, 125);

    const barcodeData = `BookingID_${form.name}_${form.passport}`;
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, barcodeData, {
      format: "CODE128",
      width: 1.5,
      height: 40,
    });
    const barcodeDataUrl = barcodeCanvas.toDataURL("image/png");

    const barcodeX = (pageWidth - 120) / 2;
    doc.addImage(barcodeDataUrl, "PNG", barcodeX, pageHeight - 60, 120, 30);

    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.setFont("helvetica", "bold");
    doc.text("Amount Paid: ₹4999", 20, pageHeight - 20);

// Footer box dimensions and position
// Set font and size first so we can measure it accurately
doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.setTextColor(255);

// Message and padding
const message = "Thank you for choosing Travel Odyssey ✈️";
const textWidth = doc.getTextWidth(message);
const padding = 10;

// Footer box dimensions (slightly wider than text)
const footerBoxWidth = textWidth + padding * 2;
const footerBoxHeight = 15;
const footerBoxX = (pageWidth - footerBoxWidth) / 2;
const footerBoxY = pageHeight - 25;

// Draw blue background box
doc.setFillColor(0, 102, 204);
doc.rect(footerBoxX, footerBoxY, footerBoxWidth, footerBoxHeight, "F");

// Centered text position
const textX = pageWidth / 2;
const textY = footerBoxY + footerBoxHeight / 2 + 3.5; // adjusts for baseline + emoji

// Draw the message
doc.text(message, textX, textY, { align: "center" });


      

    doc.save(`Boarding_Pass_${form.name}_${flight.flight.iata}.pdf`);
  };

  return (
    <div className="border p-8 rounded-2xl shadow-2xl space-y-6 bg-white mt-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-800">
        Book Your Flight
      </h2>
      <div className="text-center text-xl text-gray-700">
        {flight.airline.name} ({flight.flight.iata})
      </div>
      <div className="text-center text-sm text-gray-500 mb-6">
        {flight.departure.iata} → {flight.arrival.iata}
      </div>

      <div className="space-y-4 text-black">
        <div className="flex items-center space-x-2">
          <FaUser size={20} className="text-blue-600" />
          <Input
            className="w-full"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope size={20} className="text-blue-600" />
          <Input
            className="w-full"
            placeholder="Email Address"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaPassport size={20} className="text-blue-600" />
          <Input
            className="w-full"
            placeholder="Passport Number"
            value={form.passport}
            onChange={(e) => setForm({ ...form, passport: e.target.value })}
          />
        </div>

        <div className="text-right font-semibold text-green-600 text-lg">
          ₹4999
        </div>

        <Button
          className="bg-blue-600 text-white w-full hover:bg-blue-700 transition duration-300"
          disabled={!isValid}
          onClick={() => {
            setPaid(true);
            generatePDF();
          }}
        >
          <FaPlaneDeparture className="mr-2" /> Book Now
        </Button>

        <Button
          variant="outline"
          className="w-full text-gray-700 border-gray-300 hover:border-blue-600 mt-4"
          onClick={onBack}
        >
          <FaPlaneArrival className="mr-2" /> Back
        </Button>

        {!isValid && (
          <div className="text-red-500 text-sm pt-2 text-center">
            Please fill all fields correctly to proceed.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;
