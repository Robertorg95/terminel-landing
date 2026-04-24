import { useRef, useState } from "react";

const FORM_TEXT = {
  es: {
    title: "Agenda una consulta",
    migrationTab: "Visas y Migracion",
    corporateTab: "Corporativa",
    migrationIntro:
      "Durante esta consulta personalizada, un abogado analizara su perfil personal y profesional, estudiara su situacion migratoria y respondera sus preguntas para identificar sus mejores opciones legales para vivir, trabajar o permanecer en EE.UU. Ademas, se le explicaran costos y duracion estimada del caso.",
    corporateIntro:
      "Durante esta consulta, un abogado analizara la estructura y necesidades legales de su empresa en EE.UU. y/o Mexico, identificara riesgos y oportunidades, y le propondra una estrategia legal clara con costos estimados y tiempos.",
    contactData: "Datos de contacto",
    firstName: "Nombre(s)",
    lastName: "Apellido(s)",
    email: "Correo electronico",
    phone: "Telefono",
    methodLegend: "Metodo preferido para la consulta (puede elegir mas de uno)",
    methodMeet: "Google Meet",
    methodPhone: "Llamada Telefonica",
    methodWhatsApp: "WhatsApp Audio o Video",
    address: "Direccion actual",
    nationality: "Nacionalidad(es)",
    status: "Estatus migratorio actual",
    q1: "Alguna vez ha sido deportado o se le ha negado ingreso a los Estados Unidos?",
    q2: "Alguna vez ha sido detenido por la policia en cualquier pais por algun motivo?",
    q3: "Su hijo(a), padre o esposo(a) es ciudadano americano o residente permanente de Estados Unidos?",
    yes: "Si",
    no: "No",
    migrationSummary: "Breve resumen de sus preguntas de inmigracion y/o problema",
    companySection: "Empresa",
    companyName: "Nombre de la empresa",
    operationQuestion: "Donde opera principalmente?",
    opUsa: "EE.UU.",
    opMx: "Mexico",
    opBoth: "Ambos",
    opNotYet: "Aun no opera",
    operationPlaceholder: "Seleccione una opcion...",
    needQuestion: "Que necesita resolver? (elige una)",
    needCreate: "Crear o estructurar empresa",
    needCompliance: "Resolver cumplimiento / problemas legales",
    needContracts: "Contratos o acuerdos",
    needExpansion: "Expansion a EE.UU.",
    needTransport: "Transporte / DOT / FMCSA",
    needOther: "Otro",
    needPlaceholder: "Seleccione una opcion...",
    corporateSummary: "Describe brevemente tu caso",
    corporateSummaryHint: "1-3 lineas maximo",
    investmentLabel: "Inversion estimada",
    investmentHint:
      "Nos ayuda a asignar el tipo de estrategia adecuada, estas son opciones para elegir, no son para pagar ni nada.",
    invPlaceholder: "Seleccione una opcion...",
    inv1: "$1,000 - $5,000",
    inv2: "$5,000 - $15,000",
    inv3: "$15,000+",
    durationLabel: "Duracion e inversion",
    fixedDuration: "1 hora - $260.00 USD",
    scheduleDate: "Fecha deseada para la consulta",
    scheduleTime: "Hora deseada para la consulta",
    scheduleTimePlaceholder: "Seleccione una hora",
    weekendError: "Solo se permiten citas de lunes a viernes.",
    scheduleNote:
      "La fecha y hora seleccionadas son preferenciales. Terminel Law Consulting se comunicara con usted para confirmar la disponibilidad final y coordinar su consulta.",
    notice:
      "Por favor tome en cuenta que despues de solicitar la consulta un miembro de Terminel Law Consulting lo contactara por correo dentro de 24 a 48 horas excluyendo fines de semana y dias festivos.",
    agreementPrefix:
      "Estoy de acuerdo. Al continuar, confirmo que he leido y estoy de acuerdo con los",
    agreementTerms: "terminos y condiciones",
    agreementMiddle: "junto con las",
    agreementPrivacy: "politicas de privacidad",
    submit: "Agendar y pagar",
    redirectNote: "Al continuar seras redirigido a Stripe para completar el pago.",
    backendError: "No fue posible iniciar el pago. Intenta nuevamente.",
    processing: "Procesando...",
  },
  en: {
    title: "Schedule a consultation",
    migrationTab: "Visas and Migration",
    corporateTab: "Corporate",
    migrationIntro:
      "During this personalized consultation, an attorney will review your personal and professional profile, evaluate your immigration situation, and answer your questions to identify your best legal options to live, work, or remain in the U.S. Estimated costs and timeline will also be explained.",
    corporateIntro:
      "During this consultation, an attorney will assess your company structure and legal needs in the U.S. and/or Mexico, identify risks and opportunities, and propose a clear legal strategy with estimated costs and timelines.",
    contactData: "Contact details",
    firstName: "First name(s)",
    lastName: "Last name(s)",
    email: "Email",
    phone: "Phone",
    methodLegend: "Preferred consultation method (you may choose more than one)",
    methodMeet: "Google Meet",
    methodPhone: "Phone Call",
    methodWhatsApp: "WhatsApp Audio or Video",
    address: "Current address",
    nationality: "Nationality(ies)",
    status: "Current immigration status",
    q1: "Have you ever been deported or denied entry into the United States?",
    q2: "Have you ever been detained by police in any country for any reason?",
    q3: "Is your child, parent, or spouse a U.S. citizen or lawful permanent resident?",
    yes: "Yes",
    no: "No",
    migrationSummary: "Brief summary of your immigration questions and/or issue",
    companySection: "Company",
    companyName: "Company name",
    operationQuestion: "Where do you mainly operate?",
    opUsa: "U.S.",
    opMx: "Mexico",
    opBoth: "Both",
    opNotYet: "Not operating yet",
    operationPlaceholder: "Select an option...",
    needQuestion: "What do you need to solve? (choose one)",
    needCreate: "Create or structure company",
    needCompliance: "Resolve compliance / legal issues",
    needContracts: "Contracts or agreements",
    needExpansion: "Expansion to the U.S.",
    needTransport: "Transport / DOT / FMCSA",
    needOther: "Other",
    needPlaceholder: "Select an option...",
    corporateSummary: "Briefly describe your case",
    corporateSummaryHint: "1-3 lines max",
    investmentLabel: "Estimated investment",
    investmentHint:
      "This helps us assign the right strategy type. These are selection options only, not payment amounts.",
    invPlaceholder: "Select an option...",
    inv1: "$1,000 - $5,000",
    inv2: "$5,000 - $15,000",
    inv3: "$15,000+",
    durationLabel: "Duration and fee",
    fixedDuration: "1 hour - $260.00 USD",
    scheduleDate: "Preferred consultation date",
    scheduleTime: "Preferred consultation time",
    scheduleTimePlaceholder: "Select a time",
    weekendError: "Appointments are only available Monday through Friday.",
    scheduleNote:
      "The selected date and time are preferred options. Terminel Law Consulting will contact you to confirm final availability and coordinate your consultation.",
    notice:
      "Please note that after submitting your request, a member of Terminel Law Consulting will contact you by email within 24 to 48 hours, excluding weekends and holidays.",
    agreementPrefix:
      "I agree. By continuing, I confirm that I have read and agree to the",
    agreementTerms: "terms and conditions",
    agreementMiddle: "along with the",
    agreementPrivacy: "privacy policies",
    submit: "Schedule and pay",
    redirectNote: "By continuing you will be redirected to Stripe to complete payment.",
    backendError: "Could not start checkout. Please try again.",
    processing: "Processing...",
  },
};

