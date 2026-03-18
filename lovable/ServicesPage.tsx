import { useSearchParams, useNavigate } from "react-router-dom";
import { SERVICES } from "@/lib/data";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const requested = params.get("servicio");
  const selected = SERVICES.find((s) => s.id === requested) ?? SERVICES[0];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-body">Terminel Law Consulting</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">Nuestros Servicios</h1>
        <p className="text-muted-foreground max-w-2xl font-body mb-12">
          Selecciona un servicio para conocer su alcance legal y cómo puede ayudarte.
        </p>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
          <aside className="space-y-2">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(`/servicios?servicio=${s.id}`, { replace: true })}
                className={`w-full text-left rounded-sm px-4 py-3 text-sm font-medium transition-all font-body ${
                  selected.id === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {s.title}
              </button>
            ))}
          </aside>

          <motion.article
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-2xl border border-border bg-card p-8 md:p-10"
          >
            <div className="relative h-64 rounded-lg overflow-hidden mb-8">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-6">{selected.title}</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed font-body text-base md:text-lg">
              {selected.details.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10">
              <button
                onClick={() => { navigate("/contacto"); window.scrollTo({ top: 0 }); }}
                className="rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                Solicitar consulta sobre este servicio
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
