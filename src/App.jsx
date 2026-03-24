import { useMemo, useRef, useState, useEffect } from "react";
import Modal from "./components/modal.jsx";
import ConsultationForm from "./components/ConsultationForm.jsx";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import llcImage from "./assets/services/service-llc.jpg";
import investorImage from "./assets/services/service-investor.jpg";
import familyImage from "./assets/services/service-family.jpg";
import citizenshipImage from "./assets/services/service-citizenship.jpg";
import corporateImage from "./assets/services/service-corporate.jpg";
import employmentImage from "./assets/services/service-employment.jpg";
import translationsImage from "./assets/services/service-translations.jpg";

/* ====== DATA (categorías de servicios) ====== */
const SERVICES = [
  {
    title: "Formación de LLC & Corporations",
    description:
      "Constituimos LLC y corporaciones en Estados Unidos con estructura legal y operativa completa para iniciar de forma segura.",
    image: llcImage,
    details: [
      "Asesoramos en la constitución de LLC y corporaciones en Estados Unidos, estructuras legales comúnmente utilizadas por inversionistas y empresarios extranjeros para operar negocios en el país. Estas entidades permiten establecer una empresa legalmente registrada que cumpla con los requisitos estatales y federales para realizar actividades comerciales, contratar empleados y desarrollar operaciones en Estados Unidos.",
      "Nos encargamos de todo el proceso para que tú te enfoques en hacer crecer tu negocio:",
      "1. **Compañía constituida en el estado de tu elección**. Realizamos todo el proceso de registro legal en el estado que mejor se adapte a tus necesidades comerciales, asegurando cumplimiento normativo desde el inicio.",
      "2. **Employer Identification Number (EIN)**. Gestionamos la obtención de este número fiscal ante el IRS, indispensable para efectos tributarios, contratación de empleados y apertura de cuentas bancarias.",
      "3. **Acuerdo Operacional (Operating Agreement)**. Elaboramos este documento clave que define la estructura interna de la empresa, derechos y obligaciones de los miembros, y reglas de operación.",
      "4. **Asistencia con el Statutory Agent (Registered Agent)**. Te apoyamos en la designación del agente registrado, quien será el responsable de recibir notificaciones legales y oficiales en nombre de la empresa.",
      "5. **Asistencia con la apertura de cuenta bancaria**. Te guiamos en el proceso para abrir una cuenta empresarial en Estados Unidos, facilitando la correcta gestión financiera de tu negocio.",
      "Con estos elementos esenciales, tu compañía contará con la estructura legal y operativa necesaria para comenzar actividades comerciales en Estados Unidos de manera segura, ordenada y conforme a la ley.",
    ],
  },
  {
    title: "Visas de inversionista",
    description:
      "Diseñamos y ejecutamos estrategias de visa E-2/EB-5 con enfoque legal, documental y de viabilidad empresarial.",
    image: investorImage,
    details: [
      "Las visas de inversionista, como la visa E-2 Treaty Investor, permiten que ciudadanos de países con tratados comerciales con Estados Unidos ingresen al país para invertir una cantidad sustancial de capital en una empresa estadounidense y dirigir su operación. El inversionista debe demostrar que el negocio es una empresa real y activa, que la inversión está en riesgo con el objetivo de generar ganancias y que el solicitante tendrá control o al menos el 50 % de propiedad de la empresa.",
      "En algunos casos, programas como EB-5 permiten obtener residencia permanente mediante una inversión significativa que genere al menos 10 empleos de tiempo completo para trabajadores en Estados Unidos.",
      "En la práctica, este tipo de inversiones suelen iniciar desde aproximadamente **$100,000 dólares**, dependiendo del tipo de negocio y la solidez del proyecto presentado. Más allá del monto, es fundamental que la inversión cumpla con los criterios legales de ser real, activa y con propósito de generar utilidades.",
      "Como parte de nuestro servicio, brindamos acompañamiento integral en el cumplimiento de todos los requisitos necesarios para la solicitud de la visa, incluyendo:",
      "1. **Asesoría en la estructuración de la inversión**. Apoyamos en la definición de un modelo de negocio que cumpla con los lineamientos migratorios y fortalezca la viabilidad del caso.",
      "2. **Preparación y revisión de documentación**. Asistimos en la integración de los documentos requeridos para sustentar la inversión y la operación del negocio.",
      "3. **Aplicación de visa**. Gestionamos el proceso completo de solicitud de la visa de inversionista, asegurando que el expediente cumpla con todos los requisitos legales y migratorios.",
      "4. **Representación por abogado en Estados Unidos**. El proceso se lleva a cabo con el acompañamiento de un abogado en Estados Unidos, y puede realizarse mediante cambio de estatus (para quienes ya se encuentran en el país) o a través de proceso consular (desde el país de origen), dependiendo de la situación del solicitante.",
      "Con estos elementos, el solicitante podrá presentar un caso sólido que le permita obtener un estatus migratorio basado en su inversión y operar su negocio en Estados Unidos de manera legal.",
    ],
  },
  {
    title: "Inmigración Basada en Familia",
    description:
      "Acompañamos peticiones familiares ante USCIS con estrategia, seguimiento continuo y preparación integral del caso.",
    image: familyImage,
    details: [
      "La inmigración basada en familia permite que ciudadanos estadounidenses y residentes permanentes legales soliciten la residencia permanente para ciertos familiares elegibles, incluyendo cónyuges, hijos, padres y hermanos. El proceso generalmente comienza con la presentación de una petición familiar ante USCIS para establecer la relación entre el patrocinador y el beneficiario.",
      "Como parte de nuestro servicio, brindamos acompañamiento integral durante todo el proceso migratorio, asegurando el correcto cumplimiento de los requisitos y una preparación adecuada del caso:",
      "1. **Evaluación del caso y elegibilidad**. Analizamos la situación del patrocinador y del beneficiario para determinar la viabilidad del proceso y la mejor estrategia a seguir.",
      "2. **Preparación y presentación de la petición familiar**. Asistimos en la correcta integración y envío de la solicitud ante USCIS, incluyendo la recopilación de evidencia que demuestre la relación familiar.",
      "3. **Seguimiento del proceso migratorio**. Damos acompañamiento continuo durante el trámite, atendiendo requerimientos adicionales y manteniendo informado al cliente en cada etapa.",
      "4. **Ajuste de estatus o proceso consular**. Orientamos según corresponda: ya sea que el familiar se encuentre en Estados Unidos y pueda realizar un ajuste de estatus, o que deba completar el proceso a través de un consulado en su país de origen.",
      "5. **Preparación para entrevista migratoria**. Brindamos asesoría previa a la entrevista para asegurar que el solicitante esté debidamente preparado y conozca el proceso.",
      "Con este acompañamiento, facilitamos un proceso más claro, ordenado y sólido, aumentando las probabilidades de éxito en la obtención de la residencia permanente para tus familiares.",
    ],
  },
  {
    title: "Ciudadanía y Naturalización",
    description:
      "Preparamos solicitudes de naturalización con estrategia documental y acompañamiento de principio a fin.",
    image: citizenshipImage,
    details: [
      "La naturalización es el proceso mediante el cual un residente permanente legal puede convertirse en ciudadano de Estados Unidos. De acuerdo con USCIS, los solicitantes generalmente deben cumplir con requisitos como haber mantenido residencia permanente durante un periodo determinado, demostrar buen carácter moral, conocimiento básico del inglés y aprobar un examen sobre historia y gobierno de Estados Unidos.",
      "Como parte de nuestro servicio, brindamos acompañamiento integral durante todo el proceso, facilitando el cumplimiento de los requisitos y una correcta preparación del caso:",
      "1. **Evaluación de elegibilidad**. Analizamos si el solicitante cumple con los requisitos necesarios para iniciar el proceso de naturalización, incluyendo tiempos de residencia y antecedentes.",
      "2. **Preparación y presentación de la solicitud**. Asistimos en el llenado y envío de la solicitud correspondiente ante USCIS, asegurando que la información sea correcta y completa.",
      "3. **Revisión de documentación**. Apoyamos en la recopilación y organización de los documentos necesarios para respaldar la solicitud.",
      "4. **Preparación para examen y entrevista**. Orientamos al solicitante sobre el examen de inglés y civismo, así como sobre el proceso de entrevista, brindando herramientas para una adecuada preparación.",
      "5. **Seguimiento del proceso**. Damos acompañamiento continuo, atendiendo cualquier requerimiento adicional y manteniendo informado al cliente en cada etapa.",
      "Con este apoyo, el solicitante podrá avanzar en su proceso de naturalización de manera más segura, organizada y con mayores probabilidades de éxito para obtener la ciudadanía estadounidense.",
    ],
  },
  {
    title: "Consultoría Corporativa",
    description:
      "Asesoría corporativa integral para operar con cumplimiento normativo, orden interno y decisiones legales estratégicas.",
    image: corporateImage,
    details: [
      "Brindamos asesoría estratégica a empresas que operan o desean operar en Estados Unidos, incluyendo cumplimiento regulatorio, estructura corporativa, coordinación con asesores contables y financieros, y evaluación de requisitos legales para inversionistas extranjeros. Este servicio permite a los clientes desarrollar sus operaciones con mayor seguridad jurídica y cumplimiento normativo.",
      "1. **Cumplimiento legal y regulatorio**. Supervisión y gestión integral del cumplimiento de leyes locales e internacionales aplicables, así como la implementación de programas internos de cumplimiento. Este enfoque integral permite no solo cumplir con la normativa externa, sino también fortalecer la cultura interna de cumplimiento, reduciendo riesgos de sanciones o contingencias legales. Como parte de nuestro servicio, apoyamos en la identificación de obligaciones aplicables, implementación de controles internos y seguimiento continuo para asegurar el cumplimiento normativo de la empresa:",
      "• Obligaciones corporativas",
      "• Licencias y permisos",
      "• Regulaciones sectoriales",
      "• Políticas internas y códigos de conducta",
      "• Controles y mecanismos de supervisión",
      "2. **Gobierno corporativo**. Diseño e implementación de políticas internas, manuales y mejores prácticas para la toma de decisiones, roles de socios, juntas directivas y control interno. Brindamos asesoría en la estructuración de reglas claras de operación, fortaleciendo la organización interna y la toma de decisiones estratégicas dentro de la empresa.",
      "3. **Contratos y relaciones comerciales**. Redacción, revisión y negociación de contratos clave. Asistimos en la elaboración y análisis de contratos para proteger los intereses del cliente, reducir riesgos legales y asegurar relaciones comerciales sólidas:",
      "• Contratos con proveedores",
      "• Acuerdos con clientes",
      "• Joint ventures",
      "• Acuerdos de confidencialidad (NDA)",
      "4. **Planeación estratégica legal**. Acompañamiento en la toma de decisiones empresariales considerando implicaciones legales, fiscales y operativas para asegurar crecimiento sostenible. Apoyamos en la evaluación de escenarios y riesgos, permitiendo tomar decisiones informadas alineadas con los objetivos del negocio.",
      "5. **Fusiones, adquisiciones y reestructuración**. Asistencia en procesos de compra/venta de empresas, reorganización corporativa, due diligence y negociación de términos. Brindamos soporte en cada etapa del proceso, desde el análisis inicial hasta la ejecución, asegurando una transición ordenada y conforme a la normativa aplicable.",
      "6. **Coordinación legal**. Actuamos como punto central de gestión legal para la empresa, coordinando distintos procesos, asesores y áreas involucradas. Este servicio permite al cliente contar con una supervisión integral de sus asuntos legales, asegurando consistencia, control y alineación con la estrategia del negocio.",
    ],
  },
  {
    title: "Visas de Empleo",
    description:
      "Gestionamos visas de empleo para perfiles calificados y empleadores patrocinadores con enfoque técnico y migratorio.",
    image: employmentImage,
    details: [
      "Las visas de empleo permiten que trabajadores extranjeros calificados ingresen a Estados Unidos para desempeñar funciones profesionales, técnicas, artísticas o especializadas. Dependiendo de la categoría, el proceso puede requerir que un empleador estadounidense presente una petición ante USCIS para demostrar la necesidad del trabajador extranjero y su elegibilidad para la posición ofrecida.",
      "**Principales categorías de visas de empleo**:",
      "• **Visa L-1 (Transferencia intraempresa)**. Para ejecutivos, gerentes o empleados con conocimiento especializado que son transferidos desde una empresa extranjera a una filial o subsidiaria en Estados Unidos.",
      "• **Visa O-1 (Habilidades extraordinarias)**. Para personas con habilidades sobresalientes en áreas como negocios, ciencias, artes, educación o deportes, que puedan demostrar reconocimiento a nivel nacional o internacional.",
      "• **Visa P (Atletas, artistas y entretenimiento)**. Dirigida a atletas, artistas o grupos de entretenimiento que participan en eventos, competencias o presentaciones específicas en Estados Unidos.",
      "• **Visa TN (Profesionales bajo tratado - México/Canadá)**. Disponible para ciudadanos de México y Canadá bajo el tratado comercial, para ciertas profesiones específicas con oferta laboral en Estados Unidos.",
      "Como parte de nuestro servicio, brindamos acompañamiento integral durante todo el proceso migratorio, asegurando el cumplimiento de los requisitos y una adecuada preparación del caso:",
      "1. **Evaluación del perfil y elegibilidad**. Analizamos la experiencia, formación y situación del solicitante, así como las necesidades del empleador, para determinar la categoría de visa más adecuada.",
      "2. **Asesoría al empleador patrocinador**. Orientamos al empleador en el cumplimiento de sus obligaciones legales, incluyendo la correcta estructuración de la oferta laboral y requisitos ante autoridades migratorias.",
      "3. **Preparación y presentación de la petición**. Asistimos en la integración y envío de la solicitud ante USCIS, incluyendo la recopilación de evidencia que respalde la elegibilidad del trabajador y la posición ofrecida.",
      "4. **Preparación de documentación del solicitante**. Apoyamos en la organización de documentos personales, académicos y profesionales necesarios para sustentar la solicitud.",
      "5. **Proceso de solicitud de visa**. Brindamos acompañamiento en la etapa final del trámite, ya sea mediante **proceso consular** desde el país de origen o conforme a los procedimientos aplicables según el caso.",
      "6. **Seguimiento del proceso**. Damos acompañamiento continuo, atendiendo requerimientos adicionales y manteniendo informado al cliente en cada etapa.",
      "Con este apoyo, tanto el empleador como el trabajador cuentan con una guía clara y estructurada que facilita la obtención de la visa de empleo y el inicio de actividades laborales en Estados Unidos de manera legal.",
    ],
  },
  {
    title: "Traducciones Español – Inglés",
    description:
      "Traducción especializada de documentos legales, corporativos y migratorios con precisión terminológica y validez formal.",
    image: translationsImage,
    details: [
      "Servicio de traducción de documentos legales, corporativos y migratorios del español al inglés y viceversa, asegurando precisión terminológica y cumplimiento con los estándares requeridos en trámites oficiales ante autoridades en Estados Unidos.",
      "Como parte de nuestro servicio, brindamos apoyo integral para garantizar que la documentación cumpla con los requisitos formales y legales necesarios:",
      "1. **Revisión y análisis del documento**. Evaluamos el tipo de documento y su propósito para asegurar que la traducción cumpla con los estándares requeridos según el trámite.",
      "2. **Traducción especializada**. Realizamos traducciones con enfoque legal y técnico, cuidando la terminología y el contexto para mantener la validez del contenido.",
      "3. **Formato y adaptación**. Ajustamos el documento traducido para que mantenga coherencia con el formato original y sea adecuado para su presentación oficial.",
      "4. **Certificación de traducción (cuando aplica)**. Proporcionamos traducciones certificadas conforme a los requisitos de autoridades migratorias o instituciones en Estados Unidos.",
      "5. **Control de calidad y revisión final**. Realizamos una revisión detallada para asegurar exactitud, consistencia y cumplimiento con estándares formales.",
      "6. **Acompañamiento en el uso del documento**. Orientamos sobre cómo presentar correctamente las traducciones dentro de procesos legales o migratorios.",
      "Con este servicio, el cliente cuenta con documentos traducidos de manera precisa y confiable, listos para ser utilizados en trámites oficiales en Estados Unidos.",
    ],
  },
];

