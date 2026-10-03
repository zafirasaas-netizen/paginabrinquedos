import React from 'react';
import { UNBOXING_ITEMS } from '../data/productData';
import { Package, Check } from 'lucide-react';
import kitImg from '../assets/images/product_controller_and_kit_1790984201676.jpg';

export const UnboxingSection: React.FC = () => {
  return (
    <section id="o-que-vem" className="py-16 sm:py-24 border-t border-neutral-800 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Kit Photography */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src={kitImg}
                alt="Kit Completo com carrinho do Homem-Aranha, controle remoto, bateria e acessórios"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 text-xs font-semibold text-white">
                <span>Embalagem Especial para Presente</span>
              </div>
            </div>
          </div>

          {/* Right: Itemized Unboxing Checklist */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
                <Package className="w-4 h-4" />
                <span>Unboxing Oficial</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2 text-balance">
                Tudo o que Você Recebe em Casa Pronto para Usar
              </h2>
              <p className="mt-2 text-sm text-neutral-400">
                Sem surpresas ou peças faltando. O kit chega 100% completo com todos os acessórios originais testados e higienizados.
              </p>
            </div>

            <div className="space-y-3">
              {UNBOXING_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    item.highlight
                      ? 'bg-neutral-900/90 border-neutral-700/80'
                      : 'bg-neutral-900/40 border-neutral-800/60'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-semibold text-red-300">Pronto para Presentear:</span>
                <span className="text-neutral-300 ml-1">Ideal para aniversários, Dia das Crianças e Natal.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnboxingSection;
