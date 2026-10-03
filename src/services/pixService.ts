/**
 * PIX Dynamic Payment Service
 * Integrates directly with Masterfy Pagamentos API (/api/pix/create)
 * Conforms to Central Bank of Brazil (BACEN) EMVCo BR Code standard.
 */

export interface PixCustomerData {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface DynamicPixResponse {
  id?: string;
  txid: string;
  pixCopiaECola: string;
  qrCodeUrl: string;
  amount: number;
  expiresAt: Date;
  status: 'PENDING' | 'PAID' | 'EXPIRED';
}

// CRC16-CCITT calculation for BACEN EMV standard
function crc16(buffer: string): string {
  let crc = 0xffff;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function formatEmvField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

/**
 * Generates a compliant dynamic EMV BACEN PIX Copia e Cola payload (Local Fallback)
 */
export function generatePixPayload({
  key = 'pix@viladosbrinquedos.com.br',
  name = 'VILA DOS BRINQUEDOS',
  city = 'SAO PAULO',
  amount,
  txid
}: {
  key?: string;
  name?: string;
  city?: string;
  amount: number;
  txid: string;
}): string {
  const cleanKey = key.trim();
  const cleanName = name.slice(0, 25).trim().toUpperCase();
  const cleanCity = city.slice(0, 15).trim().toUpperCase();
  const formattedAmount = amount.toFixed(2);
  const cleanTxid = (txid || '***').slice(0, 25);

  const merchantAccountInfo =
    formatEmvField('00', 'BR.GOV.BCB.PIX') +
    formatEmvField('01', cleanKey);

  const additionalData = formatEmvField('05', cleanTxid);

  const rawPayload =
    formatEmvField('00', '01') +
    formatEmvField('01', '12') +
    formatEmvField('26', merchantAccountInfo) +
    formatEmvField('52', '0000') +
    formatEmvField('53', '986') +
    formatEmvField('54', formattedAmount) +
    formatEmvField('58', 'BR') +
    formatEmvField('59', cleanName) +
    formatEmvField('60', cleanCity) +
    formatEmvField('62', additionalData) +
    '6304';

  const checksum = crc16(rawPayload);
  return rawPayload + checksum;
}

/**
 * Creates a Dynamic PIX Order via Masterfy Pagamentos API
 */
export async function createDynamicPixOrder({
  amount,
  customer,
  orderRef,
  items
}: {
  amount: number;
  customer?: Partial<PixCustomerData>;
  orderRef?: string;
  items?: any[];
}): Promise<DynamicPixResponse> {
  // 1. Try local Express proxy /api/pix/create
  try {
    const res = await fetch('/api/pix/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        customer,
        orderRef,
        items,
        description: 'Carrinho Homem-Aranha Drift Nitro'
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.pixCopiaECola) {
        return {
          id: data.id,
          txid: data.txid || data.id,
          pixCopiaECola: data.pixCopiaECola,
          qrCodeUrl: data.qrCodeUrl,
          amount: data.amount || amount,
          expiresAt: new Date(data.expiresAt || Date.now() + 15 * 60 * 1000),
          status: 'PENDING'
        };
      }
    }
  } catch (err) {
    console.warn('Falha na chamada /api/pix/create, tentando conexão direta com Masterfy:', err);
  }

  // 2. Direct Masterfy API call fallback (Supports static hostings like Netlify)
  try {
    const amountInCents = Math.round(amount * 100);
    let cleanTaxId = (customer?.cpf || '').replace(/\D/g, '');
    if (cleanTaxId.length !== 11) {
      cleanTaxId = "52998224725";
    }

    const directRes = await fetch("https://api.masterfypagamentos.com/v1/payment", {
      method: "POST",
      headers: {
        Authorization: "Bearer b7YlmPnibb-uLZweSkkouFkw2vHa5CvTrK2UtHgFUxo",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: "BRL",
        method: "PIX",
        description: "Carrinho Homem-Aranha Drift Nitro",
        externalRef: orderRef || `spid_${Date.now()}`,
        notificationUrl: "https://example.com/webhook/payment",
        payer: {
          name: customer?.name || "Cliente",
          taxId: cleanTaxId,
          email: customer?.email || "cliente@viladosbrinquedos.com.br",
          phone: (customer?.phone || '').replace(/\D/g, '') || "11999999999",
        },
        items: [
          {
            quantity: 1,
            name: "Carrinho Homem-Aranha Drift Nitro",
            price: amountInCents,
            type: "DIGITAL"
          }
        ]
      }),
    });

    if (directRes.ok) {
      const directData = await directRes.json();
      const copypaste = directData.data?.copypaste;
      if (copypaste) {
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
          copypaste
        )}&margin=10&color=000000&bgcolor=FFFFFF`;

        return {
          id: directData.id,
          txid: directData.id || orderRef || `VB${Date.now()}`,
          pixCopiaECola: copypaste,
          qrCodeUrl,
          amount,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          status: directData.status || 'PENDING'
        };
      }
    }
  } catch (directErr) {
    console.warn('Falha na chamada direta à Masterfy, usando gerador dinâmico local:', directErr);
  }

  // 3. Fallback to local dynamic BACEN PIX generator
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const txid = `VB${timestamp}${randomSuffix}`;

  const pixCopiaECola = generatePixPayload({
    amount,
    txid,
    name: 'VILA DOS BRINQUEDOS',
    city: 'SAO PAULO'
  });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
    pixCopiaECola
  )}&margin=10&color=000000&bgcolor=FFFFFF`;

  return {
    txid,
    pixCopiaECola,
    qrCodeUrl,
    amount,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    status: 'PENDING'
  };
}

/**
 * Checks payment status on Masterfy
 */
export async function checkPixPaymentStatus(id: string): Promise<string> {
  try {
    const res = await fetch(`/api/pix/status/${id}`);
    if (res.ok) {
      const data = await res.json();
      return data.status || 'PENDING';
    }
  } catch {}

  try {
    const res = await fetch(`https://api.masterfypagamentos.com/v1/payment/${id}`, {
      headers: {
        Authorization: "Bearer b7YlmPnibb-uLZweSkkouFkw2vHa5CvTrK2UtHgFUxo",
      },
    });
    if (res.ok) {
      const data = await res.json();
      return data.status || 'PENDING';
    }
  } catch {}

  return 'PENDING';
}

// Helpers for input masks and Brazilian tax ID formatting
export function formatCPF(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 3) return clean;
  if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
  if (clean.length <= 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
}

export function formatPhone(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 2) return clean;
  if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
  if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
}

export function formatCEP(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 8);
  if (clean.length <= 5) return clean;
  return `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
}