const INSTITUTIONAL_TEXT =
  "Terminel Law Consulting impulsa a personas y empresas a expandirse entre México y Estados Unidos mediante soluciones legales en materia corporativa y migratoria, diseñadas para facilitar el crecimiento, reducir riesgos y garantizar un cumplimiento eficiente en cada etapa del proceso";

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

const ESSENCE_CONTENT = {
  es: {
    eyebrow: "Nuestra Firma",
    title: "Misión, Visión y Valores",
    subtitle:
      "Estructuramos nuestro trabajo bajo principios legales sólidos para ofrecer un servicio transnacional confiable, estratégico y orientado a resultados para cada cliente.",
    backHome: "Volver al inicio",
    valuesTitle: "Nuestros Valores",
    valuesSubtitle:
      "Principios que guían cada decisión jurídica y cada relación profesional en Terminel Law Consulting.",
    pillars: ESSENCE_PILLARS,
    values: ESSENCE_VALUES,
  },
  en: {
    eyebrow: "Our Firm",
    title: "Mission, Vision and Values",
    subtitle:
      "We structure our work under solid legal principles to deliver a reliable, strategic, and results-oriented transnational service for every client.",
    backHome: "Back to home",
    valuesTitle: "Our Values",
    valuesSubtitle:
      "Principles that guide every legal decision and every professional relationship at Terminel Law Consulting.",
    pillars: [
      {
        title: "Mission",
        text: "To provide specialized legal counsel in corporate law, immigration law, and private international law, offering strategic, ethical, and efficient solutions that allow our clients to develop their personal and business projects with legal certainty in Mexico and the United States. At Terminel Law Consulting, we work closely with each client, combining legal knowledge, regulatory compliance, and coordination with allied professionals to facilitate the achievement of their objectives.",
      },
      {
        title: "Vision",
        text: "To establish ourselves as a benchmark firm in transnational legal services between Mexico and the United States, recognized for excellence, client trust, and the ability to integrate legal, business, and immigration solutions in a strategic, efficient, and innovative way.",
      },
      {
        title: "Purpose",
        text: "To support families, entrepreneurs, and companies in materializing their international projects and aspirations, providing honest, reliable, and effective legal guidance that enables them to grow, invest, settle, and operate with legal certainty across jurisdictions.",
      },
    ],
    values: [
      {
        title: "Honesty",
        text: "We act with transparency and responsibility in every legal process, always providing clear and realistic information to our clients.",
      },
      {
        title: "Excellence",
        text: "We are committed to delivering high-quality legal services based on constant preparation, strategic analysis, and attention to detail.",
      },
      {
        title: "Integrity",
        text: "We practice law with ethics, respect for the law, and professional responsibility.",
      },
      {
        title: "Client Commitment",
        text: "We work collaboratively with each client, understanding their goals and supporting them throughout the legal process.",
      },
      {
        title: "Professionalism",
        text: "Our firm maintains high standards in the management of each case, prioritizing efficiency, compliance, and legal precision.",
      },
      {
        title: "Strategic Collaboration",
        text: "Through alliances with professionals in Mexico and the United States — accountants, financial advisors, real estate agents, and translators — we offer comprehensive solutions tailored to client needs.",
      },
    ],
  },
};

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

const UI_TEXT = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      essence: "Misión y Valores",
      contact: "Contacto",
      cta: "Agenda una consulta",
      openMenu: "Abrir menú",
      logoAria: "Ir al inicio",
      langEsAria: "Cambiar a Español",
      langEnAria: "Cambiar a Inglés",
    },
    home: {
      heroTitleLine1: "Tu aliado legal entre",
      heroTitleLine2: "México y Estados Unidos",
      institutionalText:
        "Terminel Law Consulting impulsa a personas y empresas a expandirse entre México y Estados Unidos mediante soluciones legales en materia corporativa y migratoria, diseñadas para facilitar el crecimiento, reducir riesgos y garantizar un cumplimiento eficiente en cada etapa del proceso.",
      heroSecondaryCta: "Nuestros servicios",
      specialtiesEyebrow: "Nuestras Especialidades",
      specialtiesTitle: "Áreas de práctica",
      areaLabel: "Área de práctica",
      cardCta: "Solicitar más información",
      aboutEyebrow: "Nuestra Firma",
      aboutTitle: "Sobre Nosotros",
      aboutParagraphs: [
        "Terminel Law Consulting es una firma legal especializada en derecho corporativo, derecho migratorio y derecho internacional privado. Asesoramos a personas, inversionistas y empresas que desarrollan proyectos entre México y Estados Unidos, ofreciendo soluciones legales estratégicas enfocadas en cumplimiento normativo, estructuración empresarial y movilidad internacional.",
        "La firma fue fundada por el Mtro. Iván Terminel, abogado mexicano con experiencia en el ámbito legal transnacional y en la preparación de procesos migratorios y corporativos para clientes que buscan establecerse, invertir o expandir sus actividades en ambos países. Su práctica se caracteriza por un enfoque estratégico, comunicación clara y atención cercana al cliente.",
        "En colaboración con aliados profesionales en áreas legales, contables, financieras e inmobiliarias, Terminel Law Consulting ofrece un servicio integral diseñado para brindar seguridad jurídica y facilitar el cumplimiento de los objetivos personales y empresariales de sus clientes.",
      ],
      stats: [
        { number: "+11", label: "Años de Experiencia" },
        { number: "+200", label: "visas aprobadas" },
      ],
    },
    servicesPage: {
      eyebrow: "Terminel Law Consulting",
      title: "Nuestros Servicios",
      subtitle:
        "Selecciona un servicio para conocer su alcance legal y cómo puede ayudarte en tus proyectos entre México y Estados Unidos.",
      cta: "Solicitar consulta sobre este servicio",
    },
    contactPage: {
      eyebrow: "Atención Legal",
      title: "Solicitud y Contacto",
      subtitle:
        "Completa el formulario para iniciar tu consulta con nuestro equipo. Te responderemos con una ruta legal clara y estratégica según tu objetivo.",
      formTitle: "Formulario de Contacto",
    },
    footer: {
      privacy: "Privacidad",
      terms: "Términos",
      privacyTitle: "Política de Privacidad",
      termsTitle: "Términos y Condiciones de Uso",
      privacyText: `En Terminel Law Consulting valoramos y protegemos la privacidad de nuestros usuarios. Toda la información personal que se recopile a través de este sitio web será utilizada exclusivamente para fines de contacto, prestación de servicios legales y comunicación directa con el cliente. No compartiremos ni venderemos su información a terceros sin su consentimiento expreso, salvo cuando lo exija la ley.
Al utilizar este sitio, usted acepta nuestra política de privacidad y el tratamiento de datos de acuerdo con la legislación aplicable en materia de protección de datos.`,
      termsText: `El uso de este sitio web implica la aceptación plena y sin reservas de los presentes términos y condiciones. Toda la información contenida en este sitio es de carácter general y no constituye asesoría legal específica. Para recibir asesoría personalizada debe contactar directamente con Terminel Law Consulting.
Queda prohibida la reproducción, distribución o modificación de los contenidos del sitio sin la autorización expresa de Terminel Law Consulting. El usuario se compromete a utilizar el sitio conforme a la ley, la moral y el orden público.
Terminel Law Consulting no se hace responsable por el mal uso del sitio ni por decisiones tomadas con base en la información publicada. Nos reservamos el derecho de modificar estos términos en cualquier momento sin previo aviso.`,
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      essence: "Mission & Values",
      contact: "Contact",
      cta: "Schedule a consultation",
      openMenu: "Open menu",
      logoAria: "Go to home",
      langEsAria: "Switch to Spanish",
      langEnAria: "Switch to English",
    },
    home: {
      heroTitleLine1: "Your legal ally between",
      heroTitleLine2: "Mexico and the United States",
      institutionalText:
        "Terminel Law Consulting helps individuals and companies expand between Mexico and the United States through corporate and immigration legal solutions designed to support growth, reduce risk, and ensure efficient compliance at every stage.",
      heroSecondaryCta: "Our services",
      specialtiesEyebrow: "Our Specialties",
      specialtiesTitle: "Practice Areas",
      areaLabel: "Practice area",
      cardCta: "Request more information",
      aboutEyebrow: "Our Firm",
      aboutTitle: "About Us",
      aboutParagraphs: [
        "Terminel Law Consulting is a law firm focused on corporate law, immigration law, and private international law. We advise individuals, investors, and businesses developing projects between Mexico and the United States, delivering strategic legal solutions focused on compliance, corporate structuring, and international mobility.",
        "The firm was founded by Mtro. Iván Terminel, a Mexican attorney with experience in transnational legal matters and in preparing immigration and corporate processes for clients seeking to establish, invest, or expand their activities in both countries. His practice is defined by strategic guidance, clear communication, and close client attention.",
        "In collaboration with allied professionals in legal, accounting, financial, and real estate areas, Terminel Law Consulting provides an integrated service designed to deliver legal certainty and facilitate the achievement of each client's personal and business goals.",
      ],
      stats: [
        { number: "+11", label: "Years of Experience" },
        { number: "+200", label: "approved visas" },
      ],
    },
    servicesPage: {
      eyebrow: "Terminel Law Consulting",
      title: "Our Services",
      subtitle:
        "Select a service to understand its legal scope and how it can support your projects between Mexico and the United States.",
      cta: "Request a consultation for this service",
    },
    contactPage: {
      eyebrow: "Legal Support",
      title: "Request and Contact",
      subtitle:
        "Complete the form to start your consultation with our team. We will respond with a clear and strategic legal path based on your goals.",
      formTitle: "Contact Form",
    },
    footer: {
      privacy: "Privacy",
      terms: "Terms",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms and Conditions of Use",
      privacyText: `At Terminel Law Consulting, we value and protect the privacy of our users. Any personal information collected through this website will be used exclusively for contact purposes, legal service delivery, and direct communication with the client. We do not share or sell your information to third parties without your express consent, except when required by law.
By using this website, you accept our privacy policy and the processing of data in accordance with applicable data protection laws.`,
      termsText: `Use of this website implies full and unreserved acceptance of these terms and conditions. All information contained on this site is general in nature and does not constitute specific legal advice. For personalized legal advice, you must contact Terminel Law Consulting directly.
Reproduction, distribution, or modification of the site's content is prohibited without the express authorization of Terminel Law Consulting. Users agree to use this website in accordance with the law, morality, and public order.
Terminel Law Consulting is not responsible for misuse of the site or decisions made based on published information. We reserve the right to modify these terms at any time without prior notice.`,
    },
  },
};

