import { useMemo, useRef, useState, useEffect } from "react";
import Modal from "./components/modal.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import llcImage from "./assets/services/service-llc.jpg";
import investorImage from "./assets/services/service-investor.jpg";
import familyImage from "./assets/services/service-family.jpg";
import citizenshipImage from "./assets/services/service-citizenship.jpg";
import corporateImage from "./assets/services/service-corporate.jpg";
import employmentImage from "./assets/services/service-employment.jpg";

/* ====== DATA (categorías de servicios) ====== */
const SERVICES = [
  {
    title: "Formación de LLC & Corporations",
    description:
      "Constituimos estructuras societarias en EE.UU. con enfoque legal, fiscal y operativo para iniciar con bases sólidas.",
    image: llcImage,
    details: [
      "Asesoramos en la constitución de LLC y corporaciones en Estados Unidos, estructuras legales comúnmente utilizadas por inversionistas y empresarios extranjeros para operar negocios en el país. Estas entidades permiten establecer una empresa legalmente registrada que cumpla con los requisitos estatales y federales para realizar actividades comerciales, contratar empleados y desarrollar operaciones en Estados Unidos.",
    ],
  },
  {
    title: "Visas de inversionista",
    description:
      "Diseñamos estrategias migratorias para inversionistas que buscan establecer o expandir negocios de forma segura.",
    image: investorImage,
    details: [
      "Las visas de inversionista, como la visa E-2 Treaty Investor, permiten que ciudadanos de países con tratados comerciales con Estados Unidos ingresen al país para invertir una cantidad sustancial de capital en una empresa estadounidense y dirigir su operación. El inversionista debe demostrar que el negocio es una empresa real y activa, que la inversión está en riesgo con el objetivo de generar ganancias y que el solicitante tendrá control o al menos el 50 % de propiedad de la empresa.",
      "En algunos casos, programas como EB-5 permiten obtener residencia permanente mediante una inversión significativa que genere al menos 10 empleos de tiempo completo para trabajadores en Estados Unidos.",
    ],
  },
  {
    title: "Inmigración Basada en Familia",
    description:
      "Acompañamos procesos familiares con una ruta clara, documentación precisa y seguimiento legal integral.",
    image: familyImage,
    details: [
      "La inmigración basada en familia permite que ciudadanos estadounidenses y residentes permanentes legales soliciten la residencia permanente para ciertos familiares elegibles, incluyendo cónyuges, hijos, padres y hermanos. El proceso generalmente comienza con la presentación de una petición familiar ante USCIS para establecer la relación entre el patrocinador y el beneficiario.",
    ],
  },
  {
    title: "Ciudadanía y Naturalización",
    description:
      "Preparamos solicitudes de ciudadanía con revisión estratégica para reducir riesgos y fortalecer cada expediente.",
    image: citizenshipImage,
    details: [
      "La naturalización es el proceso mediante el cual un residente permanente legal puede convertirse en ciudadano de Estados Unidos. De acuerdo con USCIS, los solicitantes generalmente deben cumplir con requisitos como haber mantenido residencia permanente durante un periodo determinado, demostrar buen carácter moral, conocimiento básico del inglés y aprobar un examen sobre historia y gobierno de Estados Unidos.",
    ],
  },
  {
    title: "Consultoría Corporativa",
    description:
      "Asesoramos a empresas en cumplimiento y toma de decisiones jurídicas para operar con certeza en mercados binacionales.",
    image: corporateImage,
    details: [
      "Brindamos asesoría estratégica a empresas que operan o desean operar en Estados Unidos, incluyendo cumplimiento regulatorio, estructura corporativa, coordinación con asesores contables y financieros, y evaluación de requisitos legales para inversionistas extranjeros. Este servicio permite a los clientes desarrollar sus operaciones con mayor seguridad jurídica y cumplimiento normativo.",
    ],
  },
  {
    title: "Visas de Empleo",
    description:
      "Gestionamos visas laborales para talento y organizaciones con enfoque en continuidad, tiempos y cumplimiento normativo.",
    image: employmentImage,
    details: [
      "Las visas de empleo permiten que trabajadores extranjeros calificados ingresen a Estados Unidos para desempeñar funciones profesionales, técnicas, artísticas o especializadas. Dependiendo de la categoría, el proceso puede requerir que un empleador estadounidense presente una petición ante USCIS para demostrar la necesidad del trabajador extranjero y su elegibilidad para la posición ofrecida.",
    ],
  },
];

