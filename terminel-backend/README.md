# Terminel Backend

Backend minimo para:
- Crear sesion de pago en Stripe Checkout desde los datos del formulario.
- Confirmar pago por webhook.
- Enviar email con datos del formulario usando Resend solo despues de pago confirmado.

## 1) Instalacion

```bash
cd terminel-backend
npm install
```

## 2) Variables de entorno

1. Copia `.env.example` a `.env`.
2. Completa las claves.

Ejemplo recomendado para produccion:

```env
PORT=8787
FRONTEND_URL=https://tu-frontend.vercel.app
ALLOWED_ORIGINS=https://tu-frontend.vercel.app,https://www.terminellaw.com,https://terminellaw.com

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=usd

RESEND_API_KEY=re_...
FROM_EMAIL=Terminel Law <no-reply@terminellaw.com>
TO_EMAIL=iterminellaw@gmail.com
```

## 3) Ejecutar backend

```bash
npm run dev
```

Corre por defecto en `http://localhost:8787`.

## 4) Webhook local de Stripe

En otra terminal:

```bash
stripe listen --forward-to localhost:8787/api/stripe/webhook
```

Stripe CLI te dara un `whsec_...`; colocalo en `STRIPE_WEBHOOK_SECRET`.

## 5) Frontend

En el `.env` del frontend (`terminel-landing/.env`) agrega:

```env
VITE_BACKEND_URL=http://localhost:8787
```

Reinicia `npm run dev` del frontend.

Para produccion usa la URL publica de tu backend, por ejemplo:

```env
VITE_BACKEND_URL=https://terminel-backend.tu-proyecto.vercel.app
```

## 6) Stripe en produccion

Configura en Stripe:

- `Success URL`: `https://tu-frontend.vercel.app/contacto?payment=success&session_id={CHECKOUT_SESSION_ID}`
- `Cancel URL`: `https://tu-frontend.vercel.app/contacto?payment=cancel`
- Webhook endpoint: `https://tu-backend-publico/api/stripe/webhook`

## 7) Deploy en Vercel (backend)

1. Crea un segundo proyecto en Vercel usando el mismo repositorio.
2. En `Root Directory` selecciona `terminel-backend`.
3. Agrega las variables de entorno del backend.
4. Deploy.
5. Prueba:
   - `https://TU_BACKEND/api/health`
   - `POST https://TU_BACKEND/api/create-checkout-session`

Nota: `data/submissions.json` se guarda en disco local del runtime. En serverless no es persistente a largo plazo. Para produccion estable conviene mover esto a una base de datos.

## Endpoints

- `GET /api/health`
- `POST /api/create-checkout-session`
- `POST /api/stripe/webhook`
