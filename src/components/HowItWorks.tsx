import React from 'react';
import { Battery, Droplet, Power, Gauge } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Carregue a Bateria via USB',
      description: 'Conecte a bateria de lítio no cabo USB incluso. Uma carga de cerca de 60 minutos garante até 45 minutos de corridas e manobras radicais.',
      icon: Battery,
      note: 'LED indicador apaga ao completar a carga'
    },
    {
      number: '02',
      title: 'Abasteça com Gotas de Água',
      description: 'Abra a tampa de silicone na traseira do veículo e adicione de 3 a 5 gotas de água com o dosador de precisão que acompanha a caixa.',
      icon: Droplet,
      note: 'Água pura comum da torneira ou filtrada'
    },
    {
      number: '03',
      title: 'Ligue o Carrinho e Controle',
      description: 'Acione a chave ON/OFF na parte inferior do chassi e ligue o controle remoto 2.4GHz. O pareamento digital é instantâneo e automático.',
      icon: Power,
      note: 'Sinal seguro sem interferência'
    },
    {
      number: '04',
      title: 'Acelere e Ative a Fumaça!',
      description: 'Use o gatilho para acelerar para frente ou ré, faça curvas fechadas de drift e pressione o botão especial para liberar o jato de fumaça iluminada.',
      icon: Gauge,
      note: 'Efeito espetacular com os LEDs acesos'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 sm:py-24 border-t border-neutral-800 bg-neutral-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-red-500 uppercase tracking-widest">
            Fácil e Seguro
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Como Funciona o Efeito Fumaça e a Pilotagem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Pronto para brincar em menos de 2 minutos. Veja o passo a passo simplificado:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-neutral-700 tracking-tighter tabular-nums">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {step.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
