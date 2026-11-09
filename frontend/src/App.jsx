import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import technoLogo from './assets/techno-logo.svg'
import homeContent from './config/homeContent'
import PageMetadata from './components/PageMetadata'

const pageMetadata = {
  '/': {
    title: 'Accueil — Techno Stationery',
    description: 'Fournitures scolaires, bureautique et loisirs créatifs fabriqués en Algérie. Découvrez les catégories et les derniers produits.',
  },
  '/produits': {
    title: 'Tous les produits — Techno Stationery',
    description: 'Parcourez le catalogue Techno Stationery et trouvez vos produits par catégorie, marque et prix.',
  },
  '/contact': {
    title: 'Contact — Techno Stationery',
    description: 'Contactez Techno Stationery à Alger pour toute question sur nos produits et leur disponibilité.',
  },
  '/admin/login': {
    title: 'Connexion administrateur — Techno Stationery',
    description: 'Connexion à l’espace d’administration Techno Stationery.',
  },
  '/admin/signup': {
    title: 'Inscription administrateur — Techno Stationery',
    description: 'Création d’un accès administrateur Techno Stationery.',
  },
  '/admin': {
    title: 'Gestion des produits — Techno Stationery',
    description: 'Administration du catalogue de produits Techno Stationery.',
  },
  '/admin/products/new': {
    title: 'Ajouter un produit — Techno Stationery',
    description: 'Ajout d’un produit au catalogue Techno Stationery.',
  },
  '/admin/categories-marques': {
    title: 'Catégories et marques — Techno Stationery',
    description: 'Gestion des catégories et marques du catalogue Techno Stationery.',
  },
}

function getPageMetadata(pathname) {
  if (Object.hasOwn(pageMetadata, pathname)) {
    return pageMetadata[pathname]
  }

  if (pathname.startsWith('/produits/')) {
    return {
      title: 'Produit — Techno Stationery',
      description: 'Consultez les informations et la disponibilité de ce produit dans le catalogue Techno Stationery.',
    }
  }

  if (pathname.startsWith('/admin/products/') && pathname.endsWith('/edit')) {
    return {
      title: 'Modifier un produit — Techno Stationery',
      description: 'Modification d’un produit du catalogue Techno Stationery.',
    }
  }

  return {
    title: 'Page introuvable — Techno Stationery',
    description: 'La page demandée est introuvable dans le catalogue Techno Stationery.',
  }
}

