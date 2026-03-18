import { motion } from "framer-motion";
import { ESSENCE_PILLARS, ESSENCE_VALUES } from "@/lib/data";

export default function EssencePage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-body">Nuestra Firma</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">Misión, Visión y Valores</h1>
        <p className="text-muted-foreground max-w-2xl font-body mb-16">
          Estructuramos nuestro trabajo bajo principios legales sólidos para ofrecer un servicio transnacional confiable y orientado a resultados.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-20">
          {ESSENCE_PILLARS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="text-2xl font-bold tracking-tighter text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{p.text}</p>
            </motion.article>
          ))}
        </div>

        <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-foreground mb-3">Nuestros Valores</h3>
        <p className="text-muted-foreground font-body mb-8">Principios que guían cada decisión jurídica.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ESSENCE_VALUES.map((v, i) => (
            <motion.article
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-2xl border border-border bg-secondary p-6"
            >
              <h4 className="text-xl font-bold tracking-tighter text-foreground mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{v.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
