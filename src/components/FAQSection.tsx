import React, { useState } from 'react';
import { FAQS } from '../data/productData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-neutral-800 bg-neutral-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Respostas transparentes para as dúvidas mais comuns dos nossos clientes.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-850 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850">
                    <p>{faq.answer}</p>
                    <span className="inline-block mt-3 text-[11px] font-medium text-red-400">
                      Categoria: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
