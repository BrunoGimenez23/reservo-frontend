import { CheckCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function BookingSuccess() {
  const { state } = useLocation();
  const reservation = state?.reservation;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white px-6 text-center">
      <CheckCircle size={70} className="text-green-400 mb-4" />
      <h1 className="text-4xl font-extrabold mb-2">¡Reserva confirmada! 🎉</h1>

      {reservation && (
        <p className="text-zinc-400 mt-2 font-medium">
          {reservation.serviceName} — {reservation.startTime.replace("T", " a las ")} hs
        </p>
      )}

      <Link
        to="/"
        className="mt-6 text-amber-400 underline font-semibold hover:text-amber-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
