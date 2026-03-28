import { useRef, useState } from "react";

const FORM_TEXT = {
  es: {
    title: "Solicitud de Consulta",
    intro:
      "Durante esta consulta personalizada, un abogado analizara su perfil personal y profesional, estudiara su situacion migratoria y respondera sus preguntas para identificar sus mejores opciones legales para vivir, trabajar o permanecer en EE.UU. Ademas, se le explicaran costos y duracion estimada del caso.",
    firstName: "Nombre(s)",
    lastName: "Apellido(s)",
    email: "Correo electronico",
    methodLegend: "Metodo preferido para la consulta (puede elegir mas de uno)",
    methodMeet: "Google Meet",
    methodPhone: "Llamada Telefonica",
    methodWhatsApp: "WhatsApp Audio o Video",
    phone: "Numero de telefono",
    address: "Direccion actual",
    nationality: "Nacionalidad(es)",
    status: "Estatus migratorio actual",
    q1: "Alguna vez ha sido deportado o se le ha negado ingreso a los Estados Unidos?",
    q2: "Alguna vez ha sido detenido por la policia en cualquier pais por algun motivo?",
    q3: "Su hijo(a), padre o esposo(a) es ciudadano americano o residente permanente de Estados Unidos?",
    yes: "Si",
    no: "No",
    summary: "Breve resumen de sus preguntas de inmigracion y/o problema",
    duration: "Seleccione la duracion de consulta preferente",
    durationPlaceholder: "Seleccione una opcion...",
    duration30: "$100.00 USD - 30 min",
    duration60: "$150.00 USD - 1 hora",
    scheduleDate: "Fecha deseada para la consulta",
    scheduleTime: "Hora deseada para la consulta",
    scheduleTimePlaceholder: "Seleccione una hora",
    scheduleNote:
      "La fecha y hora seleccionadas son preferenciales. Terminel Law Consulting se comunicara con usted para confirmar la disponibilidad final y coordinar su consulta.",
    notice:
      "Por favor tome en cuenta que despues de solicitar la consulta un miembro de Terminel Law Consulting lo contactara por correo dentro de 24 a 48 horas excluyendo fines de semana y dias festivos.",
    agreement:
      "Estoy de acuerdo. Al continuar, confirma que ha leido y esta de acuerdo con las politicas de privacidad.",
    submit: "Agendar y pagar",
    redirectNote: "Al continuar seras redirigido a Stripe para completar el pago.",
    selectingPlanError: "Selecciona la duracion de consulta para continuar.",
    backendError: "No fue posible iniciar el pago. Intenta nuevamente.",
    processing: "Procesando...",
  },
  en: {
    title: "Consultation Request",
    intro:
      "During this personalized consultation, an attorney will review your personal and professional profile, evaluate your immigration situation, and answer your questions to identify your best legal options to live, work, or remain in the U.S. Estimated costs and timeline will also be explained.",
    firstName: "First name(s)",
    lastName: "Last name(s)",
    email: "Email address",
    methodLegend: "Preferred consultation method (you may choose more than one)",
    methodMeet: "Google Meet",
    methodPhone: "Phone Call",
    methodWhatsApp: "WhatsApp Audio or Video",
    phone: "Phone number",
    address: "Current address",
    nationality: "Nationality(ies)",
    status: "Current immigration status",
    q1: "Have you ever been deported or denied entry into the United States?",
    q2: "Have you ever been detained by police in any country for any reason?",
    q3: "Is your child, parent, or spouse a U.S. citizen or lawful permanent resident?",
    yes: "Yes",
    no: "No",
    summary: "Brief summary of your immigration questions and/or issue",
    duration: "Select your preferred consultation duration",
    durationPlaceholder: "Select an option...",
    duration30: "$100.00 USD - 30 min",
    duration60: "$150.00 USD - 1 hour",
    scheduleDate: "Preferred consultation date",
    scheduleTime: "Preferred consultation time",
    scheduleTimePlaceholder: "Select a time",
    scheduleNote:
      "The selected date and time are preferred options. Terminel Law Consulting will contact you to confirm final availability and coordinate your consultation.",
    notice:
      "Please note that after submitting your request, a member of Terminel Law Consulting will contact you by email within 24 to 48 hours, excluding weekends and holidays.",
    agreement:
      "I agree. By continuing, you confirm that you have read and agree to the privacy policy.",
    submit: "Schedule and pay",
    redirectNote: "By continuing you will be redirected to Stripe to complete payment.",
    selectingPlanError: "Select a consultation duration to continue.",
    backendError: "Could not start checkout. Please try again.",
    processing: "Processing...",
  },
};

export default function ConsultationForm({ language = "es" }) {
  const t = FORM_TEXT[language] ?? FORM_TEXT.es;
  const formRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];
  const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8787").replace(/\/+$/, "");

  const [agreed, setAgreed] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeOptions = [
    { value: "08:00", es: "08:00 a. m.", en: "08:00 AM" },
    { value: "09:00", es: "09:00 a. m.", en: "09:00 AM" },
    { value: "10:00", es: "10:00 a. m.", en: "10:00 AM" },
    { value: "11:00", es: "11:00 a. m.", en: "11:00 AM" },
    { value: "12:00", es: "12:00 p. m.", en: "12:00 PM" },
    { value: "13:00", es: "01:00 p. m.", en: "01:00 PM" },
    { value: "14:00", es: "02:00 p. m.", en: "02:00 PM" },
    { value: "15:00", es: "03:00 p. m.", en: "03:00 PM" },
    { value: "16:00", es: "04:00 p. m.", en: "04:00 PM" },
    { value: "17:00", es: "05:00 p. m.", en: "05:00 PM" },
    { value: "18:00", es: "06:00 p. m.", en: "06:00 PM" },
    { value: "19:00", es: "07:00 p. m.", en: "07:00 PM" },
    { value: "20:00", es: "08:00 p. m.", en: "08:00 PM" },
  ];

  const handleContinueToStripe = async () => {
    setSubmitError("");

    if (!selectedDuration) {
      setSubmitError(t.selectingPlanError);
      return;
    }

    const formEl = formRef.current;
    if (!formEl) return;

    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }

    const fd = new FormData(formEl);
    const payload = {
      language,
      formData: {
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
        resumen: fd.get("resumen"),
        duracion: fd.get("duracion"),
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

      const popup = window.open(data.url, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = data.url;
      }
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
          <p className="text-slate-700 leading-relaxed text-justify">{t.intro}</p>

          <form ref={formRef} className="space-y-6">
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

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.email}</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
              />
            </div>

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
                <label className="block text-sm font-medium text-slate-700">{t.phone}</label>
                <input
                  type="tel"
                  name="telefono"
                  required
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.address}</label>
                <input
                  type="text"
                  name="direccion"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
                />
              </div>
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
              <label className="block text-sm font-medium text-slate-700">{t.summary}</label>
              <textarea
                name="resumen"
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C] resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">{t.duration}</label>
              <select
                name="duracion"
                required
                value={selectedDuration}
                onChange={(e) => {
                  setSelectedDuration(e.target.value);
                  setSubmitError("");
                }}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]"
              >
                <option value="">{t.durationPlaceholder}</option>
                <option value="30min">{t.duration30}</option>
                <option value="1h">{t.duration60}</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">{t.scheduleDate}</label>
                <input
                  type="date"
                  name="fecha_consulta"
                  min={today}
                  required
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
                {t.agreement}{" "}
                <a href="#privacidad" className="underline">
                  {language === "en" ? "privacy policy" : "politicas de privacidad"}
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