const SERVICE_LOCALIZED = {
  "formacion-de-llc-corporations": {
    en: {
      title: "LLC & Corporations Formation",
      description: "We set up LLCs and corporations in the U.S. with a complete legal and operational structure for a secure start.",
      details: [
        "We advise on the incorporation of LLCs and corporations in the United States, legal structures commonly used by foreign investors and business owners to operate in the U.S. These entities allow you to establish a legally registered company that meets state and federal requirements for commercial operations, hiring, and growth.",
        "We handle the full process so you can focus on growing your business:",
        "1. **Company incorporated in the state of your choice**. We complete the legal registration process in the state that best fits your business goals, ensuring compliance from day one.",
        "2. **Employer Identification Number (EIN)**. We obtain your federal tax ID with the IRS, essential for tax reporting, hiring employees, and opening business bank accounts.",
        "3. **Operating Agreement**. We draft this key document defining internal structure, member rights and obligations, and operational rules.",
        "4. **Statutory Agent (Registered Agent) assistance**. We support the designation of a registered agent to receive legal and official notices on behalf of your company.",
        "5. **Business bank account opening support**. We guide you through opening a U.S. business bank account to enable proper financial operations.",
        "With these core elements, your company will have the legal and operational foundation needed to begin commercial activities in the United States safely, in an organized way, and in full compliance.",
      ],
    },
  },
  "visas-de-inversionista": {
    en: {
      title: "Investor Visas",
      description: "We design and execute E-2/EB-5 visa strategies with legal, documentary, and business-viability focus.",
      details: [
        "Investor visas, such as the E-2 Treaty Investor visa, allow citizens of treaty countries to enter the United States to invest a substantial amount of capital in a U.S. business and direct its operations. The applicant must show that the business is real and active, that the investment is at risk for profit generation, and that the applicant has control or at least 50% ownership.",
        "In some cases, programs such as EB-5 allow permanent residence through a qualifying investment that creates at least 10 full-time jobs in the United States.",
        "In practice, these investments often begin at approximately **$100,000 USD**, depending on the type of business and the strength of the proposed project. Beyond the amount, the investment must meet legal standards by being real, active, and profit-oriented.",
        "As part of our service, we provide full support for all visa requirements, including:",
        "1. **Investment structuring advisory**. We help define a business model aligned with immigration rules and case viability.",
        "2. **Document preparation and review**. We assist in assembling all required evidence to support the investment and business operations.",
        "3. **Visa application**. We manage the complete investor visa filing process, ensuring legal and immigration compliance.",
        "4. **U.S. attorney representation**. The process is carried out with U.S.-based legal representation and may proceed through change of status (if already in the U.S.) or consular processing (from abroad), depending on the applicant's situation.",
        "With this framework, applicants can present a strong case to obtain investment-based immigration status and operate their business in the United States legally.",
      ],
    },
  },
  "inmigracion-basada-en-familia": {
    en: {
      title: "Family-Based Immigration",
      description: "We guide family petitions before USCIS with strategy, continuous follow-up, and full case preparation.",
      details: [
        "Family-based immigration allows U.S. citizens and lawful permanent residents to petition for permanent residence for eligible family members, including spouses, children, parents, and siblings. The process generally begins by filing a family petition with USCIS to establish the qualifying relationship.",
        "As part of our service, we provide full support throughout the immigration process, ensuring proper compliance and thorough case preparation:",
        "1. **Case and eligibility assessment**. We analyze both petitioner and beneficiary circumstances to determine viability and the best strategy.",
        "2. **Family petition preparation and filing**. We assist with proper package assembly and filing before USCIS, including supporting relationship evidence.",
        "3. **Process follow-up**. We provide continuous guidance, respond to additional requests, and keep clients informed at every stage.",
        "4. **Adjustment of status or consular process**. We advise based on the case: adjustment of status in the U.S. or consular processing abroad.",
        "5. **Interview preparation**. We prepare applicants for the immigration interview so they are ready and understand the process.",
        "With this support, we make the process clearer, more organized, and stronger, increasing the chances of success in obtaining permanent residence for your relatives.",
      ],
    },
  },
  "ciudadania-y-naturalizacion": {
    en: {
      title: "Citizenship and Naturalization",
      description: "We prepare naturalization applications with documentary strategy and end-to-end support.",
      details: [
        "Naturalization is the process by which a lawful permanent resident can become a U.S. citizen. According to USCIS, applicants generally must meet requirements such as maintaining permanent residence for a specified period, demonstrating good moral character, basic English knowledge, and passing a U.S. history and government exam.",
        "As part of our service, we provide comprehensive support throughout the process, helping applicants meet requirements and prepare properly:",
        "1. **Eligibility review**. We assess whether the applicant meets the requirements to begin naturalization, including residence timelines and background factors.",
        "2. **Application preparation and filing**. We assist with completion and submission of the USCIS application, ensuring complete and accurate information.",
        "3. **Document review**. We support collection and organization of required supporting documents.",
        "4. **Exam and interview preparation**. We guide applicants on the English and civics test as well as interview expectations.",
        "5. **Case follow-up**. We provide ongoing support, handle additional requests, and keep clients informed at each stage.",
        "With this support, applicants can move through naturalization in a safer, more organized way and with stronger chances of obtaining U.S. citizenship.",
      ],
    },
  },
  "consultoria-corporativa": {
    en: {
      title: "Corporate Consulting",
      description: "Comprehensive corporate legal advisory to operate with compliance, internal order, and strategic decision-making.",
      details: [
        "We provide strategic advisory to companies that operate or plan to operate in the United States, including regulatory compliance, corporate structuring, coordination with accounting and financial advisors, and legal requirement assessment for foreign investors. This service helps clients operate with stronger legal certainty and compliance.",
        "1. **Legal and regulatory compliance**. Comprehensive oversight and management of local and international legal obligations, including internal compliance program implementation. This approach strengthens both external compliance and internal compliance culture. We also support identification of applicable obligations, internal control implementation, and ongoing monitoring:",
        "• Corporate obligations",
        "• Licenses and permits",
        "• Industry regulations",
        "• Internal policies and codes of conduct",
        "• Controls and oversight mechanisms",
        "2. **Corporate governance**. Design and implementation of internal policies, manuals, and best practices for decision-making, partner roles, board governance, and internal controls. We support clear operating rules that strengthen organization and strategic decisions.",
        "3. **Contracts and business relationships**. Drafting, review, and negotiation of key agreements. We protect client interests, reduce legal risk, and strengthen commercial relationships:",
        "• Supplier agreements",
        "• Client agreements",
        "• Joint ventures",
        "• Non-disclosure agreements (NDA)",
        "4. **Strategic legal planning**. Support for business decisions considering legal, tax, and operational implications to drive sustainable growth. We help evaluate scenarios and risks for informed decisions aligned with business goals.",
        "5. **Mergers, acquisitions, and restructuring**. Assistance in M&A transactions, corporate reorganization, due diligence, and term negotiation, from initial analysis through execution, ensuring an orderly and compliant process.",
        "6. **Legal coordination**. We act as a central legal management point, coordinating processes, advisors, and involved teams. This provides integrated supervision with consistency, control, and alignment to business strategy.",
      ],
    },
  },
  "visas-de-empleo": {
    en: {
      title: "Employment Visas",
      description: "We handle employment visas for qualified profiles and sponsoring employers with technical immigration focus.",
      details: [
        "Employment visas allow qualified foreign workers to enter the United States to perform professional, technical, artistic, or specialized roles. Depending on category, a U.S. employer may need to file a USCIS petition showing need and eligibility for the offered position.",
        "**Main employment visa categories**:",
        "• **L-1 Visa (Intra-company transfer)**. For executives, managers, or specialized-knowledge employees transferred from a foreign company to a U.S. affiliate or subsidiary.",
        "• **O-1 Visa (Extraordinary ability)**. For individuals with outstanding abilities in business, science, arts, education, or sports with national or international recognition.",
        "• **P Visa (Athletes, artists, and entertainment)**. For athletes, artists, or entertainment groups participating in specific events or performances in the U.S.",
        "• **TN Visa (Treaty professionals - Mexico/Canada)**. Available to Mexican and Canadian citizens under treaty provisions for specific professions with a U.S. job offer.",
        "As part of our service, we provide end-to-end support throughout the immigration process:",
        "1. **Profile and eligibility assessment**. We evaluate applicant experience, qualifications, and employer needs to determine the most suitable visa category.",
        "2. **Sponsoring employer advisory**. We guide employers on legal obligations, offer structuring, and immigration authority requirements.",
        "3. **Petition preparation and filing**. We assist in preparing and submitting the USCIS package with evidence supporting worker and position eligibility.",
        "4. **Applicant documentation preparation**. We support organization of personal, academic, and professional documents.",
        "5. **Visa processing stage**. We guide the final phase, including **consular processing** from abroad or other applicable procedures depending on the case.",
        "6. **Case follow-up**. We provide ongoing support, address additional requests, and keep clients informed at every stage.",
        "With this support, both employer and worker have a clear, structured roadmap that facilitates lawful employment visa approval and start of operations in the U.S.",
      ],
    },
  },
  "traducciones-espanol-ingles": {
    en: {
      title: "Spanish - English Translations",
      description: "Specialized translation of legal, corporate, and immigration documents with precise terminology and formal validity.",
      details: [
        "Translation service for legal, corporate, and immigration documents from Spanish to English and vice versa, ensuring terminology accuracy and compliance with standards required for official filings before U.S. authorities.",
        "As part of our service, we provide comprehensive support to ensure documents meet formal and legal requirements:",
        "1. **Document review and analysis**. We evaluate document type and intended use to ensure translation meets required standards.",
        "2. **Specialized translation**. We deliver legal/technical translations preserving terminology and context for content validity.",
        "3. **Formatting and adaptation**. We align translated documents with the original format for official submission readiness.",
        "4. **Certified translation (when applicable)**. We provide certified translations according to immigration or institutional requirements in the U.S.",
        "5. **Quality control and final review**. We conduct detailed checks for accuracy, consistency, and formal compliance.",
        "6. **Guidance on document use**. We advise on proper presentation of translations within legal or immigration processes.",
        "With this service, clients receive precise and reliable translated documents ready for official procedures in the United States.",
      ],
    },
  },
};

