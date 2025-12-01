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
                <div key={r.id}
  className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl shadow flex justify-between items-center gap-3 hover:border-amber-500 transition"
>
  <div className="space-y-1">
    <p className="font-bold text-lg">{r.clientName}</p>

    {/* Teléfono */}
    {r.clientPhone && (
      <p className="text-zinc-400 text-sm flex gap-1 items-center">
        📞 {r.clientPhone}
      </p>
    )}

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

  {/* Botones acciones */}
  <div className="flex gap-2 items-center">

    {/* WhatsApp */}
    {r.clientPhone && (
  <a
    href={`https://wa.me/598${r.clientPhone.replace(/\D/g, "")}?text=Hola%20${encodeURIComponent(
      r.clientName
    )}%2C%20sobre%20tu%20reserva%20de%20${encodeURIComponent(
      r.serviceName
    )}%20el%20${encodeURIComponent(
      new Date(r.startTime).toLocaleString()
    )}`}
    target="_blank"
    className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition active:scale-95 flex items-center justify-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M20.52 3.48A11.91 11.91 0 0 0 12.05 0C5.44 0 .09 5.35.09 11.96c0 2.11.55 4.17 1.6 5.98L0 24l6.22-1.63a12.02 12.02 0 0 0 5.83 1.48h.01c6.61 0 11.96-5.35 11.96-11.96a11.9 11.9 0 0 0-3.5-8.41zm-8.47 17.9h-.01a9.93 9.93 0 0 1-5.06-1.39l-.36-.21-3.69.97.99-3.59-.24-.37a9.9 9.9 0 0 1-1.53-5.29c0-5.48 4.46-9.94 9.94-9.94a9.86 9.86 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.91 7.02c0 5.48-4.46 9.94-9.94 9.94zm5.48-7.47c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.5-.88-.78-1.48-1.74-1.65-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.48 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.07 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.3.17-1.41-.07-.12-.27-.2-.57-.35z" />
    </svg>
  </a>
)}


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
