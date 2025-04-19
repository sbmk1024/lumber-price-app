
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Full lumber data
const lumberData = {
  hemlock: [
    { size: "1x4", "8'": 2.15, "10'": 2.65, "12'": 3.8, "14'": 3.7, "16'": 4.25 },
    { size: "1x6", "8'": 3.2, "10'": 4.0, "12'": 4.8, "14'": 5.6, "16'": 6.4 },
    { size: "1x8", "8'": 4.25, "10'": 5.35, "12'": 6.4, "14'": 7.45, "16'": 8.55 },
    { size: "1x10", "8'": 6.0, "10'": 7.5, "12'": 9.0, "14'": 10.5, "16'": 12.0 },
    { size: "2x4", "8'": 4.25, "10'": 5.35, "12'": 6.4, "14'": 7.45, "16'": 8.55 },
    { size: "2x6", "8'": 6.4, "10'": 8.0, "12'": 9.6, "14'": 11.2, "16'": 12.8 }
  ],
  pine: [
    { size: "1x2", "8'": 1.0, "10'": 1.35, "12'": 1.6, "14'": 1.8, "16'": 2.15 },
    { size: "1x4", "8'": 2.15, "10'": 2.65, "12'": 3.8, "14'": 3.7, "16'": 4.25 },
    { size: "2x4", "8'": 4.25, "10'": 5.35, "12'": 6.4, "14'": 7.45, "16'": 8.55 }
  ]
};

export default function App() {
  const [type, setType] = useState("hemlock");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  const sizes = lumberData[type].map((i) => i.size);
  const lengths = ["8'", "10'", "12'", "14'", "16'"];

  const addToCart = () => {
    const item = lumberData[type].find((i) => i.size === selectedSize);
    if (!item || !selectedLength || quantity < 1) return;
    setCart((prev) => {
      const idx = prev.findIndex(
        (c) => c.category === type && c.size === selectedSize && c.length === selectedLength
      );
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        toast.success("Quantity updated");
        return updated;
      }
      return [
        ...prev,
        {
          category: type,
          size: selectedSize,
          length: selectedLength,
          quantity,
          unitPrice: item[selectedLength]
        }
      ];
    });
  };

  const updateQuantity = (idx, newQty) => {
    setCart((prev) => {
      const updated = [...prev];
      if (newQty <= 0) {
        updated.splice(idx, 1);
      } else {
        updated[idx].quantity = newQty;
      }
      return updated;
    });
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* UI omitted for brevity */}
      <h1>Lumber Price List App (code sample)</h1>
    </div>
  );
}
