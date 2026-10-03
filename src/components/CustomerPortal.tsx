import React, { useState } from 'react';
import { CustomerOrder } from '../types/product';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  X, 
  AlertCircle,
  Sparkles,
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';

interface CustomerPortalProps {
  isOpen: boolean;
  onClose: () => void;
  order: CustomerOrder | null;
  onBackToShop: () => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  isOpen,
  onClose,
  order,
  onBackToShop,
}) => {
  const [copiedTracking, setCopiedTracking] = useState(false);

  if (!isOpen) return null;

  if (!order) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-center text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Aba de Clientes</h3>
          <p className="text-xs text-neutral-400 mb-5">
            Nenhum pedido recente foi encontrado neste dispositivo. Faça uma compra para acompanhar aqui em tempo real.
          </p>
          <button
            onClick={onBackToShop}
            className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer shadow-md shadow-red-900/40"
          >
            Ver Ofertas do Carrinho
          </button>
        </div>
      </div>
    );
  }

  const handleCopyTracking = () => {
    if (order.trackingCode) {
      navigator.clipboard?.writeText(order.trackingCode);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 3000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de acompanhar o meu pedido #${order.orderId} na Vila dos Brinquedos. Nome: ${order.customer.name}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        title="Clique fora para fechar"
      />

      {/* Main Card */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[92vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl text-white flex flex-col overflow-hidden z-10"
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-700 transition-colors cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar</span>
            </button>
            <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-500 border border-red-600/30 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  Aba de Clientes
                </h2>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Pedido Ativo
                </span>
              </div>
              <p className="text-[10px] text-neutral-400">
                Acompanhamento Oficial de Compra • Vila dos Brinquedos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar aba de clientes"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Main Delivery Alert: DISPATCH IN 5 BUSINESS DAYS */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-emerald-950/40 border-2 border-emerald-500/50 shadow-lg shadow-emerald-950/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <span className="text-emerald-400">ENVIO CONFIRMADO:</span>
                    <span>Será enviado em até 5 dias úteis</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700/40 whitespace-nowrap">
                    ⚡ Frete Grátis com Rastreio
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-300 mt-1 leading-relaxed">
                  Seu pacote está em processo de montagem e teste rigoroso do módulo de fumaça e controle 2.4GHz no nosso Centro de Distribuição. O envio aos Correios ocorrerá no prazo de <strong className="text-white">5 dias úteis</strong> com código rastreável.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Tracking Stepper */}
          <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                Linha do Tempo do Pedido #{order.orderId}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {order.createdAt}
              </span>
            </div>

            {/* Stepper Progress */}
            <div className="grid grid-cols-4 gap-1 sm:gap-2 pt-1 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center justify-center shadow-md shadow-emerald-500/30 mb-1">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <p className="text-[10px] font-bold text-emerald-400">PIX Pago</p>
                <p className="text-[9px] text-neutral-400 hidden sm:block">Aprovado</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-bold text-xs flex items-center justify-center mb-1 animate-pulse">
                  <Package className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-bold text-emerald-300">Em Separação</p>
                <p className="text-[9px] text-neutral-400 hidden sm:block">Em andamento</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700 font-bold text-xs flex items-center justify-center mb-1">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-medium text-neutral-300">Despacho</p>
                <p className="text-[9px] text-emerald-400 font-bold">Até 5 dias úteis</p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700 font-bold text-xs flex items-center justify-center mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <p className="text-[10px] font-medium text-neutral-400">Entrega</p>
                <p className="text-[9px] text-neutral-500 hidden sm:block">No endereço</p>
              </div>
            </div>

            {/* Tracking Code Copy Box */}
            <div className="mt-2 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <span className="text-[11px] text-neutral-400 shrink-0">Código de Rastreio:</span>
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400 tracking-wider truncate">
                  {order.trackingCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyTracking}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white shrink-0 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedTracking ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
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

          {/* Customer & Address Details (Side by side on tablets/desktops) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Customer Personal Info */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-neutral-800 pb-1.5">
                <User className="w-3.5 h-3.5 text-red-500" />
                <span>Dados do Cliente</span>
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Nome do Comprador:</span>
                  <span className="text-white font-medium">{order.customer.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">CPF Cadastrado:</span>
                  <span className="text-neutral-300 font-mono">{order.customer.cpf}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Telefone / WhatsApp:</span>
                  <span className="text-neutral-300 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" />
                    {order.customer.phone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">E-mail:</span>
                  <span className="text-neutral-300 truncate block">{order.customer.email}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-neutral-800 pb-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Endereço de Entrega</span>
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Logradouro & Número:</span>
                  <span className="text-white font-medium">
                    {order.customer.address}, Nº {order.customer.number}
                    {order.customer.complement ? ` (${order.customer.complement})` : ''}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Bairro:</span>
                  <span className="text-neutral-300">{order.customer.neighborhood}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">Cidade / UF:</span>
                  <span className="text-neutral-300">{order.customer.city} - {order.customer.state}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 block">CEP:</span>
                  <span className="text-emerald-400 font-mono font-semibold">{order.customer.zipCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-neutral-800 pb-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-red-500" />
              <span>Itens do Pedido ({order.items.reduce((acc, i) => acc + i.quantity, 0)})</span>
            </h4>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0 border border-neutral-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Quantidade: <strong className="text-white">{item.quantity}x</strong>
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs sm:text-sm font-black text-white tabular-nums">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-2 border-t border-neutral-800/80 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Frete Expresso Nacional:</span>
                <span className="text-emerald-400 font-semibold">GRÁTIS (R$ 0,00)</span>
              </div>
              <div className="flex justify-between text-neutral-400 text-[11px]">
                <span>Forma de Pagamento:</span>
                <span className="text-emerald-400 font-semibold">PIX Instantâneo</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-sm font-bold border-t border-neutral-800">
                <span className="text-white">Total Pago:</span>
                <span className="text-base sm:text-lg font-black text-emerald-400 tabular-nums">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <a
              href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
            >
              <span>Falar com Suporte no WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onBackToShop}
                className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
              >
                Voltar à Página Principal
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs border border-neutral-800 transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>

          <div className="text-center text-[10px] text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Compra Segura · Garantia de 90 dias com Troca Grátis · Vila dos Brinquedos</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