function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111]">
      <PageMetadata {...getPageMetadata(pathname)} />
      <header className="sticky top-0 z-50 shadow-sm">
        <div className="bg-[#111111] text-white">
          <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-1.5 sm:px-6 lg:px-8">
            <Link to="/" className="shrink-0">
              <img src={technoLogo} alt="Techno Stationery" className="h-7 w-auto object-contain sm:h-8" />
            </Link>
            <div className="ml-auto flex flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
              <a
                href="tel:+213550070708"
                aria-label="Appeler le +213 550 07 07 08"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400]/70 hover:bg-[#FFD400] hover:text-[#111111] hover:shadow-[0_5px_14px_rgba(255,212,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD400] sm:gap-2 sm:px-3 sm:text-sm"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform group-hover:rotate-[-12deg] sm:h-4 sm:w-4">
                  <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                +213 550 07 07 08
              </a>
              <div aria-label="Espace compte client" className="flex items-center gap-1.5">
                <span className="inline-flex min-h-7 items-center gap-1 rounded-full border border-white/20 bg-gradient-to-b from-[#292929] to-[#1a1a1a] px-2 text-[9px] font-semibold text-white shadow-[0_3px_8px_rgba(0,0,0,0.3)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400]/70 hover:text-[#FFD400] hover:shadow-[0_5px_12px_rgba(255,212,0,0.16)] sm:min-h-8 sm:gap-1.5 sm:px-2.5 sm:text-xs">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="hidden h-4 w-4 text-[#FFD400] sm:block">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                  </svg>
                  <span className="whitespace-nowrap">Se Connecter</span>
                </span>
                <span className="inline-flex min-h-7 items-center rounded-full border border-[#FFD400]/50 bg-gradient-to-b from-[#3a3020] to-[#211b12] px-2 text-[9px] font-semibold text-[#FFD400] shadow-[0_3px_8px_rgba(0,0,0,0.3)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400] hover:bg-[#FFD400] hover:text-[#111111] hover:shadow-[0_5px_12px_rgba(255,212,0,0.22)] sm:min-h-8 sm:px-2.5 sm:text-xs">
                  <span className="whitespace-nowrap">Créer un Compte</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#111111] to-[#3A3A3A] text-white">
          <div className="mx-auto flex max-w-[1560px] flex-col gap-2 px-4 py-2 sm:px-6 lg:px-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] xl:items-center xl:gap-4">
            <nav aria-label="Navigation principale" className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 sm:gap-x-5">
              <button type="button" className="inline-flex min-h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-[#C8141B] to-[#D71920] px-3 py-2 text-[11px] font-bold uppercase text-white sm:text-xs">
                <span aria-hidden="true" className="text-sm">☰</span>
                <span>Toutes les catégories</span>
              </button>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive
                  ? 'inline-flex min-h-9 items-center rounded-lg border border-[#FFD400]/70 bg-[#FFD400] px-3 py-1 text-xs font-bold text-[#111111] shadow-[0_4px_12px_rgba(255,212,0,0.22)] transition duration-200 sm:text-sm'
                  : 'inline-flex min-h-9 items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white shadow-[0_3px_8px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400]/70 hover:bg-white/10 hover:text-[#FFD400] hover:shadow-[0_5px_12px_rgba(0,0,0,0.3)] sm:text-sm'}
              >
                Accueil
              </NavLink>
              <NavLink
                to="/produits"
                className={({ isActive }) => isActive
                  ? 'inline-flex min-h-9 items-center rounded-lg border border-[#FFD400]/70 bg-[#FFD400] px-3 py-1 text-xs font-bold text-[#111111] shadow-[0_4px_12px_rgba(255,212,0,0.22)] transition duration-200 sm:text-sm'
                  : 'inline-flex min-h-9 items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white shadow-[0_3px_8px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400]/70 hover:bg-white/10 hover:text-[#FFD400] hover:shadow-[0_5px_12px_rgba(0,0,0,0.3)] sm:text-sm'}
              >
                Tous les produits
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive
                  ? 'inline-flex min-h-9 items-center rounded-lg border border-[#FFD400]/70 bg-[#FFD400] px-3 py-1 text-xs font-bold text-[#111111] shadow-[0_4px_12px_rgba(255,212,0,0.22)] transition duration-200 sm:text-sm'
                  : 'inline-flex min-h-9 items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white shadow-[0_3px_8px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFD400]/70 hover:bg-white/10 hover:text-[#FFD400] hover:shadow-[0_5px_12px_rgba(0,0,0,0.3)] sm:text-sm'}
              >
                Contact
              </NavLink>
            </nav>
            <div className="flex w-full min-w-0 items-center gap-2 xl:justify-self-end">
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
                className="flex min-w-0 flex-1 items-center gap-2"
              >
                <div className="flex h-9 w-full min-w-0 items-center overflow-hidden rounded-lg border border-white/25 bg-[#1a1a1a]">
                  <input
                    name="q"
                    type="text"
                    aria-label="Rechercher un produit"
                    autoComplete="off"
                    placeholder="Rechercher un produit"
                    className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/60"
                  />
                </div>
                <button type="submit" className="design-button min-h-9 shrink-0 rounded-lg bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-3 py-2 text-[11px] font-bold uppercase text-white shadow-sm sm:px-4 sm:text-xs">
                  Rechercher
                </button>
              </form>
              <span aria-label="Panier" className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-[#FFD400]/80 bg-gradient-to-b from-[#FFD400] to-[#FF9F1C] px-3 text-xs font-extrabold text-[#17120a] shadow-[0_5px_14px_rgba(0,0,0,0.3)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_18px_rgba(255,159,28,0.35)] sm:h-11 sm:gap-2.5 sm:px-4 sm:text-sm">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6" />
                  <circle cx="10" cy="21" r="1" />
                  <circle cx="18" cy="21" r="1" />
                </svg>
                Panier
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-10">
        <Outlet />
      </main>

      <footer className="mt-10 text-white">
        <div className="h-1 bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E]" />
        <div className="bg-gradient-to-br from-[#111111] to-[#3A3A3A]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.4fr] lg:px-10">
            <div className="flex items-start gap-4">
              <img src={technoLogo} alt="Techno Stationery" className="h-10 w-auto object-contain" />
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
            <span>Fabriqué en Algérie · qualité Techno Stationery © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