const numberPrefixPattern = /^(\d+)\.\s+(.+)$/;
const bulletPrefixPattern = /^[•-]\s+(.+)$/;
const boldLeadPattern = /^\*\*(.+?)\*\*(?:\.?\s*(.*))?$/;

const groupServiceDetails = (details = []) => {
  const blocks = [];
  let currentList = null;

  details.forEach((line, idx) => {
    const trimmed = line.trim();
    const numberedMatch = trimmed.match(numberPrefixPattern);
    const bulletMatch = trimmed.match(bulletPrefixPattern);

    if (numberedMatch) {
      const content = numberedMatch[2].trim();
      const boldLeadMatch = content.match(boldLeadPattern);
      const item = {
        order: Number(numberedMatch[1]),
        title: boldLeadMatch ? boldLeadMatch[1] : null,
        description: boldLeadMatch ? (boldLeadMatch[2] ?? "") : content,
      };

      if (!currentList || currentList.listType !== "ordered") {
        currentList = {
          type: "list",
          listType: "ordered",
          key: `list-${idx}`,
          items: [item],
        };
        blocks.push(currentList);
      } else {
        currentList.items.push(item);
      }
      return;
    }

    if (bulletMatch) {
      const content = bulletMatch[1].trim();
      const boldLeadMatch = content.match(boldLeadPattern);
      const item = {
        title: boldLeadMatch ? boldLeadMatch[1] : null,
        description: boldLeadMatch ? (boldLeadMatch[2] ?? "") : content,
      };

      const lastBlock = blocks[blocks.length - 1];
      if (lastBlock?.type === "list" && lastBlock.listType === "ordered" && lastBlock.items.length > 0) {
        const lastOrderedItem = lastBlock.items[lastBlock.items.length - 1];
        if (!lastOrderedItem.bullets) {
          lastOrderedItem.bullets = [];
        }
        lastOrderedItem.bullets.push(item);
        return;
      }

      if (!currentList || currentList.listType !== "unordered") {
        currentList = {
          type: "list",
          listType: "unordered",
          key: `list-${idx}`,
          items: [item],
        };
        blocks.push(currentList);
      } else {
        currentList.items.push(item);
      }
      return;
    }

    currentList = null;
    blocks.push({
      type: trimmed.endsWith(":") ? "heading" : "paragraph",
      key: `text-${idx}`,
      text: trimmed,
    });
  });

  return blocks;
};

