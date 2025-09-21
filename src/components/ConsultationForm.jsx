export default function ConsultationForm() {
  return (
    <section id="agenda" className="bg-[#F7F9FC]">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-[Bodoni Moda] text-3xl md:text-4xl text-slate-900 mb-4">
          Solicitud de Consulta
        </h2>

        <div className="rounded-3xl bg-white shadow p-6 md:p-8 space-y-6">
          <p className="text-slate-700 leading-relaxed">
            Durante esta consulta personalizada, un abogado analizará su perfil personal y profesional,
            estudiará su situación migratoria y responderá sus preguntas e identificará sus mejores opciones
            legales ya sea para vivir, trabajar o permanecer en EE.UU. Además, le serán explicados los costos y
            duración estimada del caso.
          </p>

          <form className="space-y-6">
            {/* A) Nombre y Apellidos */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre(s)</label>
                <input type="text" name="nombres" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Apellido(s)</label>
                <input type="text" name="apellidos" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
              </div>
            </div>

            {/* B) Correo */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Correo electrónico</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
            </div>

            {/* C) Método de consulta */}
            <fieldset>
              <legend className="block text-sm font-medium text-slate-700 mb-2">
                Método preferido para la consulta (puede elegir más de uno)
              </legend>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="metodo" value="Google Meet" className="rounded" />
                  <span>Google Meet</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="metodo" value="Llamada Telefónica" className="rounded" />
                  <span>Llamada Telefónica</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="metodo" value="WhatsApp Audio/Video" className="rounded" />
                  <span>WhatsApp Audio o Video</span>
                </label>
              </div>
            </fieldset>

            {/* D) Teléfono y dirección */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Número de teléfono</label>
                <input type="tel" name="telefono" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Dirección actual</label>
                <input type="text" name="direccion" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
              </div>
            </div>

            {/* E) Nacionalidad(es) */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Nacionalidad(es)</label>
              <input type="text" name="nacionalidad" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
            </div>

            {/* F) Estatus migratorio actual */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Estatus migratorio actual</label>
              <input type="text" name="estatus" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C]" />
            </div>

            {/* G H I) Preguntas SI/NO */}
            <div className="space-y-4">
              {[
                { name: "deportado", q: "¿Alguna vez ha sido deportado o se le ha negado ingreso a los Estados Unidos?" },
                { name: "detenido", q: "¿Alguna vez ha sido detenido por la policía en cualquier país por algún motivo?" },
                { name: "familiar_usa", q: "¿Su hijo(a), padre o esposo(a) es ciudadano americano o residente permanente de Estados Unidos?" },
              ].map(({ name, q }) => (
                <fieldset key={name} className="grid md:grid-cols-[1fr_auto_auto] items-center gap-3">
                  <legend className="text-sm font-medium text-slate-700">{q}</legend>
                  <label className="flex items-center gap-2">
                    <input type="radio" name={name} value="Si" className="rounded" /> <span>Sí</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name={name} value="No" className="rounded" /> <span>No</span>
                  </label>
                </fieldset>
              ))}
            </div>

            {/* J) Resumen */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Breve resumen de sus preguntas de inmigración y/o problema
              </label>
              <textarea
                name="resumen"
                rows={5}
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2C344C] resize-y"
              />
            </div>

            {/* K) Duración / costo */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Seleccione la duración de consulta preferente
              </label>
              <select name="duracion" required className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-[#2C344C]">
                <option value="">Seleccione una opción…</option>
                <option value="30min">$150.00 USD — 30 min</option>
                <option value="1h">$250.00 USD — 1 hora</option>
              </select>
            </div>

            {/* L) Aviso y acuerdo */}
            <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-slate-200 text-slate-700">
              <p className="text-sm">
                Por favor tome en cuenta que después de solicitar la consulta un miembro de Terminel Law Consulting
                lo contactará por correo dentro de 24 a 48 horas excluyendo fines de semana y días festivos.
              </p>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" name="acuerdo" required className="mt-1 rounded" />
              <span className="text-sm text-slate-700">
                Estoy de acuerdo. Al continuar, confirma que ha leído y está de acuerdo con las{" "}
                <a href="#privacidad" className="underline">políticas de privacidad</a>.
              </span>
            </label>

            {/* Botón enviar (sin funciones todavía) */}
            <div className="pt-2">
              <button type="button" className="btn btn-primary w-full">
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
