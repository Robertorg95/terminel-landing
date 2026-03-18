import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-body">Nuestra Firma</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-8">
              Sobre Nosotros
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed font-body">
              <p>
                Terminel Law Consulting es una firma legal especializada en derecho corporativo, derecho migratorio y derecho internacional privado. Asesoramos a personas, inversionistas y empresas que desarrollan proyectos entre México y Estados Unidos.
              </p>
              <p>
                La firma fue fundada por el Mtro. Iván Terminel, abogado mexicano con experiencia en el ámbito legal transnacional y en la preparación de procesos migratorios y corporativos. Su práctica se caracteriza por un enfoque estratégico, comunicación clara y atención cercana al cliente.
              </p>
              <p>
                En colaboración con aliados profesionales en áreas legales, contables, financieras e inmobiliarias, ofrecemos un servicio integral diseñado para brindar seguridad jurídica y facilitar el cumplimiento de los objetivos de nuestros clientes.
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-2xl border border-border bg-card p-8"
          >
            <div className="space-y-6">
              {[
                { number: "6", label: "Áreas de práctica especializadas" },
                { number: "2", label: "Jurisdicciones: México y EE.UU." },
                { number: "100%", label: "Enfoque en cumplimiento normativo" },
              ].map((stat) => (
                <div key={stat.label} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <p className="text-4xl font-bold tracking-tighter text-foreground mb-1">{stat.number}</p>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
