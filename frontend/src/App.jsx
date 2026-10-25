import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import technoLogo from './assets/techno-logo.png'
import homeContent from './config/homeContent'

function App() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111]">
      <header className="sticky top-0 z-50 shadow-sm">
        <div className="bg-gradient-to-r from-[#111111] to-[#3A3A3A] text-[#E8E8E8]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-[13px] sm:px-6 lg:px-10">
            <span>Fabriqué en Algérie · qualité Techno Stationery</span>
            <span>+213 550 07 07 08</span>
          </div>
        </div>

        <div className="bg-white">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-10">
            <Link to="/" className="shrink-0">
              <img src={technoLogo} alt="Techno Stationery" className="h-14 w-auto object-contain" />
            </Link>

            <form
              role="search"
              onSubmit={(event) => {
                event.preventDefault()
                const query = new FormData(event.currentTarget).get('q')?.toString().trim()
                const params = new URLSearchParams()
                if (query) params.set('q', query)
                const queryString = params.toString()
                navigate(`/produits${queryString ? `?${queryString}` : ''}`)
              }}
              className="hidden min-w-0 flex-1 items-center justify-center gap-3 md:flex"
            >
              <div className="flex h-[46px] w-full max-w-[760px] items-center overflow-hidden rounded-[10px] border border-[#E6E1D8] bg-white">
                <input
                  name="q"
                  type="text"
                  aria-label="Rechercher un produit"
                  placeholder="Rechercher un produit"
                  className="h-full min-w-0 flex-1 border-0 bg-transparent px-4 text-sm text-[#111111] outline-none placeholder:text-[#7A7A7A]"
                />
              </div>
              <button type="submit" className="design-button min-h-[46px] shrink-0 rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-6 py-3 text-sm font-bold uppercase text-white shadow-sm">
                Rechercher
              </button>
            </form>
          </div>
        </div>

        <nav className="bg-gradient-to-r from-[#111111] to-[#3A3A3A] text-white">
          <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-4 py-3 sm:px-6 lg:px-10">
            <button className="flex min-h-[46px] w-[260px] shrink-0 items-center gap-3 rounded-[10px] bg-gradient-to-r from-[#C8141B] to-[#D71920] px-5 py-3 text-sm font-bold uppercase text-white">
              <span className="text-lg">☰</span>
              <span>Toutes les catégories</span>
            </button>
            <div className="flex items-center gap-6 text-sm font-medium text-white/90">
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'border-b-[3px] border-[#FFD400] pb-2 text-[#FFD400]' : 'border-b-[3px] border-transparent pb-2 hover:text-white'}
              >
                Accueil
              </NavLink>
              <NavLink
                to="/produits"
                className={({ isActive }) => isActive ? 'border-b-[3px] border-[#FFD400] pb-2 text-[#FFD400]' : 'border-b-[3px] border-transparent pb-2 hover:text-white'}
              >
                Tous les produits
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'border-b-[3px] border-[#FFD400] pb-2 text-[#FFD400]' : 'border-b-[3px] border-transparent pb-2 hover:text-white'}
              >
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>

      <footer className="mt-10 text-white">
        <div className="h-1 bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E]" />
        <div className="bg-gradient-to-br from-[#111111] to-[#3A3A3A]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.4fr] lg:px-10">
            <div className="flex items-start gap-4">
              <img src={technoLogo} alt="Techno Stationery" className="h-14 w-auto object-contain" />
              <div className="text-sm leading-6 text-[#E8E8E8]">
                {homeContent.brandTagline}
              </div>
            </div>
            <div className="grid content-start gap-3 text-sm text-white/80">
              <div className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-[#FFD400]">Navigation</div>
              <Link to="/">Accueil</Link>
              <Link to="/produits">Tous les produits</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="grid content-start gap-3 text-sm text-white/80">
              <div className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-[#FFD400]">Catégories</div>
              <span>Scolaire</span>
              <span>Loisirs créatifs</span>
              <span>Beaux arts</span>
              <span>Bureautique &amp; informatique</span>
            </div>
            <div className="grid content-start gap-3 text-sm text-white/80">
              <div className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-[#FFD400]">Nous contacter</div>
              <div>Cité les Mandarines lot N 280, Pins Maritimes, Alger</div>
              <div>contact@TechnoStationery.com</div>
              <div>+213 550 07 07 08</div>
            </div>
          </div>
        </div>
        <div className="bg-[#0B0B0B] text-[#BDBDBD]">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 text-[13px] sm:px-6 lg:px-10">
            <div className="flex flex-wrap gap-2">
              {['Facebook', 'LinkedIn', 'Instagram', 'YouTube', 'Telegram', 'WhatsApp'].map((network) => (
                <span key={network} className="rounded-full border border-[#555555] px-3.5 py-1.5">
                  {network}
                </span>
              ))}
            </div>
            <span>Techno Stationery © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
