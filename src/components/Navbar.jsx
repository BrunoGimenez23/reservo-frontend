import { Link, useLocation } from "react-router-dom";

export default function Navbar({ dark }) {
  const location = useLocation();
  const hideOnAdmin = location.pathname.startsWith("/admin");

  if (hideOnAdmin) return null;

  const base = dark ? "text-white" : "text-blue-600";
  const button = dark
    ? "bg-amber-500 text-black hover:bg-amber-600"
    : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <nav
      className={`w-full py-3 px-6 fixed top-0 left-0 z-50 ${
        dark ? "bg-transparent" : "bg-white shadow"
      }`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className={`text-2xl font-bold tracking-tight ${base}`}
        >
          Reservo
        </Link>

        <div className="flex gap-3">
          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg font-medium border ${
              dark ? "border-zinc-400 text-zinc-200 hover:bg-zinc-800" : "border-blue-600 text-blue-600 hover:bg-blue-50"
            } transition`}
          >
            Ingresar
          </Link>

          <Link
            to="/register"
            className={`px-4 py-2 rounded-lg font-medium shadow ${button} transition`}
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </nav>
  );
}
