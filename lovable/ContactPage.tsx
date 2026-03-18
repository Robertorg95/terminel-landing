import { useState } from "react";

export default function ContactPage() {
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-3 font-body">Atención Legal</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">Solicitud de Consulta</h1>
        <p className="text-muted-foreground font-body mb-12 max-w-2xl">
          Durante esta consulta personalizada, un abogado analizará su perfil, estudiará su situación migratoria y responderá sus preguntas.
        </p>

        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Nombre(s)</label>
                <input type="text" required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Apellido(s)</label>
                <input type="text" required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Correo electrónico</label>
              <input type="email" required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
            </div>

            <fieldset>
              <legend className="block text-sm font-medium text-foreground mb-2 font-body">Método preferido para la consulta</legend>
              <div className="flex flex-wrap gap-3">
                {["Google Meet", "Llamada Telefónica", "WhatsApp"].map((m) => (
                  <label key={m} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <input type="checkbox" className="rounded-sm border-border" />
                    <span>{m}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Teléfono</label>
                <input type="tel" required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Dirección actual</label>
                <input type="text" className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Nacionalidad(es)</label>
              <input type="text" required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Estatus migratorio actual</label>
              <input type="text" className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Breve resumen de sus preguntas</label>
              <textarea rows={4} className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-y font-body" />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5 font-body">Duración de consulta preferente</label>
              <select required className="w-full rounded-sm border border-border bg-secondary px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-body">
                <option value="">Seleccione una opción…</option>
                <option value="30min">$150.00 USD — 30 min</option>
                <option value="1h">$250.00 USD — 1 hora</option>
              </select>
            </div>

            <div className="rounded-sm bg-secondary border border-border p-4">
              <p className="text-xs text-muted-foreground font-body">
                Después de solicitar la consulta un miembro de Terminel Law Consulting lo contactará por correo dentro de 24 a 48 horas excluyendo fines de semana y días festivos.
              </p>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 rounded-sm border-border" />
              <span className="text-sm text-muted-foreground font-body">
                Estoy de acuerdo. Al continuar, confirma que ha leído y está de acuerdo con las políticas de privacidad.
              </span>
            </label>

            <button
              type="button"
              disabled={!agreed}
              className="w-full rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar solicitud
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
