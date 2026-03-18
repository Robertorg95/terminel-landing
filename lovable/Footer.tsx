import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-lg font-bold tracking-tighter text-foreground mb-2">Terminel Law Consulting</p>
            <p className="text-sm text-muted-foreground font-body max-w-xs">
              Asesoría legal estratégica en derecho corporativo, migratorio e internacional privado.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-body">Navegación</p>
            <ul className="space-y-2 text-sm font-body">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</Link></li>
              <li><Link to="/mision-vision-valores" className="text-muted-foreground hover:text-foreground transition-colors">Misión y Valores</Link></li>
              <li><Link to="/contacto" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-body">Redes</p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between text-xs text-muted-foreground font-body">
          <span>© {new Date().getFullYear()} Terminel Law Consulting. Todos los derechos reservados.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/contacto" className="hover:text-foreground transition-colors">Privacidad</Link>
            <Link to="/contacto" className="hover:text-foreground transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
