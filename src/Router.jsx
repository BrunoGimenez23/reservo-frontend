import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import BarbersHome from "./pages/BarbersHome"; // ⬅️ AGREGADO
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBusiness from "./pages/AdminBusiness";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminReservations from "./pages/AdminReservations";
import AdminServices from "./pages/AdminServices";
import PublicBooking from "./pages/PublicBooking";
import Register from "./pages/Register";
import AdminSchedule from "./pages/AdminSchedule";
import BookingSuccess from "./pages/BookingSuccess";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Home />} />
        <Route path="/barberias" element={<BarbersHome />} /> {/* ⬅️ NUEVA LANDING */}
        <Route path="/login" element={<LoginWrapper />} />
        <Route path="/book/:businessId" element={<PublicBooking />} />
        <Route path="/reserva-confirmada" element={<BookingSuccess />} />
        <Route path="/:slug" element={<PublicBooking />} />
        <Route path="/register" element={<Register />} />

        {/* Panel Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/business/:businessId/schedule"
          element={<AdminSchedule />}
        />

        {/* CRUD de negocios */}
        <Route path="/admin/business" element={<AdminBusiness />} />
        <Route
          path="/admin/business/:businessId/dashboard"
          element={<BusinessDashboard />}
        />

        {/* Reservas y Servicios */}
        <Route
          path="/admin/business/:businessId/services"
          element={<AdminServices />}
        />
        <Route
          path="/admin/business/:businessId/reservations"
          element={<AdminReservations />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function LoginWrapper() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate("/admin")} />;
}
