import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar dark />

      {/* HERO */}
      <header className="flex flex-col items-center text-center mt-32 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
          Más cortes 💈 <br className="hidden sm:block" /> Menos mensajes 📱✋
        </h1>

        <p className="text-base sm:text-lg text-zinc-300 mb-10">
          Tus clientes reservan online. Vos ganás tiempo y llenás más turnos 💵
        </p>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-xl font-semibold text-base sm:text-lg shadow-lg transition active:scale-95 text-center"
          >
            Probar gratis ✂️
          </a>

          <a
            href="/login"
            className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-gray-200 text-black rounded-xl font-semibold text-base sm:text-lg shadow-lg transition active:scale-95 text-center"
          >
            Ya uso Reservo
          </a>
        </div>

        <p className="text-green-400 font-medium text-xs mt-4 sm:text-sm">
          🔥 Beta Free — Cupos limitados — Sin tarjeta
        </p>
      </header>

      {/* BENEFICIOS */}
      <section className="mt-20 px-5 grid gap-5 sm:grid-cols-3 max-w-6xl mx-auto text-center">
        <Benefit icon="⚡" title="Turnos al instante" subtitle="Reservas online 24/7" />
        <Benefit icon="⏱️" title="Menos ausencias" subtitle="Clientes más comprometidos" />
        <Benefit icon="💵" title="Más ingresos" subtitle="Agenda siempre completa" />
      </section>

      {/* COMO FUNCIONA */}
      <section className="mt-32 px-5 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
          ¿Cómo funciona?
        </h2>

        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <Step number="1" title="Creás tu cuenta" text="Nombre y email" />
          <Step number="2" title="Agregás tus servicios" text="Cortes, barba, etc." />
          <Step number="3" title="Compartís tu link" text="Y recibís reservas" />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mt-28 text-center px-5">
        <h2 className="text-2xl font-bold mb-6 sm:text-3xl">
          Barberos que ya lo usan
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          <Testimonial
            text="No más WhatsApps a la noche. La agenda se llena sola 💪"
            name="Barbería Style"
          />
          <Testimonial
            text="Lo puse en Instagram y mis clientes reservan solos 😎"
            name="Fade Pro"
          />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-32 text-center max-w-xl px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-4">¿Querés llenar tu agenda?</h2>
        <p className="text-zinc-300 mb-6">Probalo gratis — sin tarjeta</p>

        <a
          href="/register"
          className="block sm:inline-block px-12 py-4 text-lg bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-bold shadow-xl transition active:scale-95"
        >
          Empezar ahora ✨
        </a>
      </section>

      <footer className="mt-24 pb-8 text-center text-zinc-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} Reservo
      </footer>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="bg-zinc-800 py-6 px-4 rounded-2xl shadow transition hover:shadow-xl active:scale-95">
      <div className="text-amber-500 font-bold text-3xl mb-3">{number}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-zinc-400 text-sm mt-1">{text}</p>
    </div>
  );
}

function Benefit({ icon, title, subtitle }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow transition hover:shadow-xl active:scale-95">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-zinc-400 text-sm">{subtitle}</p>
    </div>
  );
}

function Testimonial({ text, name }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-md transition hover:shadow-xl active:scale-95">
      <p className="italic text-sm mb-3">“{text}”</p>
      <p className="font-semibold text-white text-sm">— {name}</p>
    </div>
  );
}
