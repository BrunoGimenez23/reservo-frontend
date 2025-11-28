import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Trash2 } from "lucide-react";

export default function AdminBusiness() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [businesses, setBusinesses] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/business", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const list = Array.isArray(res.data) ? res.data : [];
      setBusinesses(list);
      if (list.length === 0) setShowForm(true);
    } catch (err) {
      console.error("Error cargando negocios:", err);
      setBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/admin/business",
        { name, address, phone },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/admin/business/${res.data.id}/dashboard`);
    } catch {
      alert("Error creando negocio");
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/business/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      load();
    } catch {
      alert("Error eliminando negocio");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-zinc-400">Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white pt-28 px-4">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-3xl font-extrabold">Mis negocios</h2>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-xl font-semibold shadow-lg transition active:scale-95"
          >
            <Plus size={20} /> Nuevo negocio
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl shadow-xl mb-8 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">Crear negocio</h3>

            <input
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl mb-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Nombre del negocio"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl mb-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-xl mb-4 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex gap-2">
              <button
                onClick={save}
                className="flex-1 bg-green-600 hover:bg-green-700 font-semibold text-white py-2 rounded-xl shadow active:scale-95"
              >
                Crear
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 font-semibold py-2 rounded-xl transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* LISTA NEGOCIOS */}
        <div className="space-y-4">
          {businesses.length > 0 ? (
            businesses.map((b) => (
              <div
                key={b.id}
                className="bg-zinc-800 border border-zinc-700 p-5 rounded-2xl shadow flex items-center gap-4 hover:shadow-xl transition"
              >
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-amber-500 text-black font-bold items-center justify-center">
                  {b.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 text-sm sm:text-base">
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-zinc-400">
                    {b.address || "📍 Dirección no ingresada"}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/admin/business/${b.id}/dashboard`)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition"
                >
                  <Eye size={18} />
                </button>

                <button
                  onClick={() => remove(b.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-xl transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          ) : (
            !showForm && (
              <p className="text-zinc-500 text-center mt-10">
                Todavía no tenés negocios creados 🚀
              </p>
            )
          )}
        </div>

      </div>
    </div>
  );
}