const INSTITUTIONAL_TEXT =
  "Terminel Law Consulting es una firma legal especializada en derecho corporativo, derecho migratorio y derecho internacional privado. Ofrecemos asesoría estratégica a individuos, inversionistas y empresas que buscan desarrollar proyectos en México y Estados Unidos. Nuestro enfoque combina experiencia legal, cumplimiento normativo y colaboración con profesionales de distintas áreas para brindar soluciones integrales adaptadas a las necesidades de cada cliente.";

const ESSENCE_PILLARS = [
  {
    title: "Misión",
    text: "Brindar asesoría legal especializada en derecho corporativo, derecho migratorio y derecho internacional privado, ofreciendo soluciones estratégicas, éticas y eficientes que permitan a nuestros clientes desarrollar sus proyectos personales y empresariales con seguridad jurídica en México y Estados Unidos. En Terminel Law Consulting trabajamos de manera cercana con cada cliente, combinando conocimiento legal, cumplimiento normativo y coordinación con aliados profesionales para facilitar el logro de sus objetivos.",
  },
  {
    title: "Visión",
    text: "Consolidarnos como una firma de referencia en servicios legales transnacionales entre México y Estados Unidos, reconocida por la excelencia de su trabajo, la confianza de sus clientes y la capacidad de integrar soluciones legales, empresariales y migratorias de forma estratégica, eficiente e innovadora.",
  },
  {
    title: "Propósito",
    text: "Acompañar a familias, emprendedores y empresas en la materialización de sus proyectos y aspiraciones internacionales, proporcionando orientación legal honesta, confiable y efectiva que les permita crecer, invertir, establecerse y operar con certeza jurídica en diferentes jurisdicciones.",
  },
];

const ESSENCE_VALUES = [
  {
    title: "Honestidad",
    text: "Actuamos con transparencia y responsabilidad en cada proceso legal, ofreciendo siempre información clara y realista a nuestros clientes.",
  },
  {
    title: "Excelencia",
    text: "Nos comprometemos a ofrecer servicios legales de alta calidad, basados en preparación constante, análisis estratégico y atención al detalle.",
  },
  {
    title: "Integridad",
    text: "Ejercemos la profesión jurídica con ética, respeto a la ley y responsabilidad profesional.",
  },
  {
    title: "Compromiso con el cliente",
    text: "Trabajamos de manera colaborativa con cada cliente, entendiendo sus objetivos y acompañándolo durante todo el proceso legal.",
  },
  {
    title: "Profesionalismo",
    text: "Nuestra firma mantiene altos estándares en la gestión de cada caso, priorizando la eficiencia, el cumplimiento normativo y la precisión jurídica.",
  },
  {
    title: "Colaboración estratégica",
    text: "A través de alianzas con profesionales en México y Estados Unidos —contadores, asesores financieros, agentes inmobiliarios y traductores— ofrecemos soluciones integrales adaptadas a las necesidades del cliente.",
  },
];

