import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, ToggleLeft, ToggleRight } from "lucide-react";

const DIAS = [
  { key: "MONDAY", label: "Lunes" },
  { key: "TUESDAY", label: "Martes" },
  { key: "WEDNESDAY", label: "Miércoles" },
  { key: "THURSDAY", label: "Jueves" },
  { key: "FRIDAY", label: "Viernes" },
  { key: "SATURDAY", label: "Sábado" },
  { key: "SUNDAY", label: "Domingo" },
];

export default function AdminSchedule() {
  const { businessId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const loadSchedule = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/business/${businessId}/schedule`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSchedule(res.data || []);
    } catch (err) {
      console.error("Error cargando horarios", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSchedule = async () => {
    try {
      await axios.put(
        `${API_URL}/admin/business/${businessId}/schedule`,
        schedule,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Horarios guardados con éxito 🎉");
      navigate(`/admin/business/${businessId}/dashboard`);
    } catch (err) {
      console.error("Error guardando horarios", err);
      alert("Error al guardar horarios ❌");
    }
  };

  const updateField = (index, key, value) => {
    const updated = [...schedule];
    updated[index][key] = value;
    setSchedule(updated);
  };

  useEffect(() => {
    loadSchedule();
  }, []);

  if (loading)
    return (
      <p className="text-center pt-40 text-zinc-400 animate-pulse">
        Cargando horarios...
      </p>
    );

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 pt-28 pb-14">
      <div className="max-w-lg mx-auto space-y-8 animate-fadeIn">

        <h1 className="text-3xl font-extrabold flex items-center gap-2">
          <Clock className="text-amber-500" />
          Horarios del negocio
        </h1>

        {schedule.map((day, i) => {
          const dia = DIAS[i];
          return (
            <div
              key={dia.key}
              className={`p-5 rounded-2xl shadow-xl border transition ${
                day.active
                  ? "bg-zinc-800 border-amber-500"
                  : "bg-zinc-800 border-zinc-700 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{dia.label}</span>

                <button
                  className="p-1"
                  onClick={() => updateField(i, "active", !day.active)}
                >
                  {day.active ? (
                    <ToggleRight className="text-amber-500" size={32} />
                  ) : (
                    <ToggleLeft className="text-zinc-500" size={32} />
                  )}
                </button>
              </div>

              {day.active && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400">Apertura</label>
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(e) =>
                        updateField(i, "startTime", e.target.value)
                      }
                      className="w-full bg-zinc-900 text-white border border-zinc-600 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400">Cierre</label>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(e) =>
                        updateField(i, "endTime", e.target.value)
                      }
                      className="w-full bg-zinc-900 text-white border border-zinc-600 p-3 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={saveSchedule}
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 rounded-2xl shadow-xl transition active:scale-95 text-lg"
        >
          💾 Guardar horarios
        </button>
      </div>
    </div>
  );
}
