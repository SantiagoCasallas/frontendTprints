import React, { useState } from 'react';

const DesignWorkshop = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSelectInspiration = (design) => {
    setSelectedDesign(design);
    setUploadedImage(null);
    setPreviewUrl(design.image);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(file);
      setPreviewUrl(url);
      setSelectedDesign(null);
    }
  };

  const clearWorkbench = () => {
    setSelectedDesign(null);
    setUploadedImage(null);
    if (previewUrl && !selectedDesign) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const applyDesign = () => {
    if (previewUrl) {
      console.log('Aplicar diseño a la prenda base:', previewUrl);
      alert('¡Diseño aplicado! Ahora puedes continuar con tu personalización.');
    } else {
      alert('Selecciona o sube un diseño primero.');
    }
  };

  const inspirationDesigns = [
    { id: 1, title: 'Abstracto fluido', image: 'https://picsum.photos/id/20/300/300', subtitle: 'Trazo libre' },
    { id: 2, title: 'Geométrico', image: 'https://picsum.photos/id/30/300/300', subtitle: 'Líneas y formas' },
    { id: 3, title: 'Naturaleza', image: 'https://picsum.photos/id/15/300/300', subtitle: 'Hojas y ramas' },
    { id: 4, title: 'Retro wave', image: 'https://picsum.photos/id/96/300/300', subtitle: 'Neón y gradientes' },
  ];

  return (
    <div className="workshop-studio min-h-screen bg-stone-50 dark:bg-stone-900 font-sans">
      {/* Encabezado */}
      <div className="border-b border-stone-200 dark:border-stone-700 bg-white/60 dark:bg-stone-800/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-800 dark:text-white flex items-center gap-2">
              <span className="text-4xl">🛠️</span> Taller de personalización
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              Crea, modifica y aplica tu diseño a la prenda base
            </p>
          </div>
          <button
            onClick={clearWorkbench}
            className="text-sm px-4 py-2 rounded-full border border-stone-300 dark:border-stone-600 bg-white/50 dark:bg-stone-800/50 hover:bg-white dark:hover:bg-stone-700 transition"
          >
            Limpiar mesa
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Área principal: mesa de trabajo */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Mockup de prenda */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-6 border border-stone-100 dark:border-stone-700">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-stone-400 ml-2">Mesa de trabajo · Espacio creativo</span>
            </div>

            <div className="relative bg-stone-100 dark:bg-stone-700 rounded-xl overflow-hidden aspect-[3/4] max-w-xs mx-auto shadow-inner">
              {previewUrl ? (
                <img src={previewUrl} alt="Diseño aplicado" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-stone-400 dark:text-stone-500">
                  <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Tu diseño aparecerá aquí</span>
                </div>
              )}
              <div className="absolute inset-0 pointer-events-none border-2 border-amber-300/40 rounded-xl"></div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-3 justify-center">
                <label className="cursor-pointer bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Subir mi diseño
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
                <button
                  onClick={applyDesign}
                  className="bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aplicar a la prenda
                </button>
              </div>
              {previewUrl && (
                <p className="text-xs text-center text-stone-500 dark:text-stone-400">
                  Listo para personalizar. Puedes seguir editando o aplicar.
                </p>
              )}
            </div>
          </div>

          {/* Pizarra de inspiración */}
          <div className="bg-white/80 dark:bg-stone-800/80 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-stone-100 dark:border-stone-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💡</span>
              <h3 className="font-bold text-stone-800 dark:text-white">Pizarra de inspiración</h3>
              <span className="text-xs text-stone-400 ml-auto">Toma ideas o parte de un ejemplo</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {inspirationDesigns.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectInspiration(item)}
                  className={`group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedDesign?.id === item.id
                      ? 'border-amber-500 shadow-md'
                      : 'border-transparent hover:border-amber-300'
                  }`}
                >
                  <img src={item.image} alt={item.title} className="w-full h-28 object-cover group-hover:scale-105 transition" />
                  <div className="p-2 bg-white dark:bg-stone-700 text-center">
                    <p className="text-xs font-medium text-stone-700 dark:text-stone-200">{item.title}</p>
                    <p className="text-[10px] text-stone-400">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-4 text-center">
              Haz clic en una imagen para usarla como base. Luego modifícala o súbela.
            </p>
          </div>
        </div>

        {/* Herramientas extra */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-stone-200 dark:border-stone-700 pt-8">
          <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300 text-sm">
            <span className="text-xl">✂️</span> Recorta / ajusta
          </div>
          <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300 text-sm">
            <span className="text-xl">🎨</span> Cambia colores
          </div>
          <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300 text-sm">
            <span className="text-xl">🖌️</span> Añade texto
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-stone-400">
          <p>Taller abierto · Puedes traer tu propio diseño o crear desde cero.</p>
        </div>
      </div>
    </div>
  );
};

export default DesignWorkshop;