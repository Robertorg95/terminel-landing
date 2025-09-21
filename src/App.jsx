import { useMemo, useRef, useState, useEffect } from "react";
import Modal from "./components/modal.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



/* ====== DATA (tus categorías) ====== */
const SERVICES = [
  { category: "Visa de Inversionista E-2", items: ["EB-1 Visa", "EB-2 (NIW)", "O-1", "P", "TN", "H-1B (según aplique)"] },
  { category: "Peticiones Familiar", items: ["Peticiones familiares y de cónyuges", "Naturalización / Ciudadanía", "Autorización de trabajo y viaje", "Renovación de Green Card"] },
  { category: "Formación de compañias", items: ["Evaluación inicial", "Preparación de expediente", "Acompañamiento en el proceso"] },
  { category: "Naturalización y Ciudadanía", items: ["LLC", "Corporation", "Estructura y documentos básicos"] },
  { category: "Visas de Trabajo", items: ["Casos especiales y consultas específicas"] },
  { category: "Consultoría Estratégica", items: ["Consultorías especializadas"] },
];

/* util: id amigable para anclas */
const slug = (s) =>
  s.toLowerCase()
    .replace(/[áàä]/g, "a").replace(/[éèë]/g, "e").replace(/[íìï]/g, "i")
    .replace(/[óòö]/g, "o").replace(/[úùü]/g, "u").replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const SERVICES_WITH_IDS = SERVICES.map((s) => ({ ...s, id: slug(s.category) }));

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const dropRef = useRef(null);

    // cerrar al hacer clic fuera o con ESC
    useEffect(() => {
    const onDown = (e) => {
        if (openDrop && dropRef.current && !dropRef.current.contains(e.target)) {
        setOpenDrop(false);
        }
    };
    const onKey = (e) => e.key === "Escape" && setOpenDrop(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
        document.removeEventListener("mousedown", onDown);
        document.removeEventListener("keydown", onKey);
    };
    }, [openDrop]);

  const waMsg = useMemo(
    () => encodeURIComponent("Hola, me interesa agendar una consulta con Terminel Law Consulting. Mi nombre es [Tu Nombre]."),
    []
  );

  return (
    <>
      {/* NAVBAR con dropdowns (usa tus categorías para navegar) */}
      <header className="sticky top-0 z-40 bg-[#2C344C] text-white">
        <nav className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-3">
              <img src="/logo-horizontal.png" alt="Terminel Law Consulting" className="h-9 w-auto md:h-10" />
            </a>

            {/* Desktop */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
                <li className="relative" ref={dropRef}>
                <button
                    className="hover:opacity-90 flex items-center gap-1"
                    onClick={() => setOpenDrop((v) => !v)}   // <-- abre/cierra por clic
                    aria-expanded={openDrop}
                    aria-haspopup="true"
                >
                    Servicios
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"/>
                    </svg>
                </button>

                <div
                    className={`absolute left-0 mt-2 w-72 rounded-xl bg-white text-slate-800 shadow transition
                    ${openDrop ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}`}
                    role="menu"
                >
                    <ul className="py-2">
                    {SERVICES_WITH_IDS.map((it) => (
                        <li key={it.id}>
                        <a
                            href={`#${it.id}`}
                            className="block px-4 py-2 hover:bg-slate-50"
                            onClick={() => setOpenDrop(false)}   // cierra al seleccionar
                            role="menuitem"
                        >
                            {it.category}
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>
                </li>

              <li><a href="#nosotros" className="hover:opacity-90">Nosotros</a></li>
              <li><a href="#testimonios" className="hover:opacity-90">Testimonios</a></li>
              <li><a href="#contacto" className="hover:opacity-90">Contacto</a></li>
            </ul>

            <div className="hidden md:flex items-center gap-4">
                {/* Redes sociales */}
                <div className="flex items-center gap-3 text-white">
                    <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="p-2 rounded-full hover:bg-white/10 transition">
                    <FaFacebookF className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                    className="p-2 rounded-full hover:bg-white/10 transition">
                    <FaXTwitter className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="p-2 rounded-full hover:bg-white/10 transition">
                    <FaInstagram className="w-4 h-4" />
                    </a>
                </div>

                {/* CTA */}
                <a href="#agenda" className="btn bg-white text-[#2C344C] hover:opacity-95">Agenda una consulta</a>
            </div>


            {/* Mobile */}
            <button className="md:hidden p-2" onClick={() => setOpenMenu((v) => !v)} aria-label="Abrir menú">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>

          {openMenu && (
            <div className="md:hidden mt-3 rounded-xl bg-white text-slate-800 shadow">
              <details open className="border-b">
                <summary className="px-4 py-2 cursor-pointer select-none">Servicios</summary>
                <div className="pl-2 pb-2">
                  {SERVICES_WITH_IDS.map((it) => (
                    <a key={it.id} href={`#${it.id}`} onClick={() => setOpenMenu(false)} className="block px-4 py-2 hover:bg-slate-50">
                      {it.category}
                    </a>
                  ))}
                </div>
              </details>
              <a href="#nosotros" onClick={() => setOpenMenu(false)} className="block px-4 py-2">Nosotros</a>
              <a href="#testimonios" onClick={() => setOpenMenu(false)} className="block px-4 py-2">Testimonios</a>
              <a href="#contacto" onClick={() => setOpenMenu(false)} className="block px-4 py-2">Contacto</a>
              <div className="p-3">
                <a href="#agenda" onClick={() => setOpenMenu(false)} className="btn w-full bg-[#2C344C] text-white">Agenda una consulta</a>
              </div>
              <div className="px-4 pb-4 flex items-center gap-3 text-[#2C344C]">
                <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                    className="p-2 rounded-full border border-[#2C344C]/30">
                    <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"
                    className="p-2 rounded-full border border-[#2C344C]/30">
                    <FaXTwitter className="w-4 h-4" />
                </a>
                <a href="https://instagram.com/tu-usuario" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="p-2 rounded-full border border-[#2C344C]/30">
                    <FaInstagram className="w-4 h-4" />
                </a>
               </div>

            </div>
          )}
        </nav>
      </header>

      {/* HERO con imagen de fondo + caja de texto */}
      <section
        className="relative isolate"
        style={{ background: `url('/trajepagina.webp') center/cover no-repeat` }}
      >
        <div className="absolute inset-0 bg-[#2C344C]/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="bg-white/95 text-slate-900 rounded-2xl shadow p-6 md:p-8 max-w-xl">
            <h1 className="font-[Bodoni Moda] text-2xl md:text-3xl leading-snug mb-2">
              Planeación Legal Estratégica
            </h1>
            <p className="text-sm md:text-base text-slate-700">
              Consultores expertos te ayudarán a lograr tus objetivos en Estados Unidos.
            </p>
            <div className="mt-4">
              <a href="#contacto" className="btn btn-primary">Contacto</a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS – botones al fondo y simetría */}
      <section id="servicios" className="bg-[#F7F9FC]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-[Bodoni Moda] text-3xl md:text-4xl text-slate-900 mb-8">Áreas de práctica</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_WITH_IDS.map((group) => (
              <div key={group.id} id={group.id} className="bg-white rounded-2xl shadow p-6 flex flex-col min-h-[300px]">
                <h3 className="font-[Bodoni Moda] text-xl text-slate-900 mb-3">{group.category}</h3>
                <ul className="space-y-2 text-slate-700">
                  {group.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#2C344C]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <a href="#agenda" className="btn btn-outline w-full">Solicitar más información</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISIÓN / VISIÓN / PROPÓSITO */}
      <section className="bg-[#121316] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-center font-[Bodoni Moda] text-2xl md:text-3xl mb-8">
            Our mission, vision and purpose
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Mission", text: "To deliver results-driven immigration solutions that empower businesses, professionals, and families while ensuring compliance and legal success." },
              { title: "Vision", text: "To be the gold standard in immigration law, providing customized, strategic pathways that open doors for global talent and multinational businesses." },
              { title: "Purpose", text: "To break down barriers and create seamless immigration pathways, enabling individuals and organizations to achieve their goals while strengthening international communities." },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <h3 className="font-[Bodoni Moda] text-xl mb-2">{card.title}</h3>
                <p className="text-white/85 text-sm leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS (con tu texto) envuelto en recuadro translúcido */}
      <section id="nosotros" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-[Bodoni Moda] text-3xl md:text-4xl text-slate-900 mb-6">Sobre Nosotros</h2>
        <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-md shadow">
          <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-10">
            <img src="/ivan.png" alt="Iván Terminel" className="rounded-2xl shadow max-h-[460px] object-cover justify-self-center" />
            <p className="text-slate-700 text-lg leading-relaxed">
              En Terminel Law Consulting somos una familia boutique especializada en derecho internacional privado. 
              Nuestro equipo domina múltiples jurisdicciones, idiomas y culturas, lo que nos permite ofrecer soluciones 
              a medida para clientes al rededor del mundo.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTO (placeholder) */}
      <section id="contacto" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="font-[Bodoni Moda] text-3xl md:text-4xl text-slate-900 mb-4">Contacto</h2>
        <ConsultationForm />
      </section>

      {/* FAB WhatsApp */}
      <a
        href={`https://wa.me/526441216231?text=${waMsg}`}
        target="_blank" rel="noopener noreferrer"
        className="fixed right-5 bottom-5 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M13.601 2.326A7.854 7.854 0 008.003.002C3.584.002.004 3.58.004 7.999c0 1.41.37 2.787 1.074 3.997L0 16l4.117-1.06a7.963 7.963 0 003.885 1c4.419 0 7.999-3.58 7.999-7.999a7.95 7.95 0 00-2.4-5.615z"/>
          <path d="M11.885 9.74c-.201-.101-1.187-.586-1.37-.653-.184-.067-.317-.101-.45.101-.134.202-.518.652-.635.786-.117.134-.234.151-.435.05-.201-.101-.85-.314-1.62-1-.6-.534-1.004-1.194-1.12-1.395-.117-.201-.013-.31.088-.41.09-.089.201-.234.302-.351.101-.117.134-.201.201-.335.067-.134.034-.252-.017-.353-.05-.101-.45-1.086-.616-1.489-.162-.39-.328-.337-.45-.343l-.384-.007c-.134 0-.353.05-.537.252-.184.201-.702.686-.702 1.673s.719 1.942.819 2.077c.101.134 1.414 2.159 3.423 3.027.479.207.852.331 1.143.424.48.153.916.132 1.26.08.384-.058 1.187-.484 1.355-.952.168-.468.168-.868.118-.952-.05-.084-.184-.134-.385-.235z"/>
        </svg>
      </a>

      {/* FOOTER con enlaces que abren modales */}
      <footer className="bg-[#2C344C] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Terminel Law Consulting</span>
          <div className="flex gap-4">
            <button onClick={() => setPolicyOpen(true)} className="hover:opacity-90 underline underline-offset-4">Privacidad</button>
            <button onClick={() => setTermsOpen(true)} className="hover:opacity-90 underline underline-offset-4">Términos</button>
          </div>
        </div>
      </footer>

      {/* MODALES (textos que me pediste) */}
      <Modal open={policyOpen} onClose={() => setPolicyOpen(false)} title="Política de Privacidad">
{`En Terminel Law Consulting valoramos y protegemos la privacidad de nuestros usuarios. Toda la información personal que se recopile a través de este sitio web será utilizada exclusivamente para fines de contacto, prestación de servicios legales y comunicación directa con el cliente. No compartiremos ni venderemos su información a terceros sin su consentimiento expreso, salvo cuando lo exija la ley.
Al utilizar este sitio, usted acepta nuestra política de privacidad y el tratamiento de datos de acuerdo con la legislación aplicable en materia de protección de datos.`}
      </Modal>

      <Modal open={termsOpen} onClose={() => setTermsOpen(false)} title="Términos y Condiciones de Uso">
{`El uso de este sitio web implica la aceptación plena y sin reservas de los presentes términos y condiciones. Toda la información contenida en este sitio es de carácter general y no constituye asesoría legal específica. Para recibir asesoría personalizada debe contactar directamente con Terminel Law Consulting.
Queda prohibida la reproducción, distribución o modificación de los contenidos del sitio sin la autorización expresa de Terminel Law Consulting. El usuario se compromete a utilizar el sitio conforme a la ley, la moral y el orden público.
Terminel Law Consulting no se hace responsable por el mal uso del sitio ni por decisiones tomadas con base en la información publicada. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.`}
      </Modal>
    </>
  );
}

