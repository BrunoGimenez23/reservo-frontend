import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <Navbar dark />

      {/* HERO */}
      <header
        className="min-h-[80vh] w-full bg-cover bg-center relative px-6 flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: "url('/barber-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            Más cortes 💈<br className="hidden sm:block" /> Menos WhatsApp 📱✋
          </h1>

          <p className="text-base sm:text-lg text-zinc-200 mb-8">
            Automatizá los turnos y llená la agenda — sin tarjeta, sin compromiso.
          </p>

          <a
            href="/register"
            className="px-12 py-4 bg-amber-500 hover:bg-amber-600 rounded-2xl text-black font-bold text-lg inline-block shadow-xl transition active:scale-95"
          >
            Probar gratis ✂️
          </a>

          <p className="text-green-400 font-medium text-xs mt-4 sm:text-sm">
            🇺🇾 Beta Free — Cupos limitados — Solo Uruguay
          </p>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="mt-20 px-5 grid gap-5 sm:grid-cols-3 max-w-6xl mx-auto text-center">
        <Benefit icon="⚡" title="Turnos al instante" subtitle="Reservas 24/7" />
        <Benefit icon="⏱️" title="Menos ausencias" subtitle="Clientes comprometidos" />
        <Benefit icon="💵" title="Más ingresos" subtitle="Agenda siempre llena" />
      </section>

      {/* ¿ES PARA VOS? */}
      <section className="mt-24 max-w-xl mx-auto text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          ¿Reservo es para tu barbería?
        </h2>
        <ul className="text-left text-zinc-300 space-y-3">
          <li>✔ Si anotás turnos por WhatsApp</li>
          <li>✔ Si te escriben a cualquier hora</li>
          <li>✔ Si te quedan huecos en la agenda</li>
          <li>❌ Si solo trabajás por orden de llegada</li>
        </ul>
      </section>

      {/* SCREENSHOTS */}
      <section className="mt-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">Todo desde tu celular 📱</h2>
        <p className="text-zinc-300 mb-10 max-w-xl mx-auto">
          Panel simple para aceptar, mover o cancelar turnos en segundos.
        </p>

        <div className="grid gap-10 sm:grid-cols-3 place-items-center">
          <PhoneMockup img="/serviciosiphone.png" />
          <PhoneMockup img="/reservasiphone.png" />
          <PhoneMockup img="clienteiphone.png" />
        </div>
      </section>

      {/* TESTIMONIOS → Cambiarlos cuando tengas reales */}
      <section className="mt-28 text-center px-5">
        <h2 className="text-2xl font-bold mb-6 sm:text-3xl">
          Barberos que ya lo usan
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          <Testimonial text="La agenda se llena sola 💪" name="Barbería Style" />
          <Testimonial text="Mis clientes reservan solos 😎" name="Fade Pro" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-32 text-center max-w-xl px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-4">¿Querés más cortes?</h2>
        <p className="text-zinc-300 mb-6">Probalo gratis — sin tarjeta</p>

        <a
          href="/register"
          className="px-12 py-4 bg-amber-500 hover:bg-amber-600 text-black rounded-2xl font-bold shadow-xl transition active:scale-95"
        >
          Empezar ahora ✨
        </a>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 pb-8 text-center text-zinc-500 text-xs sm:text-sm">
        © {new Date().getFullYear()} Reservo — Hecho en Uruguay 🇺🇾
      </footer>

      {/* WHATSAPP FLOAT CTA */}
      <a
        href="https://wa.me/598XXXXXXXX?text=Quiero%20Reservo%20para%20mi%20barbería"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-xl text-2xl hover:scale-110 transition"
      >
        🟢
      </a>
    </div>
  );
}

function PhoneMockup({ img }) {
  return (
    <div className="bg-black rounded-3xl border-4 border-zinc-700 p-3 shadow-xl w-[220px]">
      <img src={img} className="rounded-2xl w-full h-auto" />
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
