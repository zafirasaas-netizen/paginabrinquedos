import React from 'react';
import { ShieldCheck, Truck, RotateCcw, CreditCard, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 text-xs">
      {/* Trust Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-neutral-850">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Frete Grátis Brasil</p>
              <p className="text-[11px] text-neutral-400">Envio expresso com rastreamento</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Garantia de 90 Dias</p>
              <p className="text-[11px] text-neutral-400">Total cobertura contra defeitos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-blue-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Devolução Grátis</p>
              <p className="text-[11px] text-neutral-400">30 dias corridos após recebimento</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">Compra 100% Segura</p>
              <p className="text-[11px] text-neutral-400">Criptografia SSL de ponta a ponta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <img
              src="https://i.imgur.com/ibc5f6o.png"
              alt="Logo Vila dos Brinquedos"
              className="w-10 h-10 object-contain shrink-0"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/logo.png';
              }}
            />
            <span>Vila dos Brinquedos</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Distribuidor oficial autorizado do Carrinho de Controle Remoto Homem-Aranha Drift Nitro. Qualidade certificada, suporte humanizado e atendimento dedicado.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Navegação Rápida</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Fotos</a></li>
            <li><a href="#recursos" className="hover:text-white transition-colors">Recursos Exclusivos</a></li>
            <li><a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona a Fumaça</a></li>
            <li><a href="#ficha-tecnica" className="hover:text-white transition-colors">Ficha Técnica Completa</a></li>
            <li><a href="#o-que-vem" className="hover:text-white transition-colors">Itens Inclusos na Caixa</a></li>
            <li><a href="#avaliacoes" className="hover:text-white transition-colors">Avaliações de Clientes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Atendimento & Suporte</h4>
          <ul className="space-y-2 text-xs">
            <li className="text-neutral-300">Segunda a Sexta: 08h às 18h</li>
            <li className="text-neutral-300">Sábado: 09h às 14h</li>
            <li>E-mail: contato@viladosbrinquedos.com.br</li>
            <li>Despacho Imediato pelo Centro de Distribuição SP</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-neutral-900 py-6 px-4 text-center text-neutral-500 text-[11px]">
        <p>© 2026 Vila dos Brinquedos. Todos os direitos reservados. CNPJ: 45.892.102/0001-44. São Paulo - SP.</p>
        <p className="mt-1">Imagens ilustrativas do produto homologado. Os personagens e marcas são propriedades de seus respectivos detentores.</p>
      </div>
    </footer>
  );
};
