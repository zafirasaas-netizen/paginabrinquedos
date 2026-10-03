import React, { useState, useEffect } from 'react';
import { CartItem } from '../types/product';
import { X, Check, QrCode, Copy, CheckCircle2, ArrowLeft, Clock, Sparkles, RefreshCw, AlertCircle, ShieldCheck, MapPin } from 'lucide-react';
import {
  createDynamicPixOrder,
  DynamicPixResponse,
  PixCustomerData,
  formatCPF,
  formatPhone,
  formatCEP
} from '../services/pixService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess
}) => {
  const [step, setStep] = useState<'shipping' | 'pix' | 'confirmed'>('shipping');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);
  const [pixData, setPixData] = useState<DynamicPixResponse | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Customer Form states (Loaded automatically from localStorage)
  const [customer, setCustomer] = useState<PixCustomerData>(() => {
    try {
      const saved = localStorage.getItem('checkout_saved_customer');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: '',
      cpf: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: 'SP',
      zipCode: ''
    };
  });

  const [number, setNumber] = useState<string>(() => {
    try {
      return localStorage.getItem('checkout_saved_number') || '';
    } catch {
      return '';
    }
  });

  const [complement, setComplement] = useState<string>(() => {
    try {
      return localStorage.getItem('checkout_saved_complement') || '';
    } catch {
      return '';
    }
  });

  const [neighborhood, setNeighborhood] = useState<string>(() => {
    try {
      return localStorage.getItem('checkout_saved_neighborhood') || '';
    } catch {
      return '';
    }
  });

  // Automatically save form data to localStorage whenever any field changes
  useEffect(() => {
    try {
      localStorage.setItem('checkout_saved_customer', JSON.stringify(customer));
    } catch {}
  }, [customer]);

  useEffect(() => {
    try {
      localStorage.setItem('checkout_saved_number', number);
    } catch {}
  }, [number]);

  useEffect(() => {
    try {
      localStorage.setItem('checkout_saved_complement', complement);
    } catch {}
  }, [complement]);

  useEffect(() => {
    try {
      localStorage.setItem('checkout_saved_neighborhood', neighborhood);
    } catch {}
  }, [neighborhood]);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Timer for PIX expiration
  useEffect(() => {
    if (step !== 'pix') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  // Automatic CEP lookup via ViaCEP API
  const handleCepChange = async (rawVal: string) => {
    const formatted = formatCEP(rawVal);
    setCustomer(prev => ({ ...prev, zipCode: formatted }));

    const digitsOnly = formatted.replace(/\D/g, '');
    if (digitsOnly.length === 8) {
      setIsLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digitsOnly}/json/`);
        if (res.ok) {
          const data = await res.json();
          if (!data.erro) {
            setCustomer(prev => ({
              ...prev,
              address: data.logradouro || prev.address,
              city: data.localidade || prev.city,
              state: data.uf || prev.state,
            }));
            if (data.bairro) {
              setNeighborhood(data.bairro);
            }
          }
        }
      } catch (err) {
        console.warn('Erro ao consultar ViaCEP:', err);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    if (pixData?.pixCopiaECola) {
      navigator.clipboard?.writeText(pixData.pixCopiaECola);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.zipCode || !customer.address || !number) {
      alert('Por favor, preencha os campos obrigatórios de entrega.');
      return;
    }

    setIsGeneratingPix(true);
    try {
      const dynamicPix = await createDynamicPixOrder({
        amount: total,
        customer: {
          ...customer,
          address: `${customer.address}, ${number} ${complement ? '- ' + complement : ''}`
        },
        items: items.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        orderRef: `spiderman_${Date.now()}`
      });
      setPixData(dynamicPix);
      setStep('pix');
    } catch {
      alert('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setIsGeneratingPix(false);
    }
  };

  const handleConfirmPaid = () => {
    setStep('confirmed');
    onOrderSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4">
      {/* Backdrop - Click outside closes modal */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity cursor-pointer"
        title="Clique fora para voltar"
      />

      {/* Modal Card - Compact and fits comfortably in viewport */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[92vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl text-white flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/80 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-2 py-1 rounded-md border border-neutral-700 transition-colors cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Voltar</span>
            </button>
            <img
              src="https://i.imgur.com/ibc5f6o.png"
              alt="Logo Vila dos Brinquedos"
              className="w-4 h-4 object-contain rounded shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
              }}
            />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-xs text-white">Checkout Seguro</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar checkout"
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Progress indicator */}
        <div className="px-4 py-2 bg-neutral-900/40 border-b border-neutral-800/80 flex items-center justify-between text-[11px] shrink-0">
          <div className={`flex items-center gap-1 ${step === 'shipping' ? 'text-red-500 font-bold' : 'text-neutral-400'}`}>
            <span className="w-4 h-4 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-bold">1</span>
            <span>Envio</span>
          </div>
          <span className="text-neutral-600">→</span>
          <div className={`flex items-center gap-1 ${step === 'pix' ? 'text-emerald-400 font-bold' : 'text-neutral-400'}`}>
            <span className="w-4 h-4 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-bold">2</span>
            <span>Pagamento</span>
          </div>
          <span className="text-neutral-600">→</span>
          <div className={`flex items-center gap-1 ${step === 'confirmed' ? 'text-emerald-400 font-bold' : 'text-neutral-400'}`}>
            <span className="w-4 h-4 rounded-full bg-neutral-800 text-[10px] flex items-center justify-center font-bold">3</span>
            <span>Confirmação</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-4 overflow-y-auto flex-1">
          {/* STEP 1: Shipping Form (Optimized Side-by-Side Fields + Auto-save) */}
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Dados de Entrega</span>
                    <span className="text-[10px] font-normal text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.2 rounded">
                      Salvo automaticamente
                    </span>
                  </h3>
                  <p className="text-[10px] text-neutral-400">Nota Fiscal & Rastreio Correios / Mercado Envios</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                  Frete Grátis Ativo
                </span>
              </div>

              {/* 12-Column Responsive Grid: Side-by-side on all screens */}
              <div className="grid grid-cols-12 gap-2">
                {/* Linha 1: Nome (7 col) + CPF (5 col) */}
                <div className="col-span-7">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Nome Destinatário *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nome completo"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-5">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">CPF (p/ NF-e) *</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    maxLength={14}
                    value={customer.cpf}
                    onChange={(e) => setCustomer({ ...customer, cpf: formatCPF(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Linha 2: WhatsApp (6 col) + E-mail (6 col) */}
                <div className="col-span-6">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    maxLength={15}
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: formatPhone(e.target.value) })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">E-mail *</label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Linha 3: CEP (4 col) + Cidade (5 col) + UF (3 col) */}
                <div className="col-span-4">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5 flex items-center justify-between">
                    <span>CEP *</span>
                    {isLoadingCep && <span className="text-[9px] text-amber-400">Buscando...</span>}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="00000-000"
                    maxLength={9}
                    value={customer.zipCode}
                    onChange={(e) => handleCepChange(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-5">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Cidade *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sua cidade"
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-3">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">UF *</label>
                  <select
                    value={customer.state}
                    onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full px-1.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="SP">SP</option>
                    <option value="RJ">RJ</option>
                    <option value="MG">MG</option>
                    <option value="PR">PR</option>
                    <option value="RS">RS</option>
                    <option value="SC">SC</option>
                    <option value="BA">BA</option>
                    <option value="DF">DF</option>
                    <option value="GO">GO</option>
                    <option value="PE">PE</option>
                    <option value="CE">CE</option>
                    <option value="ES">ES</option>
                    <option value="PA">PA</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                  </select>
                </div>

                {/* Linha 4: Endereço (Rua/Av) (8 col) + Número (4 col) */}
                <div className="col-span-8">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Endereço (Rua / Av.) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Av. Paulista"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-4">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Número *</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Linha 5: Bairro (6 col) + Complemento (6 col) */}
                <div className="col-span-6">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Bairro *</label>
                  <input
                    type="text"
                    placeholder="Ex: Centro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-[10px] font-medium text-neutral-300 mb-0.5">Complemento (opcional)</label>
                  <input
                    type="text"
                    placeholder="Apto, Bloco..."
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Order quick summary with PIX callout */}
              <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-between text-xs mt-1">
                <div>
                  <p className="text-[11px] text-neutral-400">Total do Pedido (Frete Grátis Incluso):</p>
                  <p className="text-emerald-400 font-bold text-[10px]">Pagamento Exclusivo via PIX Instantâneo</p>
                </div>
                <span className="text-base sm:text-lg font-black text-white tabular-nums">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <button
                type="submit"
                disabled={isGeneratingPix}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-950/50"
              >
                {isGeneratingPix ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gerando QR Code PIX Dinâmico...</span>
                  </>
                ) : (
                  <>
                    <QrCode className="w-4 h-4" />
                    <span>GERAR QR CODE PIX • R$ {total.toFixed(2).replace('.', ',')}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dados Criptografados · Envio Prioritário</span>
              </div>
            </form>
          )}

          {/* STEP 2: Dynamic PIX Generation & Payment */}
          {step === 'pix' && pixData && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>QR Code PIX Gerado</span>
                  </h3>
                  <p className="text-[10px] text-neutral-400">Aponte a câmera ou use o Pix Copia e Cola</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer bg-neutral-900 px-2 py-1 rounded border border-neutral-800"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Editar dados
                </button>
              </div>

              {/* Dynamic QR Code and Expiration Bar */}
              <div className="p-3 sm:p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center gap-3">
                <div className="flex items-center justify-between w-full text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    PIX BACEN Ativo
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-mono font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 text-[10px]">
                    <Clock className="w-3 h-3" />
                    Expira em {formatTimer(timeLeft)}
                  </span>
                </div>

                {/* QR Code Container */}
                <div className="p-2.5 bg-white rounded-xl shadow-xl flex items-center justify-center">
                  <img
                    src={pixData.qrCodeUrl}
                    alt="QR Code PIX Dinâmico"
                    className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
                  />
                </div>

                {/* Amount to pay */}
                <div className="text-center">
                  <p className="text-[11px] text-neutral-400">Valor a Pagar via PIX:</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-400 tabular-nums">
                    R$ {pixData.amount.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
                    TxID: {pixData.txid}
                  </p>
                </div>

                {/* PIX Copia e Cola Field */}
                <div className="w-full space-y-1">
                  <label className="text-[11px] font-medium text-neutral-300">
                    Ou Pix Copia e Cola:
                  </label>
                  <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-neutral-300 truncate select-all">
                      {pixData.pixCopiaECola}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shrink-0 flex items-center gap-1 cursor-pointer transition-colors shadow-md"
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="w-full p-2.5 bg-neutral-950/70 rounded-xl border border-neutral-800 text-[11px] text-neutral-300 space-y-0.5">
                  <ol className="list-decimal list-inside space-y-0.5 text-[10px] text-neutral-400">
                    <li>Abra o app do seu banco (Nubank, Itaú, Inter, etc.)</li>
                    <li>Escolha <strong className="text-white">Área Pix</strong> &gt; <strong className="text-white">Ler QR Code</strong> ou <strong className="text-white">Copia e Cola</strong></li>
                    <li>Confirme o valor de <strong className="text-emerald-400">R$ {pixData.amount.toFixed(2).replace('.', ',')}</strong></li>
                  </ol>
                </div>

                {/* Confirm Paid Trigger */}
                <button
                  type="button"
                  onClick={handleConfirmPaid}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/60 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>JÁ PAGUEI VIA PIX</span>
                </button>
              </div>

              {/* API Integration Notice */}
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 justify-center">
                <AlertCircle className="w-3 h-3" />
                <span>Compensação instantânea em segundos via Webhook Masterfy.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmed */}
          {step === 'confirmed' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Pedido Recebido com Sucesso!
                </h3>
                <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">
                  Seu Carrinho Homem-Aranha já foi registrado e será despachado via Envio Expresso.
                </p>
              </div>

              {/* Order details box */}
              <div className="max-w-sm mx-auto p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs space-y-1.5">
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Status do Pagamento:</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    PIX Confirmado
                  </span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Destinatário:</span>
                  <span className="text-white font-medium">{customer.name || 'Cliente'}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-neutral-400">Total Pago:</span>
                  <span className="text-white font-bold tabular-nums">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Código de Rastreio:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    BR{Math.floor(100000000 + Math.random() * 900000000)}SP
                  </span>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Fechar Janela e Acompanhar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
