import { SERVICES } from "@/lib/data";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-body">Nuestras Especialidades</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-12">
          Áreas de Práctica
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
