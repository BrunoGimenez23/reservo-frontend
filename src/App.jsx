export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">

      {/* HERO */}
      <header className="text-center mt-20 px-6 max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Reservo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          La forma más simple de recibir reservas en tu negocio 📅  
          Sin llamados, sin complicaciones.
        </p>

        <a
          href="/login"
          className="px-10 py-3 rounded-xl text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition"
        >
          Administrar mi negocio 🚀
        </a>
      </header>

      {/* FEATURES */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 px-8 max-w-5xl text-center">
        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-3xl">💇‍♂️</span>
          <h3 className="font-semibold mt-2">Barberías</h3>
          <p className="text-gray-600 text-sm mt-1">
            Gestioná turnos y evitá esperas.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-3xl">🏋️</span>
          <h3 className="font-semibold mt-2">Gimnasios</h3>
          <p className="text-gray-600 text-sm mt-1">
            Reservas para clases y actividades.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <span className="text-3xl">🎾</span>
          <h3 className="font-semibold mt-2">Canchas</h3>
          <p className="text-gray-600 text-sm mt-1">
            Horarios siempre organizados.
          </p>
        </div>
      </section>

      {/* PRUEBA GRATIS */}
      <section className="mt-20 text-center max-w-xl px-6">
        <h2 className="text-2xl font-bold mb-3">¿Tenés un negocio?</h2>
        <p className="text-gray-600 mb-6">
          Comenzá a recibir reservas hoy mismo.  
          Prueba gratuita — Sin tarjeta.
        </p>

        <a
          href="/register"
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow transition"
        >
          Crear mi cuenta gratis ✨
        </a>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 mb-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Reservo — Todos los derechos reservados
      </footer>
    </div>
  );
}
