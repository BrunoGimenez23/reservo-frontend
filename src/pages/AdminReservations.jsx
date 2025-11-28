import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, CalendarClock, Scissors } from "lucide-react";

export default function AdminReservations() {
  const { businessId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const token = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_API_URL;

  const loadReservations = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/business/${businessId}/reservations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservations(res.data || []);
    } catch (err) {
      console.error("Error cargando reservas:", err);
      setReservations([]);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/admin/business/${businessId}/reservations/${id}?status=${status}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadReservations();
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  };

  useEffect(() => {
    loadReservations();
  }, [businessId]);

  const statusBadge = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-600 text-white";
      case "CANCELED":
        return "bg-red-600 text-white";
      default:
        return "bg-yellow-500 text-black";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pt-24 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-extrabold">📅 Reservas</h2>

        {/* 🔥 Botones filtradores */}
        <div className="flex gap-2">
          {["ALL", "PENDING", "COMPLETED", "CANCELED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-700 text-zinc-300"
              }`}
            >
              {f === "ALL"
                ? "Todas"
                : f === "PENDING"
                ? "Pendientes"
                : f === "COMPLETED"
                ? "Completadas"
                : "Canceladas"}
            </button>
          ))}
        </div>

        {reservations.length === 0 ? (
          <div className="text-center text-zinc-500 bg-zinc-800 border border-zinc-700 rounded-2xl py-10">
            Todavía no hay reservas 🙌
          </div>
        ) : (
          <div className="space-y-4 pb-10">
            {reservations
              .filter((r) => filter === "ALL" || r.status === filter)
              .map((r) => (
                <div
                  key={r.id}
                  className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl shadow flex justify-between items-center gap-3 hover:border-amber-500 transition"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{r.clientName}</p>

                    <p className="text-zinc-400 text-sm flex gap-1 items-center">
                      <Scissors size={15} /> {r.serviceName}
                    </p>

                    <p className="text-zinc-400 text-sm flex gap-1 items-center">
                      <CalendarClock size={15} />
                      {new Date(r.startTime).toLocaleString()}
                    </p>

                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-lg mt-2 inline-block ${statusBadge(
                        r.status
                      )}`}
                    >
                      {r.status === "PENDING"
                        ? "Pendiente"
                        : r.status === "COMPLETED"
                        ? "Completada"
                        : "Cancelada"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(r.id, "COMPLETED")}
                      className="p-2 rounded-lg bg-green-600 hover:bg-green-700 transition active:scale-95"
                    >
                      <CheckCircle size={20} />
                    </button>

                    <button
                      onClick={() => updateStatus(r.id, "CANCELED")}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition active:scale-95"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
