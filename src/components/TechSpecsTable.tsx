import React, { useState } from 'react';
import { TECHNICAL_SPECS } from '../data/productData';
import { Sliders, Search, CheckCircle } from 'lucide-react';

export const TechSpecsTable: React.FC = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...TECHNICAL_SPECS.map(s => s.category)];

  const filteredSpecs = TECHNICAL_SPECS.map(spec => {
    const matchesCategory = activeCategory === 'all' || spec.category === activeCategory;
    if (!matchesCategory) return null;

    const filteredItems = spec.items.filter(item =>
      item.label.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.value.toLowerCase().includes(filterQuery.toLowerCase())
    );

    if (filteredItems.length === 0) return null;

    return {
      ...spec,
      items: filteredItems
    };
  }).filter(Boolean);

  return (
    <section id="ficha-tecnica" className="py-16 sm:py-24 border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-widest">
              <Sliders className="w-4 h-4" />
              <span>Especificações Completas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Ficha Técnica Detalhada do Produto
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              Todas as especificações originais da fábrica e do distribuidor Vila dos Brinquedos.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar nas especificações..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Category Tabs (interactive controls, allowed by design constitution) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat === 'all' ? 'Todas as Categorias' : cat}
            </button>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSpecs.map((category) => {
            if (!category) return null;
            return (
              <div
                key={category.category}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6"
              >
                <h3 className="text-base font-bold text-white mb-4 pb-3 border-b border-neutral-800 flex items-center justify-between">
                  <span>{category.category}</span>
                  <span className="text-[11px] text-neutral-500 font-normal">
                    {category.items.length} itens
                  </span>
                </h3>

                <dl className="divide-y divide-neutral-800/60 text-xs">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 ${
                        item.highlight ? 'bg-red-950/20 -mx-3 px-3 rounded-lg' : ''
                      }`}
                    >
                      <dt className="text-neutral-400 font-medium">
                        {item.label}
                      </dt>
                      <dd className="font-semibold text-neutral-100 sm:text-right flex items-center sm:justify-end gap-1.5">
                        {item.highlight && (
                          <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0 inline" />
                        )}
                        <span>{item.value}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
