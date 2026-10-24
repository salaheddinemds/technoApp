import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import CategoryIcon from '../../components/ui/CategoryIcon'
import LoadingState from '../../components/ui/LoadingState'
import homeContent from '../../config/homeContent'
import { getCategories, getProducts } from '../../services/api'

export default function HomePage() {
  const [result, setResult] = useState({ status: 'loading', categories: [], products: [], error: null })
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    Promise.all([
      getCategories(),
      getProducts({ limit: 4, sort: 'newest' }),
    ])
      .then(([categories, { products }]) => {
        if (isCurrent) {
          setResult({ status: 'success', categories, products, error: null })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setResult({ status: 'error', categories: [], products: [], error })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [retryCount])

  if (result.status === 'loading') {
    return <LoadingState message="Chargement de l’accueil..." />
  }

  if (result.status === 'error') {
    return (
      <div className="rounded-2xl border border-[#E6E1D8] bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#C8141B]">Impossible de charger l’accueil</h1>
        <p className="mt-3 text-[#5B5B5B]">{result.error.message}</p>
        <button
          type="button"
          onClick={() => {
            setResult((current) => ({ ...current, status: 'loading' }))
            setRetryCount((count) => count + 1)
          }}
          className="design-button mt-5 min-h-[46px] rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-5 py-3 text-sm font-bold uppercase text-white"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="design-rise space-y-10 py-2">
      <section className="design-gradient-shift relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E] p-6 text-white shadow-[0_12px_32px_rgba(17,17,17,0.12)] sm:p-8 lg:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full bg-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-[#FFD400]/30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:items-stretch">
          <div className="flex flex-col items-start justify-center gap-5 py-2">
            <h1 className="max-w-[520px] text-4xl font-extrabold leading-tight tracking-normal text-white sm:text-[46px]">
              {homeContent.heroTitle}
            </h1>
            <p className="max-w-[460px] text-lg leading-relaxed text-white/90">
              {homeContent.brandTagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/produits"
                className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] px-5 py-3 text-[15px] font-bold text-[#111111] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Voir le catalogue
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-white/70 bg-white/10 px-4 py-2.5 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFD400]"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                  <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-rows-2">
            <div className="design-lift flex min-h-[190px] flex-col justify-end gap-1.5 rounded-[20px] bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] p-6 text-[#111111]">
              <div className="text-xl font-bold">{homeContent.bannerTwo}</div>
              <div>{homeContent.offer}</div>
            </div>
            <div className="design-lift flex min-h-[190px] flex-col justify-end gap-1.5 rounded-[20px] bg-gradient-to-br from-[#111111] to-[#3A3A3A] p-6 text-white">
              <div className="text-xl font-bold">{homeContent.bannerThree}</div>
              <div className="text-white/80">{homeContent.offer}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-5 sm:p-6 md:grid-cols-3">
        {[
          'Fabriqué en Algérie',
          'Qualité garantie',
          'Contact direct',
        ].map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${index === 2 ? 'bg-gradient-to-br from-[#111111] to-[#3A3A3A]' : 'bg-gradient-to-br from-[#F0561E] to-[#D71920]'}`}>
              {index === 0 && (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
                </svg>
              )}
              {index === 1 && (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                  <path d="m12 3 8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              )}
              {index === 2 && (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                  <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              )}
            </div>
            <span className="text-[15px] font-bold text-[#111111]">{item}</span>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
            <CategoryIcon name="Catégories" />
          </span>
          <h2 className="flex-1 text-2xl font-extrabold text-[#111111]">Catégories</h2>
          <Link to="/produits" className="inline-flex items-center gap-1.5 font-bold text-[#D71920] hover:text-[#C8141B]">
            Voir tout
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {result.categories.map((category) => (
            <div key={category.slug} className="design-lift flex items-center gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
                <CategoryIcon name={category.name} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold uppercase leading-snug text-[#111111]">{category.name}</h3>
                <p className="mt-1 text-[13px] text-[#5B5B5B]">{category.productCount} produits</p>
              </div>
            </div>
          ))}
        </div>
        {result.categories.length === 0 && (
          <p className="rounded-2xl border border-[#E6E1D8] bg-white p-6 text-sm text-[#5B5B5B]">Aucune catégorie disponible pour le moment.</p>
        )}
      </section>

      <section>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="M3 4h18v16H3z" />
              <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>
          </span>
          <h2 className="flex-1 text-2xl font-extrabold text-[#111111]">Derniers produits</h2>
          <Link to="/produits" className="inline-flex items-center gap-1.5 font-bold text-[#D71920] hover:text-[#C8141B]">
            Voir tout
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {result.products.map((product) => (
            <ProductCard key={product.id} product={product} tag="Nouveau" />
          ))}
        </div>
        {result.products.length === 0 && (
          <p className="rounded-2xl border border-[#E6E1D8] bg-white p-6 text-sm text-[#5B5B5B]">Aucun produit disponible pour le moment.</p>
        )}
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E] px-6 py-6 text-white shadow-sm sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-extrabold">{homeContent.offer}</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={homeContent.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] px-5 py-3 text-[15px] font-semibold text-[#111111]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px]">
                <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7A8.5 8.5 0 1 1 20.5 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <path d="M8.2 7.8c.3-.5.6-.5.9-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .6.5.9 1.3 1.6 2.2 2.1.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.5 0 .4-.2 1.2-.7 1.6-.5.5-1.2.7-2 .6-1-.1-2.4-.7-3.8-1.9-1.6-1.4-2.6-3.1-2.8-4.2-.2-.8 0-1.5.4-2Z" fill="currentColor" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`tel:${homeContent.phoneNumber}`}
              className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#111111] to-[#3A3A3A] px-5 py-3 text-[15px] font-semibold text-white"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
                <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>
              Appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
