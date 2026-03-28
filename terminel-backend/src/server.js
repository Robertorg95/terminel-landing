import "dotenv/config";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "submissions.json");

const PORT = Number(process.env.PORT || 8787);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const EXTRA_ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_CURRENCY = (process.env.STRIPE_CURRENCY || "usd").toLowerCase();
const STRIPE_DEBUG = process.env.STRIPE_DEBUG === "true";
const STRIPE_MOCK_MODE = process.env.STRIPE_MOCK_MODE === "true";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "";
const TO_EMAIL = process.env.TO_EMAIL || "iterminellaw@gmail.com";

if (!STRIPE_SECRET_KEY) {
  // eslint-disable-next-line no-console
  console.warn("[WARN] STRIPE_SECRET_KEY is missing.");
}
if (!RESEND_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn("[WARN] RESEND_API_KEY is missing.");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const resend = new Resend(RESEND_API_KEY);
const app = express();
const memorySubmissions = new Map();

const allowedOrigins = Array.from(
  new Set([FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173", ...EXTRA_ALLOWED_ORIGINS])
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Origin not allowed by CORS"));
    },
  })
);

function ensureDataFile() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf8");
}

function readSubmissions() {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return Array.from(memorySubmissions.values());
  }
}

function writeSubmissions(items) {
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
  } catch {
    for (const item of items) {
      if (item?.id) memorySubmissions.set(item.id, item);
    }
  }
}

function upsertSubmission(nextItem) {
  if (nextItem?.id) memorySubmissions.set(nextItem.id, nextItem);
  const items = readSubmissions();
  const idx = items.findIndex((item) => item.id === nextItem.id);
  if (idx >= 0) items[idx] = { ...items[idx], ...nextItem };
  else items.push(nextItem);
  writeSubmissions(items);
}

function findSubmissionById(id) {
  const fromMemory = memorySubmissions.get(id);
  if (fromMemory) return fromMemory;
  return readSubmissions().find((item) => item.id === id);
}

function formatMethods(methods) {
  if (!methods || methods.length === 0) return "N/A";
  return methods.join(", ");
}