export default function ConsultationForm({ language = "es" }) {
  const t = FORM_TEXT[language] ?? FORM_TEXT.es;
  const formRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8787").replace(/\/+$/, "");

  const [consultationType, setConsultationType] = useState("migracion");
  const [agreed, setAgreed] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeOptions = [
    { value: "10:00", es: "10:00 a. m.", en: "10:00 AM" },
    { value: "11:00", es: "11:00 a. m.", en: "11:00 AM" },
    { value: "12:00", es: "12:00 p. m.", en: "12:00 PM" },
    { value: "13:00", es: "01:00 p. m.", en: "01:00 PM" },
  ];

  const isMigration = consultationType === "migracion";

  const isWeekendDate = (dateValue) => {
    if (!dateValue) return false;
    const date = new Date(`${dateValue}T00:00:00`);
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleContinueToStripe = async () => {
    setSubmitError("");

    const formEl = formRef.current;
    if (!formEl) return;

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    if (isWeekendDate(selectedDate)) {
      setSubmitError(t.weekendError);
      return;
    }

    const fd = new FormData(formEl);
    const payload = {
      language,
      formData: {
        tipo_consulta: consultationType,
        nombres: fd.get("nombres"),
        apellidos: fd.get("apellidos"),
        email: fd.get("email"),
        telefono: fd.get("telefono"),
        direccion: fd.get("direccion"),
        nacionalidad: fd.get("nacionalidad"),
        estatus: fd.get("estatus"),
        metodos: fd.getAll("metodo"),
        deportado: fd.get("deportado"),
        detenido: fd.get("detenido"),
        familiar_usa: fd.get("familiar_usa"),
        empresa_nombre: fd.get("empresa_nombre"),
        empresa_operacion: fd.get("empresa_operacion"),
        empresa_necesidad: fd.get("empresa_necesidad"),
        inversion_estimada: fd.get("inversion_estimada"),
        resumen: fd.get("resumen"),
        duracion: "1h",
        fecha_consulta: fd.get("fecha_consulta"),
        hora_consulta: fd.get("hora_consulta"),
        acuerdo: agreed,
      },
    };

    setIsSubmitting(true);
    try {
      const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.url) {
        setSubmitError(data.error || t.backendError);
        return;
      }

      window.location.assign(data.url);
    } catch {
      setSubmitError(t.backendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="agenda" className="bg-[#F7F9FC]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-[Bodoni Moda] text-3xl md:text-4xl text-slate-900 mb-4">{t.title}</h2>

        <div className="rounded-3xl bg-white shadow p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setConsultationType("migracion");
                setSubmitError("");
              }}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                isMigration
                  ? "bg-[#2C344C] text-white border-[#2C344C]"
                  : "bg-white text-[#2C344C] border-slate-300 hover:bg-slate-50"
              }`}
            >
              {t.migrationTab}
            </button>
            <button
              type="button"
              onClick={() => {
                setConsultationType("corporativa");
                setSubmitError("");
              }}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                !isMigration
                  ? "bg-[#2C344C] text-white border-[#2C344C]"
                  : "bg-white text-[#2C344C] border-slate-300 hover:bg-slate-50"
              }`}
            >
              {t.corporateTab}
            </button>
          </div>

          <p className="text-slate-700 leading-relaxed text-justify">{isMigration ? t.migrationIntro : t.corporateIntro}</p>

          <form ref={formRef} className="space-y-6">
            <div className="rounded-2xl border border-slate-200 p-4 md:p-5 space-y-4">
              <h3 className="font-semibold text-[#2C344C]">{t.contactData}</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.firstName}</label>
                  <input
                    type="text"
                    name="nombres"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.lastName}</label>
                  <input
                    type="text"
                    name="apellidos"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.phone}</label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                  />
                </div>
              </div>
            </div>

            {isMigration ? (
              <>
                <fieldset>
                  <legend className="block text-sm font-medium text-slate-700 mb-2">{t.methodLegend}</legend>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="metodo" value="Google Meet" className="rounded" />
                      <span>{t.methodMeet}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="metodo" value="Phone Call" className="rounded" />
                      <span>{t.methodPhone}</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="metodo" value="WhatsApp Audio/Video" className="rounded" />
                      <span>{t.methodWhatsApp}</span>
                    </label>
                  </div>
                </fieldset>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.address}</label>
                    <input
                      type="text"
                      name="direccion"
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.nationality}</label>
                    <input
                      type="text"
                      name="nacionalidad"
                      required
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.status}</label>
                  <input
                    type="text"
                    name="estatus"
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                  />
                </div>

                <div className="space-y-4">
                  {[
                    { name: "deportado", q: t.q1 },
                    { name: "detenido", q: t.q2 },
                    { name: "familiar_usa", q: t.q3 },
                  ].map(({ name, q }) => (
                    <fieldset key={name} className="grid md:grid-cols-[1fr_auto_auto] items-center gap-3">
                      <legend className="text-sm font-medium text-slate-700">{q}</legend>
                      <label className="flex items-center gap-2">
                        <input type="radio" name={name} value={t.yes} className="rounded" />
                        <span>{t.yes}</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" name={name} value={t.no} className="rounded" />
                        <span>{t.no}</span>
                      </label>
                    </fieldset>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">{t.migrationSummary}</label>
                  <textarea
                    name="resumen"
                    rows={5}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C] resize-y"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-slate-200 p-4 md:p-5 space-y-4">
                  <h3 className="font-semibold text-[#2C344C]">{t.companySection}</h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.companyName}</label>
                    <input
                      type="text"
                      name="empresa_nombre"
                      required
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.operationQuestion}</label>
                    <select
                      name="empresa_operacion"
                      required
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    >
                      <option value="">{t.operationPlaceholder}</option>
                      <option value={t.opUsa}>{t.opUsa}</option>
                      <option value={t.opMx}>{t.opMx}</option>
                      <option value={t.opBoth}>{t.opBoth}</option>
                      <option value={t.opNotYet}>{t.opNotYet}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.needQuestion}</label>
                    <select
                      name="empresa_necesidad"
                      required
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    >
                      <option value="">{t.needPlaceholder}</option>
                      <option value={t.needCreate}>{t.needCreate}</option>
                      <option value={t.needCompliance}>{t.needCompliance}</option>
                      <option value={t.needContracts}>{t.needContracts}</option>
                      <option value={t.needExpansion}>{t.needExpansion}</option>
                      <option value={t.needTransport}>{t.needTransport}</option>
                      <option value={t.needOther}>{t.needOther}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.corporateSummary}</label>
                    <textarea
                      name="resumen"
                      rows={3}
                      maxLength={320}
                      required
                      className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C] resize-y"
                    />
                    <p className="text-xs text-slate-500 mt-1">{t.corporateSummaryHint}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">{t.investmentLabel}</label>
                    <p className="text-xs text-slate-500 mt-1 mb-2">{t.investmentHint}</p>
                    <select
                      name="inversion_estimada"
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                    >
                      <option value="">{t.invPlaceholder}</option>
                      <option value={t.inv1}>{t.inv1}</option>
                      <option value={t.inv2}>{t.inv2}</option>
                      <option value={t.inv3}>{t.inv3}</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.durationLabel}</label>
              <div className="mt-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-800 font-medium">
                {t.fixedDuration}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.scheduleDate}</label>
                <input
                  type="date"
                  name="fecha_consulta"
                  value={selectedDate}
                  min={today}
                  required
                  onChange={(e) => {
                    const nextDate = e.target.value;
                    setSelectedDate(nextDate);
                    const invalidWeekend = isWeekendDate(nextDate);
                    e.target.setCustomValidity(invalidWeekend ? t.weekendError : "");
                    setSubmitError(invalidWeekend ? t.weekendError : "");
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.scheduleTime}</label>
                <select
                  name="hora_consulta"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                >
                  <option value="">{t.scheduleTimePlaceholder}</option>
                  {timeOptions.map((time) => (
                    <option key={time.value} value={time.value}>
                      {language === "en" ? time.en : time.es}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-slate-200 text-slate-700">
              <p className="text-sm text-justify">{t.scheduleNote}</p>
            </div>

            <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-slate-200 text-slate-700">
              <p className="text-sm">{t.notice}</p>
            </div>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                name="acuerdo"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  setSubmitError("");
                }}
                required
                className="mt-1 rounded"
              />
              <span className="text-sm text-slate-700">
                {t.agreementPrefix}{" "}
                <a href="#terminos" className="underline">
                  {t.agreementTerms}
                </a>{" "}
                {t.agreementMiddle}{" "}
                <a href="#privacidad" className="underline">
                  {t.agreementPrivacy}
                </a>
                .
              </span>
            </label>

            {submitError ? <p className="text-sm text-red-700">{submitError}</p> : null}
            <p className="text-xs text-slate-500">{t.redirectNote}</p>

            <div className="pt-2">
              <button
                type="button"
                disabled={!agreed || isSubmitting}
                onClick={handleContinueToStripe}
                className={`btn w-full ${
                  agreed && !isSubmitting ? "btn-primary" : "bg-slate-300 text-slate-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? t.processing : t.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
