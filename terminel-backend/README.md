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

## Endpoints

- `GET /api/health`
- `POST /api/create-checkout-session`
- `POST /api/stripe/webhook`

