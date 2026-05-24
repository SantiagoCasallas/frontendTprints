import React from 'react';
import { designs, getStatusBadgeClasses } from '../../data/designs';

const DesignCatalog = () => {
  const handleSelectDesign = (design) => {
    console.log('Diseño seleccionado para la prenda:', design);
  };

  const featuredDesign = designs[0];
  const remainingDesigns = designs.slice(1);

  return (
    <div className="magazine-catalog max-w-7xl mx-auto px-4 py-8 bg-stone-50 dark:bg-stone-900 font-sans">
      {/* Encabezado estilo revista */}
      <div className="border-b border-stone-200 dark:border-stone-700 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-800 dark:text-stone-100">
            Catálogo de <br />
            <span className="italic font-serif text-3xl md:text-4xl text-amber-600 dark:text-amber-500">
              prendas personalizables
            </span>
          </h1>
          <div className="w-20 h-0.5 bg-amber-500 mt-3 mb-4"></div>
          <p className="text-stone-500 dark:text-stone-400 text-sm uppercase tracking-wider">
            Colección Otoño / Invierno
          </p>
        </div>
        <div className="hidden md:block text-right text-xs text-stone-400">
          Nº 24 · Inspiración & Diseño
        </div>
      </div>

      {/* Sección destacada */}
      {featuredDesign && (
        <div className="grid md:grid-cols-2 gap-8 mb-16 bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={featuredDesign.image}
              alt={featuredDesign.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs font-semibold uppercase tracking-wider rounded-full w-fit mb-4">
              Destacado del mes
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-white mb-2">
              {featuredDesign.title}
            </h2>
            <p className="text-stone-500 dark:text-stone-300 text-sm italic mb-4">
              {featuredDesign.subtitle}
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className={`status-badge px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClasses(featuredDesign.statusTone).wrapper}`}>
                <span className={getStatusBadgeClasses(featuredDesign.statusTone).text}>
                  {featuredDesign.status}
                </span>
              </div>
              <span className="text-xs text-stone-400">Disponible en 3 variantes</span>
            </div>
            <button
              onClick={() => handleSelectDesign(featuredDesign)}
              className="self-start bg-stone-800 dark:bg-white text-white dark:text-stone-800 px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-700 dark:hover:bg-amber-200 transition flex items-center gap-2"
            >
              Seleccionar este diseño
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <p className="text-xs text-stone-400 mt-4">
              * Aplicable sobre cualquier prenda base del catálogo.
            </p>
          </div>
        </div>
      )}

      {/* Parrilla de revista */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-stone-700 dark:text-stone-200">
            Más diseños inspiradores
          </h3>
          <span className="text-xs text-stone-400 uppercase tracking-wider">
            {remainingDesigns.length} piezas
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {remainingDesigns.map((design, idx) => {
            const { wrapper, text } = getStatusBadgeClasses(design.statusTone);
            const imageHeight = idx % 3 === 0 ? 'h-72' : 'h-56';

            return (
              <div
                key={design.id}
                className="group bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className={`relative overflow-hidden ${imageHeight}`}>
                  <img
                    src={design.image}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-stone-700 dark:text-stone-200">
                      {idx % 2 === 0 ? 'NUEVO' : 'EDITOR\'S PICK'}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-stone-800 dark:text-white mb-1">
                    {design.title}
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-300 mb-3">
                    {design.subtitle}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className={`status-badge px-2 py-0.5 rounded-full text-xs font-medium ${wrapper}`}>
                      <span className={text}>{design.status}</span>
                    </div>
                    <button
                      onClick={() => handleSelectDesign(design)}
                      className="text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      Personalizar
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón de navegación */}
      <div className="text-center py-10 border-t border-stone-200 dark:border-stone-700 mt-8">
        <p className="text-stone-500 text-sm mb-4">
          ¿Ya elegiste tu diseño? Ahora selecciona la prenda base perfecta.
        </p>
        <button className="inline-flex items-center gap-2 bg-transparent border-2 border-stone-700 dark:border-stone-300 text-stone-700 dark:text-stone-300 px-8 py-3 rounded-full text-sm font-semibold hover:bg-stone-800 hover:text-white dark:hover:bg-white dark:hover:text-stone-800 transition duration-300">
          Ir al catálogo de prendas
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DesignCatalog;