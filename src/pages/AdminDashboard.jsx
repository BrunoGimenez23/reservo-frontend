import { Link } from "react-router-dom";

export default function AdminDashboard({ business }) {

  if (!business) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {business.name} - Panel de Administración
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Link
          to={`/admin/business/${business.id}/services`}
          className="p-6 bg-green-600 text-white rounded-xl shadow text-center font-semibold hover:bg-green-700"
        >
          🛠 Servicios
        </Link>

        <Link
          to={`/admin/business/${business.id}/reservations`}
          className="p-6 bg-blue-600 text-white rounded-xl shadow text-center font-semibold hover:bg-blue-700"
        >
          📅 Reservas
        </Link>
      </div>
    </div>
  );
}
