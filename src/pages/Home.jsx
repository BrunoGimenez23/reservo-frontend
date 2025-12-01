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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Más cortes 💈 <br className="hidden sm:block" /> Menos WhatsApp 📱✋
          </h1>

          <p className="text-base sm:text-lg text-zinc-200 mb-4">
            Automatizá los turnos y llená la agenda — sin tarjeta, sin compromiso.
          </p>

          <p className="text-amber-400 font-medium text-sm mb-6">
            Desde $500 UYU/mes — 14 días gratis 🔥
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/register"
              className="px-10 py-4 bg-amber-500 hover:bg-amber-600 rounded-xl 
                         text-black font-bold text-base sm:text-lg shadow-xl 
                         transition active:scale-95"
            >
              Probar gratis ✂️
            </a>

            <a
              href="https://wa.me/598XXXXXXXX?text=Hola%20quiero%20ver%20demo%20Reservo"
              target="_blank"
              className="px-10 py-4 border border-zinc-600 rounded-xl font-semibold
                         hover:bg-zinc-800 transition active:scale-95"
            >
              Ver demo 👀
            </a>
          </div>

          <p className="text-green-400 font-medium text-xs mt-4 sm:text-sm">
            🇺🇾 Beta Free — Cupos limitados — Solo Uruguay
          </p>
        </div>
      </header>

      {/* BENEFICIOS */}
      <section className="mt-24 px-5 grid gap-5 sm:grid-cols-3 max-w-6xl mx-auto text-center">
        <Benefit icon="⚡" title="Sin mensajes" subtitle="Turnos online 24/7" />
        <Benefit icon="📅" title="Agenda completa" subtitle="Menos ausencias" />
        <Benefit icon="💵" title="Más ingresos" subtitle="Más cortes por día" />
      </section>

      {/* ¿ES PARA VOS? */}
      <section className="mt-28 max-w-xl mx-auto text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          ¿Reservo es para tu barbería?
        </h2>
        <ul className="text-left text-zinc-300 space-y-3">
          <li>✔ Si anotás turnos por WhatsApp</li>
          <li>✔ Si perdés tiempo coordinando horarios</li>
          <li>✔ Si te quedan huecos en la agenda</li>
          <li>❌ Si solo trabajás por orden de llegada</li>
        </ul>
      </section>

      {/* SCREENSHOTS */}
      <section className="mt-28 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">
          Tu barbería desde tu celular 📱
        </h2>

        <div className="grid gap-10 sm:grid-cols-3 place-items-center">
          <PhoneMockup img="/serviciosiphone.png" />
          <PhoneMockup img="/reservasiphone.png" />
          <PhoneMockup img="/clienteiphone.png" />
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="mt-32 text-center px-5">
        <h2 className="text-2xl font-bold mb-6 sm:text-3xl">
          Barberos que ya lo usan
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
          <Testimonial text="Ahora atiendo sin estrés el WhatsApp 🙌" name="La Unión — Montevideo" />
          <Testimonial text="Mis clientes reservan solos 😎" name="Centro — Montevideo" />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mt-28 text-center max-w-xl px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-4">¿Querés más cortes?</h2>
        <p className="text-zinc-300 mb-6">Probalo gratis — sin tarjeta</p>

        <a
          href="/register"
          className="px-12 py-4 bg-amber-500 hover:bg-amber-600 text-black 
                     rounded-2xl font-bold shadow-xl transition active:scale-95"
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
        href="https://wa.me/59898235535?text=Quiero%20Reservo%20para%20mi%20barbería"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-xl 
                   text-2xl hover:scale-110 transition"
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
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-zinc-400 text-sm">{subtitle}</p>
    </div>
  );
}

function Testimonial({ text, name }) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <p className="italic text-sm mb-3">“{text}”</p>
      <p className="font-semibold text-white text-sm">— {name}</p>
    </div>
  );
}
