import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Phone, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";

export default function PublicBooking() {
  const { slug } = useParams();

  const API_URL = import.meta.env.VITE_API_URL;

  const [business, setBusiness] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const loadBusiness = async () => {
    const res = await fetch(`${API_URL}/public/business/slug/${slug}`);
    const data = await res.json();
    setBusiness(data);
    setBusinessId(data.id);
  };

  const loadServices = async () => {
    const res = await fetch(`${API_URL}/public/business/${businessId}/services`);
    setServices(await res.json());
  };

  const fetchSlots = async () => {
    if (!selectedService || !date) return;

    setLoadingSlots(true);
    const res = await fetch(
      `${API_URL}/public/business/${businessId}/availability?serviceId=${selectedService.id}&date=${date}`
    );
    setSlots(await res.json());
    setLoadingSlots(false);
  };

  const reserve = async () => {
    if (!clientName || !clientEmail || !selectedTime)
      return alert("Completá tus datos ✍️");

    const startTime = `${date}T${selectedTime}`;

    const res = await fetch(
      `${API_URL}/public/business/${businessId}/reservations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          startTime,
          serviceId: selectedService.id,
        }),
      }
    );

    if (res.ok) setSuccess(true);
    else alert("Error al reservar 😥");
  };

  useEffect(() => {
    slug && loadBusiness();
  }, [slug]);

  useEffect(() => {
    businessId && loadServices();
  }, [businessId]);

  // 🎉 Pantalla de éxito
  if (success)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white px-6 text-center">
        <CheckCircle size={70} className="text-green-400 mb-4" />
        <h1 className="text-4xl font-extrabold mb-2">¡Reserva confirmada!</h1>
        <p className="text-zinc-400">Te enviamos los detalles a tu email 📩</p>
        <a
          href="/"
          className="mt-6 text-amber-400 underline font-semibold hover:text-amber-300"
        >
          Volver al inicio
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pt-28 pb-20">
      <div className="max-w-md mx-auto space-y-8 animate-fadeIn">

        {/* NEGOCIO */}
        {business && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-3xl shadow-xl p-8 text-center space-y-3">
            <div className="w-20 h-20 mx-auto bg-amber-500 text-black font-bold text-4xl rounded-full flex items-center justify-center shadow-lg">
              {business.name.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-3xl font-extrabold">{business.name}</h1>

            {business.address && (
              <p className="text-zinc-400 flex gap-2 justify-center">
                <MapPin size={18} /> {business.address}
              </p>
            )}

            {business.phone && (
              <p className="text-zinc-400 flex gap-2 justify-center">
                <Phone size={18} /> {business.phone}
              </p>
            )}
          </div>
        )}

        {/* SERVICIO */}
        <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-3">
          <label className="font-semibold">Elegí un servicio ✂️</label>
          <select
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:ring-2 focus:ring-amber-500 outline-none"
            onChange={(e) => {
              const s = services.find((srv) => srv.id == e.target.value);
              setSelectedService(s);
              setDate("");
              setSlots([]);
              setSelectedTime("");
            }}
          >
            <option value="">Seleccionar...</option>
            {services.map((s) => (
              <option key={s.id} value={s.id} className="bg-zinc-900">
                {s.name} — ${s.price}
              </option>
            ))}
          </select>
        </div>

        {/* FECHA */}
        {selectedService && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4 animate-fadeIn">
            <label className="font-semibold flex gap-2 items-center">
              <Calendar size={20} /> Seleccioná la fecha
            </label>

            <input
              type="date"
              min={today}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:ring-2 focus:ring-amber-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={fetchSlots}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-bold shadow-lg transition"
            >
              {loadingSlots ? "Buscando..." : "Ver horarios"}
            </button>
          </div>
        )}

        {/* HORARIOS */}
        {slots.length > 0 && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 animate-fadeIn">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock size={20} /> Horarios disponibles
            </h3>

            <div className="grid grid-cols-3 gap-3">
              {slots.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(slot)}
                  className={`p-2 rounded-xl text-sm transition font-medium ${
                    selectedTime === slot
                      ? "bg-green-500 text-black shadow-lg"
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DATOS CLIENTE */}
        {selectedTime && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4 animate-fadeIn">
            <div>
              <label className="text-sm">Tu nombre</label>
              <input
                type="text"
                className="w-full p-3 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="w-full p-3 mt-1 bg-zinc-900 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* CTA RESERVAR */}
        {selectedTime && (
          <button
            onClick={reserve}
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-bold shadow-xl text-lg transition active:scale-95 animate-fadeIn"
          >
            Confirmar reserva ✨
          </button>
        )}
      </div>
    </div>
  );
}
