import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.webp";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative isolate min-h-[85vh] flex items-end">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-background/70" />
      <div className="relative w-full mx-auto max-w-7xl px-4 py-32">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4 font-body">Terminel Law Consulting</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-foreground mb-6">
            Precisión<br />en la Práctica.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-body leading-relaxed mb-8">
            Asesoría legal estratégica en derecho corporativo, migratorio e internacional privado para individuos e inversores.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => { navigate("/contacto"); window.scrollTo({ top: 0 }); }}
              className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Agenda una consulta
            </button>
            <button
              onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-sm border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground hover:border-foreground/40 active:scale-[0.98] transition-all"
            >
              Nuestros servicios
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
