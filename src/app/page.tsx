/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const checkAppointments = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get("/api/check-appointments");
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Hata oluştu, tekrar deneyin.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Vize Randevu Takip Botu</h1>
      <button
        onClick={checkAppointments}
        disabled={loading}
        className="bg-blue-500 text-white px-6 py-2 rounded-md"
      >
        {loading ? "Kontrol Ediliyor..." : "Randevuları Kontrol Et"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
