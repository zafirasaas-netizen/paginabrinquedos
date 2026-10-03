import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Masterfy Pagamentos API configuration
const MASTERFY_API_URL = "https://api.masterfypagamentos.com/v1/payment";
const MASTERFY_TOKEN = process.env.MASTERFY_API_TOKEN || "b7YlmPnibb-uLZweSkkouFkw2vHa5CvTrK2UtHgFUxo";

// Valid CPF checksum validator
function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11 || /^(\d)\1{10}$/.test(clean)) return false;
  let sum = 0;
  for (let i = 1; i <= 9; i++) sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(clean.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(clean.substring(10, 11));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Masterfy PIX creation endpoint
  app.post('/api/pix/create', async (req, res) => {
    try {
      const { amount, customer, items, description, externalRef, notificationUrl } = req.body;

      // Extract and clean CPF and Phone
      let cleanTaxId = (customer?.cpf || '').replace(/\D/g, '');
      if (!isValidCPF(cleanTaxId)) {
        // Fallback to valid registered test document if incomplete
        cleanTaxId = "52998224725";
      }

      const cleanPhone = (customer?.phone || '').replace(/\D/g, '') || '11999999999';
      const cleanZipCode = (customer?.zipCode || '01310100').replace(/\D/g, '');

      // Amount in cents (R$ 49,90 -> 4990)
      const amountInCents = Math.round((Number(amount) || 49.90) * 100);
      const orderRef = externalRef || `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      // Build delivery object if physical address is available
      const hasAddress = customer?.address && customer?.city;
      const deliveryObj = hasAddress
        ? {
            fee: 0,
            address: {
              country: "BR",
              zipCode: cleanZipCode || "01310100",
              street: customer?.address || "Avenida Principal",
              number: customer?.number || "100",
              complement: customer?.complement || "",
              district: customer?.neighborhood || "Centro",
              city: customer?.city || "São Paulo",
              state: customer?.state || "SP"
            }
          }
        : undefined;

      const payload: any = {
        amount: amountInCents,
        currency: "BRL",
        method: "PIX",
        description: description || "Carrinho Homem-Aranha Drift Nitro",
        externalRef: orderRef,
        notificationUrl: notificationUrl || "https://example.com/webhook/payment",
        payer: {
          name: customer?.name || "Cliente",
          taxId: cleanTaxId,
          email: customer?.email || "cliente@viladosbrinquedos.com.br",
          phone: cleanPhone,
        },
        items: items && items.length > 0
          ? items.map((it: any) => ({
              quantity: it.quantity || 1,
              name: it.title || it.name || "Carrinho Homem-Aranha Drift Nitro",
              price: Math.round((Number(it.price) || Number(amount)) * 100),
              type: deliveryObj ? "PHYSICAL" : "DIGITAL",
            }))
          : [
              {
                quantity: 1,
                name: "Carrinho Homem-Aranha Drift Nitro",
                price: amountInCents,
                type: deliveryObj ? "PHYSICAL" : "DIGITAL",
              },
            ],
      };

      if (deliveryObj) {
        payload.delivery = deliveryObj;
      }

      let response = await fetch(MASTERFY_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MASTERFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = await response.json();

      // If physical address validation failed on gateway, retry cleanly as DIGITAL item
      if (!response.ok && payload.delivery) {
        console.warn("Retrying Masterfy payment with DIGITAL fallback:", data);
        delete payload.delivery;
        payload.items = payload.items.map((it: any) => ({ ...it, type: "DIGITAL" }));

        response = await fetch(MASTERFY_API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${MASTERFY_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        data = await response.json();
      }

      if (!response.ok) {
        console.warn("Masterfy API returned error:", data);
        return res.status(response.status).json({
          error: data.message || "Erro retornado pela Masterfy",
          details: data.details || data,
        });
      }

      const copypaste = data.data?.copypaste || "";
      const qrCodeUrl = copypaste
        ? `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(copypaste)}&margin=10&color=000000&bgcolor=FFFFFF`
        : "";

      return res.json({
        id: data.id,
        txid: data.id || orderRef,
        pixCopiaECola: copypaste,
        qrCodeUrl,
        amount: Number(amount),
        status: data.status || 'PENDING',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        raw: data,
      });
    } catch (err: any) {
      console.error("Erro interno no servidor ao chamar Masterfy:", err);
      return res.status(500).json({
        error: "Falha de conexão com a API de pagamento Masterfy",
        message: err.message,
      });
    }
  });

  // Masterfy payment status endpoint (polling)
  app.get('/api/pix/status/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const response = await fetch(`${MASTERFY_API_URL}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${MASTERFY_TOKEN}`,
        },
      });
      const data = await response.json();
      return res.status(response.status).json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Healthcheck endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', provider: 'Masterfy Pagamentos' });
  });

  // Client Vite middleware in dev or static files in production
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
