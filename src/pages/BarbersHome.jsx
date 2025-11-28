import Navbar from "../components/Navbar";

export default function BarbersHome() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar dark />

      {/* HERO */}
      <header className="flex flex-col items-center text-center mt-28 px-6 max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-5 leading-tight">
          Más cortes 💈<br />Menos mensajes ✋📱
        </h1>

        <p className="text-lg text-zinc-300 mb-10">
          Tus clientes reservan online. Vos ganás tiempo y plata 💵
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="px-10 py-3 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-semibold text-lg shadow-lg transition"
          >
            Probar gratis ✂️
          </a>

          <a
            href="/login"
            className="px-10 py-3 bg-white hover:bg-gray-200 text-black rounded-xl font-semibold text-lg shadow-lg transition"
          >
            Ya uso Reservo
          </a>
        </div>

        <p className="text-green-400 font-medium text-sm mt-4">
          🟢 Cupos Beta — Sin tarjeta
        </p>
      </header>

      {/* BENEFICIOS */}
      <section className="mt-24 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        <Benefit icon="⚡" title="Agenda al instante" subtitle="Reservas 24/7" />
        <Benefit icon="🚫" title="Sin ausencias" subtitle="Turnos claros y visibles" />
        <Benefit icon="💵" title="Más ingresos" subtitle="Aprovechá cada espacio" />
      </section>

      {/* COMO FUNCIONA */}
      <section className="mt-32 px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          ¿Cómo funciona?
        </h2>

        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <Step number="1" title="Creás tu cuenta" text="Email y contraseña" />
          <Step number="2" title="Cargás tus servicios" text="Corte, barba, etc." />
          <Step number="3" title="Compartís tu link" text="Tus clientes reservan" />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mt-28 text-center px-6">
        <h2 className="text-2xl font-bold mb-6">Barberos que ya lo usan</h2>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Testimonial
            text="Ya no me escriben a cualquier hora, y completo más turnos."
            name="Barbería Style"
          />
          <Testimonial
            text="Lo instalé en mi Instagram y recibo reservas solo."
            name="Fade Pro"
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-32 text-center max-w-xl px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-4">¿Querés más cortes por día?</h2>
        <p className="text-zinc-300 mb-6">Probalo gratis — Cupos limitados</p>

        <a
          href="/register"
          className="px-12 py-4 text-lg bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-bold shadow-xl transition"
        >
          Crear cuenta ahora ✨
        </a>
      </section>

      <footer className="mt-24 pb-8 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Reservo
      </footer>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
      <div className="text-amber-500 font-bold text-3xl mb-3">{number}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-zinc-400 text-sm mt-1">{text}</p>
    </div>
  );
}

function Benefit({ icon, title, subtitle }) {
  return (
    <div className="bg-zinc-800 rounded-2xl shadow p-6 transition hover:shadow-xl">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-lg text-white">{title}</h4>
      <p className="text-zinc-400 text-sm">{subtitle}</p>
    </div>
  );
}

function Testimonial({ text, name }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-md text-zinc-300 max-w-xs mx-auto transition hover:shadow-xl">
      <p className="italic text-sm mb-3">“{text}”</p>
      <p className="font-semibold text-white text-sm">— {name}</p>
    </div>
  );
}
