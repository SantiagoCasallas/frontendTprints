import React, { useState } from 'react';
import { designs, getStatusBadgeClasses } from '../../data/designs';

const DesignsGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (design) => {
    setSelectedImage(design);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-museum min-h-screen bg-stone-50 dark:bg-stone-900 font-sans">
      {/* Encabezado estilo museo */}
      <div className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 dark:text-stone-100">
                Galería de <span className="font-serif italic">diseños</span>
              </h1>
              <div className="w-16 h-px bg-amber-500 mt-2 mb-3"></div>
              <p className="text-stone-500 dark:text-stone-400 text-sm max-w-xl">
                Exposición permanente · Piezas únicas para personalizar tu prenda
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-right text-xs text-stone-400">
              <span>✦ {designs.length} obras en exhibición</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pared de la galería (grid tipo museo con espaciado amplio) */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-14">
          {designs.map((design, idx) => {
            const { wrapper, text } = getStatusBadgeClasses(design.statusTone);
            // Alternancia de orientación simulando cuadros colgados a diferentes alturas
            const marginTopClass = idx % 3 === 0 ? 'mt-0' : idx % 3 === 1 ? 'mt-6' : 'mt-12';

            return (
              <div
                key={design.id}
                className={`group relative ${marginTopClass} cursor-pointer`}
                onClick={() => openLightbox(design)}
              >
                {/* Marco tipo galería */}
                <div className="relative bg-white dark:bg-stone-800 p-3 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]">
                  {/* Passe-partout (margen interno) */}
                  <div className="relative overflow-hidden bg-stone-100 dark:bg-stone-700">
                    <img
                      src={design.image}
                      alt={design.title}
                      className="w-full aspect-[4/3] object-cover transition duration-700 group-hover:opacity-90"
                    />
                    {/* Luz de galería simulada (efecto spotlight) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>

                  {/* Etiqueta de pared (wall label) */}
                  <div className="mt-3 px-1">
                    <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                      {design.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {design.subtitle}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${wrapper}`}>
                        <span className={text}>{design.status}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Ref. {design.id}</span>
                    </div>
                  </div>
                </div>

                {/* Pequeña chincheta o clavo decorativo (efecto visual) */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-amber-600/50 shadow-md"></div>
              </div>
            );
          })}
        </div>

        {/* Texto de sala al pie */}
        <div className="mt-20 text-center border-t border-stone-200 dark:border-stone-700 pt-8">
          <p className="text-xs text-stone-400 uppercase tracking-wider">
            Toque una obra para verla de cerca · Todos los diseños son personalizables
          </p>
          <button className="mt-6 inline-flex items-center gap-2 bg-stone-800 dark:bg-stone-700 text-white px-6 py-2 rounded-full text-sm hover:bg-amber-700 transition">
            <span>Explorar galería completa</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox (vista ampliada al hacer clic en una obra) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition z-10"
              onClick={closeLightbox}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-stone-900"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-stone-800 dark:text-white">
                {selectedImage.title}
              </h2>
              <p className="text-stone-500 dark:text-stone-300 text-sm mt-1">
                {selectedImage.subtitle}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className={`status-badge px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(selectedImage.statusTone).wrapper}`}>
                  <span className={getStatusBadgeClasses(selectedImage.statusTone).text}>
                    {selectedImage.status}
                  </span>
                </div>
                <button
                  className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm hover:bg-amber-700 transition"
                  onClick={() => console.log('Seleccionar diseño para prenda:', selectedImage)}
                >
                  Usar este diseño
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignsGallery;