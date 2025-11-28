import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Scissors, Clock, DollarSign, Trash2, PlusCircle } from "lucide-react";

export default function AdminServices() {
  const { businessId } = useParams();
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/admin/services/${businessId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setServices(res.data || []);
    } catch {
      setServices([]);
    }
  };

  const add = async () => {
    if (!name || !price || !duration) return alert("Completá todos los campos");

    try {
      await axios.post(
        `http://localhost:8080/admin/services/${businessId}`,
        { name, price, durationMinutes: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setName("");
      setPrice("");
      setDuration("");
      load();
    } catch {
      alert("Error agregando servicio ❌");
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      load();
    } catch {
      alert("Error eliminando servicio ❌");
    }
  };

  useEffect(() => {
    if (businessId) load();
  }, [businessId]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pt-28 pb-14">
      <div className="max-w-xl mx-auto space-y-8 animate-fadeIn">
        {/* HEADER */}
        <h2 className="text-3xl font-extrabold">Servicios ✂️</h2>

        {/* FORM */}
        <div className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl shadow-xl space-y-3">
          <input
            className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            placeholder="Nombre del servicio"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            type="number"
            className="w-full p-3 bg-zinc-900 text-white border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-sm"
            placeholder="Duración (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button
            onClick={add}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-xl transition active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Agregar servicio
          </button>
        </div>

        {/* LISTA */}
        <div className="space-y-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-zinc-800 border border-zinc-700 p-4 rounded-2xl shadow flex justify-between items-center hover:shadow-xl transition"
            >
              <div>
                <p className="font-semibold text-lg">{s.name}</p>
                <p className="text-zinc-400 text-sm flex items-center gap-2 mt-1">
                  <Clock size={16} /> {s.durationMinutes} min
                  <span className="mx-1">•</span>
                  <DollarSign size={16} /> ${s.price}
                </p>
              </div>

              <button
                onClick={() => remove(s.id)}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-xl transition active:scale-95"
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {services.length === 0 && (
            <p className="text-center text-zinc-400 pt-4">
              No hay servicios aún 🧐
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
