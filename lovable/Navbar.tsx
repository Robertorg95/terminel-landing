import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVICES } from "@/lib/data";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    setDropOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-nav border-b border-border/50 backdrop-blur-sm">
      <nav className="mx-auto max-w-7xl px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="shrink-0" onClick={() => window.scrollTo({ top: 0 })}>
            <img src={logo} alt="Terminel Law Consulting" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium font-body text-nav-foreground">
            <li ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((v) => !v)}
                className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
              >
                Servicios <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div
                className={`absolute left-0 mt-3 w-72 rounded-sm bg-card border border-border shadow-2xl transition-all duration-200 ${
                  dropOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <ul className="py-1">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => go(`/servicios?servicio=${s.id}`)}
                        className="block w-full text-left px-4 py-2.5 text-sm text-card-foreground/80 hover:text-card-foreground hover:bg-secondary transition-colors"
                      >
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li><button onClick={() => go("/#nosotros")} className="opacity-80 hover:opacity-100 transition-opacity">Nosotros</button></li>
            <li><button onClick={() => go("/mision-vision-valores")} className="opacity-80 hover:opacity-100 transition-opacity">Misión y Valores</button></li>
            <li><button onClick={() => go("/contacto")} className="opacity-80 hover:opacity-100 transition-opacity">Contacto</button></li>
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => go("/contacto")}
              className="rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Agenda una consulta
            </button>
          </div>

          <button className="md:hidden p-2 text-nav-foreground" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 rounded-sm border border-border bg-card p-4 space-y-3">
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-card-foreground flex items-center gap-1">
                Servicios <ChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 ml-3 space-y-1">
                {SERVICES.map((s) => (
                  <button key={s.id} onClick={() => go(`/servicios?servicio=${s.id}`)} className="block text-sm text-muted-foreground hover:text-foreground py-1">{s.title}</button>
                ))}
              </div>
            </details>
            <button onClick={() => go("/#nosotros")} className="block text-sm text-card-foreground">Nosotros</button>
            <button onClick={() => go("/mision-vision-valores")} className="block text-sm text-card-foreground">Misión y Valores</button>
            <button onClick={() => go("/contacto")} className="block w-full rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Agenda una consulta</button>
          </div>
        )}
      </nav>
    </header>
  );
}