/* util: id amigable para anclas */
const slug = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SERVICES_WITH_IDS = SERVICES.map((s, i) => ({
  ...s,
  id: slug(s.title),
  index: String(i + 1).padStart(2, "0"),
}));

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [route, setRoute] = useState(() => ({
    path: window.location.pathname,
    search: window.location.search,
  }));

  const dropRef = useRef(null);
  const currentPath = route.path;
  const isEssencePage = currentPath === "/mision-vision-valores";
  const isServicesPage = currentPath === "/servicios";
  const isContactPage = currentPath === "/contacto";

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

  useEffect(() => {
    const onPopState = () => {
      setRoute({ path: window.location.pathname, search: window.location.search });
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (currentPath !== "/") return;

    const cards = document.querySelectorAll(".service-enter");
    if (!cards.length) return;

    cards.forEach((card) => card.classList.remove("service-enter-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("service-enter-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [currentPath]);

  const waMsg = useMemo(
    () =>
      encodeURIComponent(
        "Hola, me interesa agendar una consulta con Terminel Law Consulting. Mi nombre es [Tu Nombre]."
      ),
    []
  );

  const navigateTo = (path, search = "", options = { scrollTop: true }) => {
    const target = `${path}${search}`;
    if (`${window.location.pathname}${window.location.search}` !== target) {
      if (window.location.pathname === path) {
        window.history.replaceState({}, "", target);
      } else {
        window.history.pushState({}, "", target);
      }
      setRoute({ path, search });
    }
    setOpenMenu(false);
    setOpenDrop(false);
    if (options.scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToService = (serviceId) => {
    const keepPosition = currentPath === "/servicios";
    navigateTo("/servicios", `?servicio=${serviceId}`, { scrollTop: !keepPosition });
  };

  const sectionHref = (sectionId) => (currentPath === "/" ? `#${sectionId}` : `/#${sectionId}`);
  const requestedService = new URLSearchParams(route.search).get("servicio");
  const selectedService =
    SERVICES_WITH_IDS.find((service) => service.id === requestedService) ?? SERVICES_WITH_IDS[0];
  const selectedServiceImagePosition = selectedService.id === "visas-de-empleo" ? "center 29%" : "center center";

  return (
    <>
      {/* NAVBAR con dropdowns */}
      <header className="sticky top-0 z-40 bg-[#2C344C] text-white">
        <nav className="mx-auto max-w-7xl px-4 py-2 md:py-3">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigateTo("/")}
              className="flex items-center gap-3 pr-3 shrink-0"
              aria-label="Ir al inicio"
            >
              <img
                src="/logo-horizontal.png"
                alt="Terminel Law Consulting"
                className="h-14 w-auto md:h-12"
              />
            </button>

            {/* Desktop */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li className="relative" ref={dropRef}>
                <button
                  className="nav-link-hover flex items-center gap-1"
                  onClick={() => setOpenDrop((v) => !v)}
                  aria-expanded={openDrop}
                  aria-haspopup="true"
                >
                  Servicios
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" />
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
                        <button
                          className="block px-4 py-2 hover:bg-slate-50"
                          onClick={() => navigateToService(it.id)}
                          role="menuitem"
                        >
                          {it.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <a href={sectionHref("nosotros")} className="nav-link-hover">
                  Nosotros
                </a>
              </li>
              <li>
                <button onClick={() => navigateTo("/mision-vision-valores")} className="nav-link-hover">
                  Misión y Valores
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("/contacto")} className="nav-link-hover">
                  Contacto
                </button>
              </li>
              <li className="flex items-center gap-3 pl-1">
                <button
                  type="button"
                  className="lang-pill"
                  aria-label="Idioma Español (visual)"
                  title="Cambiar a Español (próximamente)"
                >
                  <span className="flag-dot flag-mx" aria-hidden="true" />
                  MX
                </button>
                <button
                  type="button"
                  className="lang-pill"
                  aria-label="Idioma Inglés (visual)"
                  title="Cambiar a Inglés (próximamente)"
                >
                  <span className="flag-dot flag-us" aria-hidden="true" />
                  US
                </button>
              </li>
            </ul>

            <div className="hidden md:flex items-center gap-4">
              {/* Redes sociales */}
              <div className="flex items-center gap-3 text-white">
                <a
                  href="https://facebook.com/tu-pagina"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
              </div>

              {/* CTA */}
              <button onClick={() => navigateTo("/contacto")} className="btn cta-hover bg-white text-[#2C344C]">
                Agenda una consulta
              </button>
            </div>

            {/* Mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setOpenMenu((v) => !v)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {openMenu && (
            <div className="md:hidden mt-3 rounded-xl bg-white text-slate-800 shadow">
              <details open className="border-b">
                <summary className="px-4 py-2 cursor-pointer select-none">Servicios</summary>
                <div className="pl-2 pb-2">
                  {SERVICES_WITH_IDS.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => navigateToService(it.id)}
                      className="block px-4 py-2 hover:bg-slate-50 w-full text-left"
                    >
                      {it.title}
                    </button>
                  ))}
                </div>
              </details>
              <a href={sectionHref("nosotros")} onClick={() => setOpenMenu(false)} className="block px-4 py-2">
                Nosotros
              </a>
              <button
                onClick={() => navigateTo("/mision-vision-valores")}
                className="block px-4 py-2 text-left w-full"
              >
                Misión y Valores
              </button>
              <button
                onClick={() => navigateTo("/contacto")}
                className="block px-4 py-2 w-full text-left"
              >
                Contacto
              </button>
              <div className="px-4 py-2 flex items-center gap-3">
                <button type="button" className="lang-pill text-xs" title="Cambiar a Español (próximamente)">
                  <span className="flag-dot flag-mx" aria-hidden="true" />
                  MX
                </button>
                <button type="button" className="lang-pill text-xs" title="Cambiar a Inglés (próximamente)">
                  <span className="flag-dot flag-us" aria-hidden="true" />
                  US
                </button>
              </div>
              <div className="p-3">
                <button
                  onClick={() => navigateTo("/contacto")}
                  className="btn cta-hover w-full bg-[#2C344C] text-white"
                >
                  Agenda una consulta
                </button>
              </div>
              <div className="px-4 pb-4 flex items-center gap-3 text-[#2C344C]">
                <a
                  href="https://facebook.com/tu-pagina"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full border border-[#2C344C]/30"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-2 rounded-full border border-[#2C344C]/30"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full border border-[#2C344C]/30"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com/@tu-usuario"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="p-2 rounded-full border border-[#2C344C]/30"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {isEssencePage ? (
        <section className="relative overflow-hidden bg-[#171D2F] text-white min-h-[calc(100vh-96px)]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at top right, rgba(143,170,224,0.45), transparent 55%), radial-gradient(circle at bottom left, rgba(87,102,135,0.35), transparent 50%)",
            }}
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="uppercase tracking-[0.18em] text-xs text-white/75 mb-3">Nuestra Firma</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-white mb-4">Misión, Visión y Valores</h1>
              <p className="text-white/80 leading-relaxed">
                Estructuramos nuestro trabajo bajo principios legales sólidos para ofrecer un servicio transnacional
                confiable, estratégico y orientado a resultados para cada cliente.
              </p>
              <button
                onClick={() => navigateTo("/")}
                className="mt-6 btn border border-white/40 text-white hover:bg-white/10"
              >
                Volver al inicio
              </button>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {ESSENCE_PILLARS.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.06]"
                >
                  <h3 className="font-[Bodoni Moda] text-2xl mb-3 text-white">{pillar.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{pillar.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-[Bodoni Moda] text-2xl md:text-3xl text-white mb-2">Nuestros Valores</h3>
              <p className="text-white/75 text-sm md:text-base mb-6">
                Principios que guían cada decisión jurídica y cada relación profesional en Terminel Law Consulting.
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ESSENCE_VALUES.map((value) => (
                  <article
                    key={value.title}
                    className="rounded-2xl border border-white/20 bg-[#1F2942]/80 p-5 shadow-md shadow-black/20 transition-transform duration-300 hover:scale-[1.06]"
                  >
                    <h4 className="font-[Bodoni Moda] text-xl text-white mb-2">{value.title}</h4>
                    <p className="text-white/85 text-sm leading-relaxed">{value.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : isServicesPage ? (
        <section className="bg-[#F4F7FC]">
          <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
            <div className="mb-8">
              <p className="uppercase tracking-[0.18em] text-xs text-[#2C344C]/70 mb-2">Terminel Law Consulting</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-[#2C344C] mb-3">Nuestros Servicios</h1>
              <p className="text-slate-700 max-w-3xl">
                Selecciona un servicio para conocer su alcance legal y cómo puede ayudarte en tus proyectos entre
                México y Estados Unidos.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">
              <aside className="bg-white border border-slate-200 rounded-2xl p-3 shadow-md shadow-slate-900/5">
                <div className="space-y-2">
                  {SERVICES_WITH_IDS.map((service) => {
                    const isActive = selectedService.id === service.id;
                    return (
                      <button
                        key={service.id}
                        onClick={() => navigateToService(service.id)}
                        className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                          isActive
                            ? "bg-[#2C344C] text-white shadow"
                            : "bg-[#EAF0FB] text-[#2C344C] hover:bg-[#dbe7fb]"
                        }`}
                      >
                        {service.title}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <article
                key={selectedService.id}
                className="service-panel-animate bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md shadow-slate-900/5"
              >
                <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selectedServiceImagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h2 className="font-[Bodoni Moda] text-2xl md:text-4xl text-[#2C344C] mb-5">{selectedService.title}</h2>
                <div className="space-y-5 text-slate-700 leading-relaxed text-base md:text-lg">
                  {selectedService.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8">
                  <button onClick={() => navigateTo("/contacto")} className="btn btn-primary">
                    Solicitar consulta sobre este servicio
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      ) : isContactPage ? (
        <section className="bg-[#F4F7FC]">
          <div className="mx-auto max-w-7xl px-4 py-14 md:py-16">
            <div className="mb-8">
              <p className="uppercase tracking-[0.18em] text-xs text-[#2C344C]/70 mb-2">Atención Legal</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-[#2C344C] mb-3">Solicitud y Contacto</h1>
              <p className="text-slate-700 max-w-3xl">
                Completa el formulario para iniciar tu consulta con nuestro equipo. Te responderemos con una ruta
                legal clara y estratégica según tu objetivo.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 p-6 md:p-10">
              <h2 className="font-[Bodoni Moda] text-2xl md:text-3xl text-slate-900 mb-5">Formulario de Contacto</h2>
              <ConsultationForm />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="font-[Bodoni Moda] text-2xl text-[#2C344C] mb-4">Política de Privacidad</h3>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    En Terminel Law Consulting valoramos y protegemos la privacidad de nuestros usuarios. Toda la
                    información personal que se recopile a través de este sitio web será utilizada exclusivamente para
                    fines de contacto, prestación de servicios legales y comunicación directa con el cliente. No
                    compartiremos ni venderemos su información a terceros sin su consentimiento expreso, salvo cuando
                    lo exija la ley.
                  </p>
                  <p>
                    Al utilizar este sitio, usted acepta nuestra política de privacidad y el tratamiento de datos de
                    acuerdo con la legislación aplicable en materia de protección de datos.
                  </p>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="font-[Bodoni Moda] text-2xl text-[#2C344C] mb-4">Términos y Condiciones de Uso</h3>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p>
                    El uso de este sitio web implica la aceptación plena y sin reservas de los presentes términos y
                    condiciones. Toda la información contenida en este sitio es de carácter general y no constituye
                    asesoría legal específica. Para recibir asesoría personalizada debe contactar directamente con
                    Terminel Law Consulting.
                  </p>
                  <p>
                    Queda prohibida la reproducción, distribución o modificación de los contenidos del sitio sin la
                    autorización expresa de Terminel Law Consulting. El usuario se compromete a utilizar el sitio
                    conforme a la ley, la moral y el orden público.
                  </p>
                  <p>
                    Terminel Law Consulting no se hace responsable por el mal uso del sitio ni por decisiones tomadas
                    con base en la información publicada. Nos reservamos el derecho de modificar estos términos en
                    cualquier momento sin previo aviso.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* HERO */}
          <section
            className="relative isolate min-h-[82vh] flex items-end"
            style={{ background: `url('/trajepagina.webp') center/cover no-repeat` }}
          >
            <div className="absolute inset-0 bg-[#0f1424]/70" aria-hidden="true" />
            <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
              <div className="max-w-4xl">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9fb8ff] mb-4">Terminel Law Consulting</p>
                <h1 className="font-[Bodoni Moda] text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-white mb-6">
                  Precisión
                  <br />
                  en la Práctica.
                </h1>
                <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed mb-8">{INSTITUTIONAL_TEXT}</p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => navigateTo("/contacto")} className="btn btn-primary">
                    Agenda una consulta
                  </button>
                  <button
                    onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn border border-white/40 text-white hover:bg-white/10"
                  >
                    Nuestros servicios
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICIOS */}
          <section id="servicios" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 py-16">
              <p className="uppercase tracking-[0.2em] text-base md:text-lg text-[#3b82f6] mb-3">Nuestras Especialidades</p>
              <h2 className="font-[Bodoni Moda] text-4xl md:text-6xl text-white mb-12">Áreas de práctica</h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES_WITH_IDS.map((service, i) => (
                  <article
                    key={service.id}
                    id={service.id}
                    className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-100 cursor-pointer min-h-[460px] md:min-h-[500px] service-enter ${
                      i === 0 ? "md:col-span-2" : ""
                    }`}
                    style={{ animationDelay: `${i * 140}ms` }}
                    onClick={() => navigateToService(service.id)}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03060c]/95 via-[#03060c]/35 to-transparent" />
                    <div className="absolute inset-0 border border-white/10 rounded-2xl" />
                    <div className="absolute bottom-0 p-7">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#9fb8ff] mb-2 block">
                        {service.index} // Área de práctica
                      </span>
                      <h3 className="font-[Bodoni Moda] text-2xl md:text-3xl text-white mb-2">{service.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed max-w-md">{service.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToService(service.id);
                        }}
                        className="mt-5 btn bg-[#2C344C] text-white border border-[#2C344C] hover:bg-[#1f2a44] shadow-md"
                      >
                        Solicitar más información
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SOBRE NOSOTROS */}
          <section id="nosotros" className="bg-[#F8FAFE] border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-16">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-4">
                    <p className="uppercase tracking-[0.2em] text-xs text-[#2C344C]/70">Nuestra Firma</p>
                    <h2 className="font-[Bodoni Moda] text-4xl md:text-5xl text-slate-900">Sobre Nosotros</h2>
                    <div className="space-y-5 text-slate-700 text-base md:text-lg leading-relaxed">
                      <p>
                        Terminel Law Consulting es una firma legal especializada en derecho corporativo, derecho
                        migratorio y derecho internacional privado. Asesoramos a personas, inversionistas y empresas
                        que desarrollan proyectos entre México y Estados Unidos, ofreciendo soluciones legales
                        estratégicas enfocadas en cumplimiento normativo, estructuración empresarial y movilidad
                        internacional.
                      </p>
                      <p>
                        La firma fue fundada por el Mtro. Iván Terminel, abogado mexicano con experiencia en el ámbito
                        legal transnacional y en la preparación de procesos migratorios y corporativos para clientes que
                        buscan establecerse, invertir o expandir sus actividades en ambos países. Su práctica se
                        caracteriza por un enfoque estratégico, comunicación clara y atención cercana al cliente.
                      </p>
                      <p>
                        En colaboración con aliados profesionales en áreas legales, contables, financieras e
                        inmobiliarias, Terminel Law Consulting ofrece un servicio integral diseñado para brindar
                        seguridad jurídica y facilitar el cumplimiento de los objetivos personales y empresariales de sus
                        clientes.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-md shadow-slate-900/5">
                      <img
                        src="/ivan.png"
                        alt="Mtro. Iván Terminel"
                        className="w-full h-[480px] object-cover object-[center_18%] rounded-xl"
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md shadow-slate-900/5">
                    <div className="space-y-6">
                      {[
                        { number: "6", label: "Áreas de práctica especializadas" },
                        { number: "2", label: "Jurisdicciones: México y EE.UU." },
                        { number: "100%", label: "Enfoque en cumplimiento normativo" },
                      ].map((stat) => (
                        <div key={stat.label} className="border-b border-slate-200 pb-6 last:border-0 last:pb-0">
                          <p className="font-[Bodoni Moda] text-4xl text-slate-900 mb-1">{stat.number}</p>
                          <p className="text-sm text-slate-600">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
            </div>
          </section>

        </>
      )}

      {/* FAB WhatsApp */}
      <a
        href={`https://wa.me/526441216231?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow"
        aria-label="WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M13.601 2.326A7.854 7.854 0 008.003.002C3.584.002.004 3.58.004 7.999c0 1.41.37 2.787 1.074 3.997L0 16l4.117-1.06a7.963 7.963 0 003.885 1c4.419 0 7.999-3.58 7.999-7.999a7.95 7.95 0 00-2.4-5.615z" />
          <path d="M11.885 9.74c-.201-.101-1.187-.586-1.37-.653-.184-.067-.317-.101-.45.101-.134.202-.518.652-.635.786-.117.134-.234.151-.435.05-.201-.101-.85-.314-1.62-1-.6-.534-1.004-1.194-1.12-1.395-.117-.201-.013-.31.088-.41.09-.089.201-.234.302-.351.101-.117.134-.201.201-.335.067-.134.034-.252-.017-.353-.05-.101-.45-1.086-.616-1.489-.162-.39-.328-.337-.45-.343l-.384-.007c-.134 0-.353.05-.537.252-.184.201-.702.686-.702 1.673s.719 1.942.819 2.077c.101.134 1.414 2.159 3.423 3.027.479.207.852.331 1.143.424.48.153.916.132 1.26.08.384-.058 1.187-.484 1.355-.952.168-.468.168-.868.118-.952-.05-.084-.184-.134-.385-.235z" />
        </svg>
      </a>

      {/* FOOTER con enlaces que abren modales */}
      <footer className="bg-[#2C344C] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Terminel Law Consulting</span>
          <div className="flex gap-4">
            <button onClick={() => setPolicyOpen(true)} className="hover:opacity-90 underline underline-offset-4">
              Privacidad
            </button>
            <button onClick={() => setTermsOpen(true)} className="hover:opacity-90 underline underline-offset-4">
              Términos
            </button>
          </div>
        </div>
      </footer>

      {/* MODALES */}
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
