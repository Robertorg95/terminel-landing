import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Service } from "@/lib/data";

interface Props {
  service: Service;
  featured?: boolean;
}

export default function ServiceCard({ service, featured }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -5 }}
      onClick={() => {
        navigate(`/servicios?servicio=${service.id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`group relative overflow-hidden rounded-2xl border border-foreground/10 bg-muted cursor-pointer ${
        featured ? "h-[500px] md:col-span-2" : "h-[500px]"
      }`}
    >
      <img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
      <div className="absolute inset-0 border border-foreground/5 rounded-2xl transition-colors duration-300 group-hover:border-foreground/20" />
      <div className="absolute bottom-0 p-8">
        <span className="text-xs uppercase tracking-[0.2em] text-primary mb-2 block font-body">
          {service.index} // Área de Práctica
        </span>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-foreground mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md font-body">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
