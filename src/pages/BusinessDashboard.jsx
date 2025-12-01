import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { Eye, Scissors, Calendar, Share2, Copy, MapPin } from "lucide-react";

export default function BusinessDashboard() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const API_URL = import.meta.env.VITE_API_URL;

  const [business, setBusiness] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const loadBusiness = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/business/${businessId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBusiness(res.data);
    } catch (err) {
      console.error("Error cargando negocio:", err);
    }
  };

  useEffect(() => {
    loadBusiness();
  }, [businessId]);

  if (!business) {
    return (
      <p className="text-center mt-20 text-zinc-500">Cargando negocio...</p>
    );
  }

  const publicLink = `${window.location.origin}/${business.slug}`;

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pt-28 pb-12 flex justify-center">
      <div className="w-full max-w-2xl space-y-10 animate-fadeIn">

        {/* INFO */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-full flex justify-center items-center shadow-lg">
            <span className="font-bold text-3xl text-black">
              {business.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold">{business.name}</h1>

          {business.address && (
            <p className="text-zinc-400 flex justify-center gap-2 items-center text-sm">
              <MapPin size={18} /> {business.address}
            </p>
          )}
        </div>

        {/* LINK PUBLICO */}
        <div className="bg-zinc-800 p-6 rounded-2xl border border-zinc-700 shadow-xl space-y-4">
          <div className="font-semibold flex gap-2 items-center text-zinc-200">
            <Share2 size={20} />
            Link para reservas 📲
          </div>

          <div className="flex bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2">
            <input
              readOnly
              value={publicLink}
              className="flex-1 bg-transparent outline-none text-sm text-zinc-300"
            />
            <button
              className="p-2 text-amber-400 hover:text-amber-300 transition"
              onClick={() => {
                navigator.clipboard.writeText(publicLink);
                alert("Link copiado 👌");
              }}
            >
              <Copy size={20} />
            </button>
          </div>

          <a
            href={publicLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-lg transition active:scale-95"
          >
            <Eye size={20} className="inline mr-2" />
            Ver como cliente
          </a>

          <button
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-200 py-2 rounded-xl font-medium transition"
            onClick={() => setShowQR((prev) => !prev)}
          >
            {showQR ? "Ocultar QR" : "Mostrar QR para imprimir 🖨"}
          </button>

          {showQR && (
            <div className="flex justify-center pt-3">
              <QRCode value={publicLink} size={160} bgColor="#18181b" fgColor="#ffffff" />
            </div>
          )}
        </div>

        {/* ADMIN */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-zinc-200">
            Administración del negocio
          </h2>

          <div className="grid grid-cols-2 gap-5">
  <button
    onClick={() => navigate(`/admin/business/${businessId}/services`)}
    className="bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg text-white font-semibold text-center transition active:scale-95
               flex flex-col justify-center items-center gap-2 w-full h-28"
  >
    <Scissors size={28} />
    Servicios
  </button>

  <button
    onClick={() => navigate(`/admin/business/${businessId}/reservations`)}
    className="bg-green-600 hover:bg-green-700 rounded-2xl shadow-lg text-white font-semibold text-center transition active:scale-95
               flex flex-col justify-center items-center gap-2 w-full h-28"
  >
    <Calendar size={28} />
    Reservas
  </button>

  <button
    onClick={() => navigate(`/admin/business/${businessId}/schedule`)}
    className="bg-purple-600 hover:bg-purple-700 rounded-2xl shadow-lg text-white font-semibold text-center transition active:scale-95
               flex flex-col justify-center items-center gap-2 w-full h-28"
  >
    🕒 Horarios
  </button>
</div>

        </div>

      </div>
    </div>
  );
}