function escapeHtml(input = "") {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mapDurationToPrice(duration) {
  if (duration === "30min") return { unitAmount: 10000, label: "30 min consultation" };
  if (duration === "1h") return { unitAmount: 15000, label: "1 hour consultation" };
  return null;
}

function toMetadataValue(value, max = 500) {
  if (value === null || value === undefined) return "";
  return String(value).slice(0, max);
}

function buildSubmissionFromSession(session) {
  const md = session?.metadata || {};
  const methodsRaw = md.methods ? md.methods.split("|").filter(Boolean) : [];

  return {
    id: md.submissionId || session.id,
    createdAt: new Date().toISOString(),
    language: md.language || "es",
    stripeSessionId: session.id,
    paymentStatus: session.payment_status || "paid",
    paidAt: new Date().toISOString(),
    formData: {
      nombres: md.firstName || "",
      apellidos: md.lastName || "",
      email: md.email || session.customer_email || "",
      telefono: md.phone || "",
      direccion: md.address || "",
      nacionalidad: md.nationality || "",
      estatus: md.immigrationStatus || "",
      metodos: methodsRaw,
      deportado: md.deported || "",
      detenido: md.detained || "",
      familiar_usa: md.familyUsa || "",
      resumen: md.summary || "",
      duracion: md.duration || "",
      fecha_consulta: md.desiredDate || "",
      hora_consulta: md.desiredTime || "",
      acuerdo: md.agreement === "true",
    },
  };
}

async function sendPaymentConfirmationEmail(submission) {
  if (!RESEND_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
    // eslint-disable-next-line no-console
    console.warn("[WARN] Email not sent. Missing RESEND_API_KEY, FROM_EMAIL, or TO_EMAIL.");
    return;
  }

  const form = submission.formData || {};
  const html = `
    <h2>Nuevo pago confirmado - Terminel Law Consulting</h2>
    <p><strong>Submission ID:</strong> ${escapeHtml(submission.id)}</p>
    <p><strong>Stripe Session ID:</strong> ${escapeHtml(submission.stripeSessionId || "")}</p>
    <hr />
    <h3>Datos del formulario</h3>
    <ul>
      <li><strong>Nombre(s):</strong> ${escapeHtml(form.nombres)}</li>
      <li><strong>Apellido(s):</strong> ${escapeHtml(form.apellidos)}</li>
      <li><strong>Email:</strong> ${escapeHtml(form.email)}</li>
      <li><strong>Telefono:</strong> ${escapeHtml(form.telefono)}</li>
      <li><strong>Direccion:</strong> ${escapeHtml(form.direccion || "")}</li>
      <li><strong>Nacionalidad(es):</strong> ${escapeHtml(form.nacionalidad || "")}</li>
      <li><strong>Estatus migratorio:</strong> ${escapeHtml(form.estatus || "")}</li>
      <li><strong>Metodo(s) preferido(s):</strong> ${escapeHtml(formatMethods(form.metodos))}</li>
      <li><strong>Duracion:</strong> ${escapeHtml(form.duracion || "")}</li>
      <li><strong>Fecha deseada:</strong> ${escapeHtml(form.fecha_consulta || "")}</li>
      <li><strong>Hora deseada:</strong> ${escapeHtml(form.hora_consulta || "")}</li>
      <li><strong>Deportado / ingreso negado:</strong> ${escapeHtml(form.deportado || "")}</li>
      <li><strong>Detenido previamente:</strong> ${escapeHtml(form.detenido || "")}</li>
      <li><strong>Familiar ciudadano/residente USA:</strong> ${escapeHtml(form.familiar_usa || "")}</li>
      <li><strong>Resumen:</strong> ${escapeHtml(form.resumen || "")}</li>
      <li><strong>Acepto privacidad:</strong> ${form.acuerdo ? "Si" : "No"}</li>
    </ul>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    subject: "Pago confirmado - Nueva solicitud de consulta",
    html,
  });
}

async function sendCustomerThankYouEmail(submission) {
  const customerEmail = submission?.formData?.email;
  if (!RESEND_API_KEY || !FROM_EMAIL || !customerEmail) {
    return;
  }

  const firstName = submission?.formData?.nombres || "Cliente";
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
      <h2 style="margin-bottom: 8px;">Gracias por agendar una consulta con Terminel Law Consulting.</h2>
      <p style="margin-top: 0;">
        Hola ${escapeHtml(firstName)}, un miembro del equipo de Terminel Law Consulting te contactara a la brevedad para dar seguimiento a tu solicitud.
      </p>
      <hr style="margin: 24px 0;" />
      <h2 style="margin-bottom: 8px;">Thank you for scheduling a consultation with Terminel Law Consulting.</h2>
      <p style="margin-top: 0;">
        Hi ${escapeHtml(firstName)}, a member of the Terminel Law Consulting team will contact you shortly to follow up on your request.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [customerEmail],
    subject: "Terminel Law Consulting - Confirmacion de solicitud / Request confirmation",
    html,
  });
}

app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    let event;
    if (STRIPE_WEBHOOK_SECRET) {
      const signature = req.headers["stripe-signature"];
      event = stripe.webhooks.constructEvent(req.body, signature, STRIPE_WEBHOOK_SECRET);
    } else {
      event = JSON.parse(req.body.toString("utf8"));
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const submissionId = session.metadata?.submissionId;
      const found = submissionId ? findSubmissionById(submissionId) : null;

      if (found && found.paidAt) {
        return res.status(200).json({ received: true });
      }

      const updated = found
        ? {
            ...found,
            stripeSessionId: session.id,
            paymentStatus: session.payment_status,
            paidAt: new Date().toISOString(),
          }
        : buildSubmissionFromSession(session);

      upsertSubmission(updated);
      await Promise.allSettled([
        sendPaymentConfirmationEmail(updated),
        sendCustomerThankYouEmail(updated),
      ]);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "terminel-backend" });
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { formData, language } = req.body || {};
    if (!formData || !formData.duracion || !formData.email) {
      return res.status(400).json({ error: "Missing required form fields." });
    }

    const pricing = mapDurationToPrice(formData.duracion);
    if (!pricing) {
      return res.status(400).json({ error: "Invalid duration selected." });
    }

    const submissionId = crypto.randomUUID();
    const submission = {
      id: submissionId,
      createdAt: new Date().toISOString(),
      language: language || "es",
      paymentStatus: "pending",
      formData: {
        nombres: formData.nombres || "",
        apellidos: formData.apellidos || "",
        email: formData.email || "",
        telefono: formData.telefono || "",
        direccion: formData.direccion || "",
        nacionalidad: formData.nacionalidad || "",
        estatus: formData.estatus || "",
        metodos: Array.isArray(formData.metodos) ? formData.metodos : [],
        deportado: formData.deportado || "",
        detenido: formData.detenido || "",
        familiar_usa: formData.familiar_usa || "",
        resumen: formData.resumen || "",
        duracion: formData.duracion || "",
        fecha_consulta: formData.fecha_consulta || "",
        hora_consulta: formData.hora_consulta || "",
        acuerdo: Boolean(formData.acuerdo),
      },
    };
    upsertSubmission(submission);

    if (STRIPE_MOCK_MODE) {
      const mockSessionId = `cs_mock_${submissionId}`;
      const mockSuccessUrl = `${FRONTEND_URL}/cita-agendada?payment=success&session_id=${mockSessionId}&mock=true`;
      upsertSubmission({
        ...submission,
        stripeSessionId: mockSessionId,
        paymentStatus: "paid_mock",
        paidAt: new Date().toISOString(),
      });
      return res.status(200).json({ url: mockSuccessUrl, mock: true });
    }

    if (!STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Stripe server key is not configured." });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: formData.email,
      success_url: `${FRONTEND_URL}/cita-agendada?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/contacto?payment=cancel`,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: STRIPE_CURRENCY,
            product_data: {
              name: "Terminel Law Consulting - Consultation",
              description: pricing.label,
            },
            unit_amount: pricing.unitAmount,
          },
        },
      ],
      metadata: {
        submissionId,
        duration: formData.duracion,
        desiredDate: formData.fecha_consulta || "",
        desiredTime: formData.hora_consulta || "",
        language: language || "es",
        firstName: toMetadataValue(formData.nombres),
        lastName: toMetadataValue(formData.apellidos),
        email: toMetadataValue(formData.email),
        phone: toMetadataValue(formData.telefono),
        address: toMetadataValue(formData.direccion),
        nationality: toMetadataValue(formData.nacionalidad),
        immigrationStatus: toMetadataValue(formData.estatus),
        methods: toMetadataValue(Array.isArray(formData.metodos) ? formData.metodos.join("|") : ""),
        deported: toMetadataValue(formData.deportado),
        detained: toMetadataValue(formData.detenido),
        familyUsa: toMetadataValue(formData.familiar_usa),
        summary: toMetadataValue(formData.resumen, 450),
        agreement: String(Boolean(formData.acuerdo)),
      },
    });

    upsertSubmission({ ...submission, stripeSessionId: session.id });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Checkout error:", error);
    const payload = { error: "Could not create checkout session." };
    if (STRIPE_DEBUG) {
      payload.details = {
        message: error?.message || null,
        type: error?.type || null,
        code: error?.code || null,
        requestId: error?.requestId || null,
      };
    }
    return res.status(500).json(payload);
  }
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Terminel backend running on http://localhost:${PORT}`);
  });
}

export default app;
