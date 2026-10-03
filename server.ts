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
const MASTERFY_TOKEN = process.env.MASTERFY_API_TOKEN || "9X7f-3eB7vy3Qsn9H8NnenovR7vpGjPyVz_JcxTkaVE";

async function startServer() {
  const app = express();
  app.use(express.json());

  // Masterfy PIX creation endpoint
  app.post('/api/pix/create', async (req, res) => {
    try {
      const { amount, customer, items, description, externalRef } = req.body;

      // Extract and clean CPF and Phone
      const cleanTaxId = (customer?.cpf || '').replace(/\D/g, '');
      const cleanPhone = (customer?.phone || '').replace(/\D/g, '') || '11999999999';

      // Amount in cents (R$ 197,90 -> 19790)
      const amountInCents = Math.round((Number(amount) || 197.90) * 100);
      const orderRef = externalRef || `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      const payload = {
        amount: amountInCents,
        currency: "BRL",
        method: "PIX",
        description: description || "Carrinho Homem-Aranha com Fumaça",
        externalRef: orderRef,
        payer: {
          name: customer?.name || "Cliente",
          taxId: cleanTaxId,
          email: customer?.email || "cliente@viladosbrinquedos.com.br",
          phone: cleanPhone,
        },
        items: items && items.length > 0
          ? items.map((it: any) => ({
              quantity: it.quantity || 1,
              name: it.title || it.name || "Carrinho Homem-Aranha",
              price: Math.round((Number(it.price) || Number(amount)) * 100),
              type: "DIGITAL",
            }))
          : [
              {
                quantity: 1,
                name: "Carrinho Homem-Aranha com Fumaça",
                price: amountInCents,
                type: "DIGITAL",
              },
            ],
      };

      const response = await fetch(MASTERFY_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${MASTERFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

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
