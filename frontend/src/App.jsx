import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-[#e7e1d8] text-[#171717]">
      <header className="bg-[#f6f1ea] shadow-sm">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-[#d8d0c7]">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#f7c63e] text-[10px] font-black text-[#1f1f1f] leading-none">
              T
            </div>
            <div className="text-left text-[0.72rem] font-black uppercase leading-[1.1] tracking-[0.08em] text-[#1c1c1c]">
              Techno
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-3 md:flex">
            <div className="flex h-12 w-full max-w-[560px] items-center overflow-hidden rounded-md border border-[#d7d0c5] bg-white">
              <select className="h-full border-r border-[#d7d0c5] bg-transparent px-4 text-sm text-[#3f3f3f] outline-none">
                <option>Toutes les catégories</option>
              </select>
              <input
                type="text"
                placeholder="Rechercher un produit"
                className="h-full flex-1 border-0 bg-transparent px-4 text-sm text-[#2a2a2a] outline-none placeholder:text-[#7b7b7b]"
              />
            </div>
            <button className="rounded-md bg-[#ef3b2d] px-6 py-3 text-sm font-bold uppercase text-white shadow-sm hover:bg-[#d9311d]">
              Rechercher
            </button>
          </div>

          <div className="flex items-center gap-2 text-[0.7rem] font-medium text-[#2b2b2b]">
            <span className="hidden sm:inline">☎</span>
            <span>+213 550 07 07 08</span>
          </div>
        </div>

        <nav className="bg-[#1a1a1a] text-white">
          <div className="mx-auto flex max-w-[1400px] items-center gap-5 px-4 py-4 sm:px-6">
            <button className="flex items-center gap-3 rounded bg-[#ef3b2d] px-4 py-3 text-sm font-bold uppercase text-white">
              <span className="text-lg">☰</span>
              <span>Toutes les catégories</span>
            </button>
            <div className="flex items-center gap-6 text-sm font-medium text-white/90">
              <Link to="/" className="border-b-2 border-[#f6ce38] pb-1 text-white">Accueil</Link>
              <Link to="/produits" className="pb-1 hover:text-white">Tous les produits</Link>
              <Link to="/contact" className="pb-1 hover:text-white">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6">
        <Outlet />
      </main>

      <footer className="mt-8 bg-[#171715] text-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr_1.4fr]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#f3efe9] text-[0.7rem] font-black uppercase text-[#1b1b1b]">
              T
            </div>
            <div className="text-sm text-[#f2f2f2] leading-5">
                TechnoStore, accessoires tech et bureautique connectés pour le quotidien en Algérie.
            </div>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#f5d14d]">Navigation</div>
            <Link to="/">Accueil</Link>
            <Link to="/produits">Tous les produits</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="grid gap-2 text-sm text-white/80">
            <div className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[#f5d14d]">Nous contacter</div>
            <div>Cité les Mandarines lot N 280, Pins Maritimes, Alger</div>
              <div>contact@technostore.dz</div>
            <div>+213 550 07 07 08</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
