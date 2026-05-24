import { NavLink, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { designs, getStatusBadgeClasses } from '../data/designs.js'
import BottomNav from '../components/BottomNav.jsx'
import Header1 from '../components/Header1.jsx'
import uploadIcon from "../assets/icons/upload.png";

export default function DesignsPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return designs
    return designs.filter((d) => (d.title + ' ' + d.subtitle).toLowerCase().includes(q))
  }, [query])

  return (
    <div
      className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 flex flex-col"
      style={{ filter: 'contrast(125%) brightness(105%) saturate(110%)' }}
    >
      <Header1 title="T-Prints" />

      <main className="flex-1 max-w-5xl mx-auto w-full p-4 space-y-6 pb-24">
        <section className="container-query">
          <div className="flex flex-col @[480px]:flex-row items-start @[480px]:items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/10 p-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-primary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-slate-900 dark:text-slate-100 text-base font-bold leading-tight">
                  Primero debes seleccionar una camisa
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
                  Para aplicar un diseño a tu pedido, elige una prenda base de nuestro catálogo.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/productos')}
              className="w-full @[480px]:w-auto flex min-w-[160px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors"
            >
              <span className="truncate">Ir a seleccionar camisa</span>
            </button>
          </div>
        </section>

        <div className="flex gap-2">
          <div className="relative flex-1">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Buscar diseños..."
              type="text"
            />
          </div>
          <button className="flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Diseños Disponibles</h2>
          <button className="text-primary text-sm font-semibold">Ver todos</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((d) => {
            const badge = getStatusBadgeClasses(d.statusTone)
            return (
              <div
                key={d.id}
                className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-6">
                  <img
                    alt={d.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    src={d.image}
                  />
                  <div className="absolute top-2 right-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${badge.wrapper} ${badge.text}`}
                    >
                      {d.status}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{d.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{d.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="py-10 text-center">
          <button className="flex items-center justify-center gap-2 mx-auto rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-6 py-8 w-full max-w-xs text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-all">
           <img src={uploadIcon} alt="Upload" className="w-8 h-8 " />
            <span className="font-semibold">Subir diseño personalizado</span>
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}