import React from 'react';
import { ArrowRight } from 'lucide-react';
import smokeExhaustImg from '../assets/images/product_smoke_exhaust_close_1790984192578.jpg';

export const FeatureShowcase: React.FC = () => {
  return (
    <section id="recursos" className="py-16 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Tecnologia de Corrida com Efeitos Especiais que Impressionam Crianças e Adultos
          </h2>
          <p className="mt-3 text-base text-neutral-400">
            Muito mais que um carrinho comum: conheça os detalhes que tornam este modelo o mais desejado do mercado.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Fumaça de Vapor Real */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group">
            <div className="relative z-10 max-w-md">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                Inovação Patenteada
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Efeito Nitro com Fumaça de Vapor d'Água Real
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Esqueça cheiros químicos ou produtos perigosos. Basta adicionar algumas gotas de água comum com o conta-gotas incluso no reservatório traseiro. O sistema ultrassônico emite névoa de vapor gelado iluminado, criando a sensação autêntica de aceleração turbo e nitro.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                <span className="px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-neutral-700/80 text-emerald-400 font-medium">
                  100% Inofensivo e Sem Queimar
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-neutral-950/80 border border-neutral-700/80 text-blue-400 font-medium">
                  Iluminação LED no Escape
                </span>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2 lg:h-full overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
              <img
                src={smokeExhaustImg}
                alt="Detalhe do escapamento com vapor iluminado"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl lg:rounded-none object-center"
              />
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent pointer-events-none" />
            </div>

            {/* CTA Button below image redirecting to the offer above */}
            <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800/80 flex items-center">
              <a
                href="#comprar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-red-900/40 transition-all cursor-pointer"
              >
                <span>Aproveitar Oferta com Desconto</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Luzes LED Faróis e Traseira */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Visibilidade & Show Noturno
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Luzes LED Faróis & Escape Neon
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Equipado com faróis frontais super brilhantes e LEDs coloridos no escapamento que iluminam o vapor d'água ao acelerar, criando um efeito visual espetacular no escuro.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              Perfeito para brincadeiras noturnas e pistas iluminadas na sala.
            </div>
          </div>

          {/* Card 3: Controle 2.4GHz Anti-Interferência */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Multiplayer Sem Bloqueios
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Controle 2.4GHz sem Interferência
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Frequência digital de alta precisão com alcance de até 30 metros. Permite que dois ou mais carrinhos corram juntos ao mesmo tempo sem que um controle interfira no outro.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              Ideal para disputar corridas em família com nosso combo de 2 unidades.
            </div>
          </div>

          {/* Card 4: Drift & Pneus de Borracha */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                Manobras Radicais
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Drift Lateral & Giros de 360°
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Chassi aerodinâmico esportivo e pneus de borracha sintética aderente com desenho especial para fazer zerinhos, curvas fechadas e manobras em superfícies lisas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              Excelente resposta em pisos de cerâmica, porcelanato, madeira e asfalto plano.
            </div>
          </div>

          {/* Card 5: Bateria Li-ion Recarregável USB */}
          <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Economia & Praticidade
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Bateria de Lítio Recarregável
              </h3>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Nada de gastar rios de dinheiro comprando pilhas descartáveis toda semana. O carrinho já vem com bateria de lítio de 3.7V de longa duração e cabo carregador USB incluso.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              Recarga rápida em 60 minutos em qualquer carregador de celular ou computador.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