const renderInlineFormatting = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`b-${idx}`}>{part.slice(2, -2)}</strong>;
    }
    return <span key={`t-${idx}`}>{part}</span>;
  });
};

export default function App() {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem("terminel_lang");
    return saved === "en" ? "en" : "es";
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrop, setOpenDrop] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [route, setRoute] = useState(() => ({
    path: window.location.pathname,
    search: window.location.search,
  }));

  const dropRef = useRef(null);
  const t = UI_TEXT[language];
  const essence = ESSENCE_CONTENT[language];
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
    window.localStorage.setItem("terminel_lang", language);
    document.documentElement.lang = language === "en" ? "en" : "es";
  }, [language]);

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
  const getServiceDisplay = (service) => {
    const localized = SERVICE_LOCALIZED[service.id]?.[language];
    return {
      title: localized?.title ?? service.title,
      description: localized?.description ?? service.description,
      details: localized?.details ?? service.details,
    };
  };
  const selectedServiceDisplay = useMemo(() => getServiceDisplay(selectedService), [selectedService, language]);
  const selectedServiceBlocks = useMemo(
    () => groupServiceDetails(selectedServiceDisplay.details ?? selectedService.details),
    [selectedServiceDisplay.details, selectedService.details]
  );
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
              aria-label={t.nav.logoAria}
            >
              <img
                src="/logo-horizontal.png"
                alt="Terminel Law Consulting"
                className="h-14 w-auto md:h-12"
              />
            </button>

            {/* Desktop */}
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li>
                <button onClick={() => navigateTo("/")} className="nav-link-hover">
                  {t.nav.home}
                </button>
              </li>
              <li className="relative" ref={dropRef}>
                <button
                  className="nav-link-hover flex items-center gap-1"
                  onClick={() => setOpenDrop((v) => !v)}
                  aria-expanded={openDrop}
                  aria-haspopup="true"
                >
                  {t.nav.services}
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
                          {getServiceDisplay(it).title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <a href={sectionHref("nosotros")} className="nav-link-hover">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <button onClick={() => navigateTo("/mision-vision-valores")} className="nav-link-hover">
                  {t.nav.essence}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("/contacto")} className="nav-link-hover">
                  {t.nav.contact}
                </button>
              </li>
              <li className="flex items-center gap-3 pl-1">
                <button
                  type="button"
                  className={`lang-pill ${language === "es" ? "bg-white/15 border-white/60" : ""}`}
                  onClick={() => setLanguage("es")}
                  aria-label={t.nav.langEsAria}
                  title={t.nav.langEsAria}
                >
                  <span className="flag-dot flag-mx" aria-hidden="true" />
                  MX
                </button>
                <button
                  type="button"
                  className={`lang-pill ${language === "en" ? "bg-white/15 border-white/60" : ""}`}
                  onClick={() => setLanguage("en")}
                  aria-label={t.nav.langEnAria}
                  title={t.nav.langEnAria}
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
                  href="https://www.facebook.com/TerminelLawConsulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/terminellaw/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2 rounded-full hover:bg-white/10 transition"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@terminellaw"
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
                {t.nav.cta}
              </button>
            </div>

            {/* Mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setOpenMenu((v) => !v)}
              aria-label={t.nav.openMenu}
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
                <summary className="px-4 py-2 cursor-pointer select-none">{t.nav.services}</summary>
                <div className="pl-2 pb-2">
                  {SERVICES_WITH_IDS.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => navigateToService(it.id)}
                      className="block px-4 py-2 hover:bg-slate-50 w-full text-left"
                    >
                      {getServiceDisplay(it).title}
                    </button>
                  ))}
                </div>
              </details>
              <a href={sectionHref("nosotros")} onClick={() => setOpenMenu(false)} className="block px-4 py-2">
                {t.nav.about}
              </a>
              <button
                onClick={() => navigateTo("/")}
                className="block px-4 py-2 text-left w-full"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => navigateTo("/mision-vision-valores")}
                className="block px-4 py-2 text-left w-full"
              >
                {t.nav.essence}
              </button>
              <button
                onClick={() => navigateTo("/contacto")}
                className="block px-4 py-2 w-full text-left"
              >
                {t.nav.contact}
              </button>
              <div className="px-4 py-2 flex items-center gap-3">
                <button
                  type="button"
                  className={`lang-pill text-xs ${language === "es" ? "bg-white/15 border-[#2C344C]/60" : ""}`}
                  onClick={() => setLanguage("es")}
                  title={t.nav.langEsAria}
                >
                  <span className="flag-dot flag-mx" aria-hidden="true" />
                  MX
                </button>
                <button
                  type="button"
                  className={`lang-pill text-xs ${language === "en" ? "bg-white/15 border-[#2C344C]/60" : ""}`}
                  onClick={() => setLanguage("en")}
                  title={t.nav.langEnAria}
                >
                  <span className="flag-dot flag-us" aria-hidden="true" />
                  US
                </button>
              </div>
              <div className="p-3">
                <button
                  onClick={() => navigateTo("/contacto")}
                  className="btn cta-hover w-full bg-[#2C344C] text-white"
                >
                  {t.nav.cta}
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
              <p className="uppercase tracking-[0.18em] text-xs text-white/75 mb-3">{essence.eyebrow}</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-white mb-4">{essence.title}</h1>
              <p className="text-white/80 leading-relaxed">
                {essence.subtitle}
              </p>
              <button
                onClick={() => navigateTo("/")}
                className="mt-6 btn border border-white/40 text-white hover:bg-white/10"
              >
                {essence.backHome}
              </button>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {essence.pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.06]"
                >
                  <h3 className="font-[Bodoni Moda] text-2xl mb-3 text-white">{pillar.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed text-justify">{pillar.text}</p>
                </article>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="font-[Bodoni Moda] text-2xl md:text-3xl text-white mb-2">{essence.valuesTitle}</h3>
              <p className="text-white/75 text-sm md:text-base mb-6">
                {essence.valuesSubtitle}
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {essence.values.map((value) => (
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
              <p className="uppercase tracking-[0.18em] text-xs text-[#2C344C]/70 mb-2">{t.servicesPage.eyebrow}</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-[#2C344C] mb-3">{t.servicesPage.title}</h1>
              <p className="text-slate-700 max-w-3xl">
                {t.servicesPage.subtitle}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[320px_1fr] items-start">
              <aside className="bg-white border border-slate-200 rounded-2xl p-3 shadow-md shadow-slate-900/5">
                <div className="space-y-2">
                  {SERVICES_WITH_IDS.map((service) => {
                    const isActive = selectedService.id === service.id;
                    const serviceDisplay = getServiceDisplay(service);
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
                        {serviceDisplay.title}
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
                    alt={selectedServiceDisplay.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selectedServiceImagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h2 className="font-[Bodoni Moda] text-2xl md:text-4xl text-[#2C344C] mb-5">{selectedServiceDisplay.title}</h2>
                <div className="space-y-5 text-slate-700 leading-relaxed text-base md:text-lg">
                  {selectedServiceBlocks.map((block) => {
                    if (block.type === "list") {
                      if (block.listType === "unordered") {
                        return (
                          <ul key={block.key} className="space-y-2 list-disc pl-6 marker:text-[#2C344C] marker:font-semibold">
                            {block.items.map((item, itemIdx) => (
                              <li key={`${block.key}-u-${itemIdx}`} className="text-justify">
                                {item.title ? (
                                  <>
                                    <span className="font-semibold text-[#1f2a44]">{renderInlineFormatting(item.title)}</span>
                                    {item.description ? <span>{` ${item.description}`}</span> : null}
                                  </>
                                ) : (
                                  renderInlineFormatting(item.description)
                                )}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <ol
                          key={block.key}
                          start={block.items[0]?.order ?? 1}
                          className="space-y-5 list-decimal pl-8 marker:text-[#2C344C] marker:font-semibold"
                        >
                          {block.items.map((item, itemIdx) => (
                            <li key={`${block.key}-${item.order}-${itemIdx}`} className="text-justify">
                              {item.title ? (
                                <div className="space-y-1">
                                  <div className="font-semibold text-[#1f2a44]">{renderInlineFormatting(item.title)}</div>
                                  {item.description ? (
                                    <p className="text-justify">{renderInlineFormatting(item.description)}</p>
                                  ) : null}
                                  {item.bullets?.length ? (
                                    <ul className="mt-2 space-y-1.5 list-disc pl-6 marker:text-[#2C344C] marker:font-semibold">
                                      {item.bullets.map((bullet, bulletIdx) => (
                                        <li key={`${block.key}-b-${itemIdx}-${bulletIdx}`} className="text-justify">
                                          {bullet.title ? (
                                            <>
                                              <span className="font-semibold text-[#1f2a44]">
                                                {renderInlineFormatting(bullet.title)}
                                              </span>
                                              {bullet.description ? <span>{` ${bullet.description}`}</span> : null}
                                            </>
                                          ) : (
                                            renderInlineFormatting(bullet.description)
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              ) : (
                                <p className="text-justify">{renderInlineFormatting(item.description)}</p>
                              )}
                            </li>
                          ))}
                        </ol>
                      );
                    }

                    if (block.type === "heading") {
                      return (
                        <h3 key={block.key} className="font-semibold text-[#2C344C] text-base md:text-lg">
                          {renderInlineFormatting(block.text)}
                        </h3>
                      );
                    }

                    return (
                      <p key={block.key} className="text-justify">
                        {renderInlineFormatting(block.text)}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-8">
                  <button onClick={() => navigateTo("/contacto")} className="btn btn-primary">
                    {t.servicesPage.cta}
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
              <p className="uppercase tracking-[0.18em] text-xs text-[#2C344C]/70 mb-2">{t.contactPage.eyebrow}</p>
              <h1 className="font-[Bodoni Moda] text-3xl md:text-5xl text-[#2C344C] mb-3">{t.contactPage.title}</h1>
              <p className="text-slate-700 max-w-3xl text-justify">
                {t.contactPage.subtitle}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 p-6 md:p-10">
              <h2 className="font-[Bodoni Moda] text-2xl md:text-3xl text-slate-900 mb-5">{t.contactPage.formTitle}</h2>
              <ConsultationForm language={language} />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="font-[Bodoni Moda] text-2xl text-[#2C344C] mb-4">{t.footer.privacyTitle}</h3>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {t.footer.privacyText.split("\n").map((paragraph, idx) => (
                    <p key={`privacy-${idx}`} className="text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md shadow-slate-900/5">
                <h3 className="font-[Bodoni Moda] text-2xl text-[#2C344C] mb-4">{t.footer.termsTitle}</h3>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {t.footer.termsText.split("\n").map((paragraph, idx) => (
                    <p key={`terms-${idx}`} className="text-justify">
                      {paragraph}
                    </p>
                  ))}
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
                  {t.home.heroTitleLine1}
                  <br />
                  {t.home.heroTitleLine2}
                </h1>
                <p className="text-lg md:text-xl text-white/85 max-w-3xl leading-relaxed text-justify mb-8">
                  {t.home.institutionalText}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => navigateTo("/contacto")} className="btn btn-primary">
                    {t.nav.cta}
                  </button>
                  <button
                    onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
                    className="btn border border-white/40 text-white hover:bg-white/10"
                  >
                    {t.home.heroSecondaryCta}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICIOS */}
          <section id="servicios" className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 py-16">
              <p className="uppercase tracking-[0.2em] text-base md:text-lg text-[#3b82f6] mb-3">{t.home.specialtiesEyebrow}</p>
              <h2 className="font-[Bodoni Moda] text-4xl md:text-6xl text-slate-900 mb-12">{t.home.specialtiesTitle}</h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES_WITH_IDS.map((service, i) => (
                  (() => {
                    const serviceDisplay = getServiceDisplay(service);
                    return (
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
                        {service.index} // {t.home.areaLabel}
                      </span>
                      <h3 className="font-[Bodoni Moda] text-2xl md:text-3xl text-white mb-2">{serviceDisplay.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed max-w-md text-justify">{serviceDisplay.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToService(service.id);
                        }}
                        className="mt-5 btn bg-[#2C344C] text-white border border-[#2C344C] hover:bg-[#1f2a44] shadow-md"
                      >
                        {t.home.cardCta}
                      </button>
                    </div>
                  </article>
                    );
                  })()
                ))}
              </div>
            </div>
          </section>

          {/* SOBRE NOSOTROS */}
          <section id="nosotros" className="bg-[#F8FAFE] border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-16">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-4">
                    <p className="uppercase tracking-[0.2em] text-xs text-[#2C344C]/70">{t.home.aboutEyebrow}</p>
                    <h2 className="font-[Bodoni Moda] text-4xl md:text-5xl text-slate-900">{t.home.aboutTitle}</h2>
                    <div className="space-y-5 text-slate-700 text-base md:text-lg leading-relaxed text-justify">
                      {t.home.aboutParagraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
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
                      {t.home.stats.map((stat) => (
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
              {t.footer.privacy}
            </button>
            <button onClick={() => setTermsOpen(true)} className="hover:opacity-90 underline underline-offset-4">
              {t.footer.terms}
            </button>
          </div>
        </div>
      </footer>

      {/* MODALES */}
      <Modal open={policyOpen} onClose={() => setPolicyOpen(false)} title={t.footer.privacyTitle}>
        {t.footer.privacyText}
      </Modal>

      <Modal open={termsOpen} onClose={() => setTermsOpen(false)} title={t.footer.termsTitle}>
        {t.footer.termsText}
      </Modal>
    </>
  );
}
