import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const register = async () => {
    if (!email || !password) {
      setErrorMsg("Completa todos los campos ✍️");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/auth/register`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/admin/business");
    } catch (err) {
      console.error(err);
      setErrorMsg("Este email ya está registrado ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="bg-zinc-800 border border-zinc-700 p-8 rounded-2xl w-full max-w-md text-white shadow-xl animate-fadeIn">
        
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Crear cuenta ✨
        </h2>
        <p className="text-center text-zinc-400 text-sm mb-6">
          Empezá gratis — sin tarjeta
        </p>

        {errorMsg && (
          <p className="text-red-400 text-sm mb-4 text-center bg-red-950 bg-opacity-30 py-2 rounded-xl">
            {errorMsg}
          </p>
        )}

        <label className="text-sm font-medium text-zinc-300">Email</label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          className="w-full p-3 mt-1 mb-4 bg-zinc-900 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium text-zinc-300">Contraseña</label>
        <input
          type="password"
          placeholder="Mínimo 6 caracteres"
          className="w-full p-3 mt-1 mb-6 bg-zinc-900 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl shadow-lg transition active:scale-95"
        >
          {loading ? "Creando..." : "Crear cuenta 🚀"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <span className="h-px flex-1 bg-zinc-700"></span>
          <span className="text-xs text-zinc-500">ó</span>
          <span className="h-px flex-1 bg-zinc-700"></span>
        </div>

        <button
          disabled
          className="w-full py-3 bg-zinc-700 text-gray-400 rounded-xl font-semibold shadow transition cursor-not-allowed"
        >
          Continuar con Google (próximamente)
        </button>

        <p className="text-center text-zinc-400 mt-6 text-sm">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="text-amber-400 font-bold hover:text-amber-300"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
