import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import LoadingState from '../../components/ui/LoadingState'
import { getBrands, getCategories, getProducts } from '../../services/api'

const PAGE_SIZE = 12

function getPriceError(minPrice, maxPrice) {
  if (minPrice && !/^\d+$/.test(minPrice)) {
    return 'Le prix minimum doit être un nombre entier supérieur ou égal à 0.'
  }

  if (maxPrice && !/^\d+$/.test(maxPrice)) {
    return 'Le prix maximum doit être un nombre entier supérieur ou égal à 0.'
  }

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return 'Le prix minimum ne peut pas dépasser le prix maximum.'
  }

  return null
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav aria-label="Pagination des produits" className="mt-8 flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="stationerySecondary"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        Précédent
      </Button>
      <span aria-live="polite" className="text-sm font-medium text-[#5B5B5B]">
        Page {page} sur {totalPages}
      </span>
      <Button
        variant="stationerySecondary"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        Suivant
      </Button>
    </nav>
  )
}

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [result, setResult] = useState({ status: 'loading', requestKey: null, products: [], meta: null, error: null })
  const [catalog, setCatalog] = useState({ status: 'loading', categories: [], brands: [], error: null })
  const [retryProducts, setRetryProducts] = useState(0)
  const [retryCatalog, setRetryCatalog] = useState(0)
  const queryString = searchParams.toString()
  const params = new URLSearchParams(queryString)
  const search = params.get('q') ?? ''
  const selectedCategory = params.get('category') ?? ''
  const selectedBrand = params.get('brand') ?? ''
  const minPrice = params.get('minPrice') ?? ''
  const maxPrice = params.get('maxPrice') ?? ''
  const inStockOnly = params.get('inStock') === 'true'
  const sortBy = params.get('sort') ?? 'newest'
  const priceError = getPriceError(minPrice, maxPrice)
  const requestKey = `${queryString}:${retryProducts}`

  function updateParams(updates, options) {
    setSearchParams((current) => {
      const next = new URLSearchParams(current)

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === undefined || value === '') {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      }

      return next
    }, options)
  }

  useEffect(() => {
    let isCurrent = true

    Promise.all([getCategories(), getBrands()])
      .then(([categories, brands]) => {
        if (isCurrent) {
          setCatalog({ status: 'success', categories, brands, error: null })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setCatalog({ status: 'error', categories: [], brands: [], error })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [retryCatalog])

  useEffect(() => {
    if (priceError) {
      return undefined
    }

    let isCurrent = true
    const requestParamsFromUrl = new URLSearchParams(queryString)
    const requestParams = {
      q: requestParamsFromUrl.get('q')?.trim() || undefined,
      category: requestParamsFromUrl.get('category') || undefined,
      brand: requestParamsFromUrl.get('brand') || undefined,
      minPrice: requestParamsFromUrl.get('minPrice') || undefined,
      maxPrice: requestParamsFromUrl.get('maxPrice') || undefined,
      inStock: requestParamsFromUrl.get('inStock') === 'true' ? true : undefined,
      sort: requestParamsFromUrl.get('sort') || 'newest',
      page: requestParamsFromUrl.get('page') ?? 1,
      limit: PAGE_SIZE,
    }

    const timeout = window.setTimeout(() => {
      getProducts(requestParams)
        .then(({ products, meta }) => {
          if (isCurrent) {
            setResult({ status: 'success', requestKey, products, meta, error: null })
          }
        })
        .catch((error) => {
          if (isCurrent) {
            setResult({ status: 'error', requestKey, products: [], meta: null, error })
          }
        })
    }, 250)

    return () => {
      isCurrent = false
      window.clearTimeout(timeout)
    }
  }, [queryString, requestKey, retryProducts, priceError])

  const page = result.meta?.page ?? Number(params.get('page') ?? 1)
  const totalPages = result.meta?.totalPages
  const isPageOutOfRange = result.status === 'success' && typeof totalPages === 'number' && totalPages >= 1 && page > totalPages

  const isProductsLoading = result.requestKey !== requestKey

  if (isProductsLoading && catalog.status === 'loading' && !result.meta) {
    return <LoadingState message="Chargement du catalogue..." />
  }

  return (
    <div className="design-rise space-y-8 py-2">
      <section className="design-gradient-shift relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E] p-6 text-white shadow-sm sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-60 w-60 rounded-full bg-white/15" />
        <div className="relative">
          <div className="mb-2 text-sm text-white/80">Accueil · Tous les produits</div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Tous les produits</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/90 sm:text-base">
            Recherchez et filtrez les fournitures pour trouver le produit qui vous convient.
          </p>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#E6E1D8] pb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M3 4h18l-7 9v6l-4 2v-8z" />
              </svg>
            </span>
            <h2 className="flex-1 text-xl font-extrabold text-[#111111]">Filtres</h2>
            <Button
              variant="stationerySecondary"
              onClick={() => updateParams({
                q: null,
                category: null,
                brand: null,
                minPrice: null,
                maxPrice: null,
                inStock: null,
                sort: 'newest',
                page: 1,
              })}
              className="min-h-0 border-0 px-1 py-1 text-xs text-[#C8141B] shadow-none"
            >
              Effacer
            </Button>
          </div>

          {catalog.status === 'error' ? (
            <div role="alert" className="mt-5 rounded-xl border border-[#E6E1D8] bg-[#F7F5F0] p-4 text-sm text-[#5B5B5B]">
              <p>{catalog.error.message}</p>
              <button
                type="button"
                onClick={() => setRetryCatalog((count) => count + 1)}
                className="mt-3 font-bold text-[#C8141B] underline"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div className="mt-5 space-y-6">
              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-bold text-[#111111]">Catégorie</legend>
                <label className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                  <input
                    type="radio"
                    name="category"
                    checked={!selectedCategory}
                    onChange={() => updateParams({ category: null, page: 1 })}
                    className="h-4 w-4 accent-[#D71920]"
                  />
                  Toutes les catégories
                </label>
                {catalog.categories.map((item) => (
                  <label key={item.slug} className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === item.slug}
                      onChange={() => updateParams({ category: item.slug, page: 1 })}
                      className="h-4 w-4 accent-[#D71920]"
                    />
                    <span className="flex-1">{item.name}</span>
                    <span className="text-xs text-[#7A7A7A]">{item.productCount}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-bold text-[#111111]">Marque</legend>
                <label className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                  <input
                    type="radio"
                    name="brand"
                    checked={!selectedBrand}
                    onChange={() => updateParams({ brand: null, page: 1 })}
                    className="h-4 w-4 accent-[#D71920]"
                  />
                  Toutes les marques
                </label>
                {catalog.brands.map((item) => (
                  <label key={item.slug} className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === item.slug}
                      onChange={() => updateParams({ brand: item.slug, page: 1 })}
                      className="h-4 w-4 accent-[#D71920]"
                    />
                    <span className="flex-1">{item.name}</span>
                    <span className="text-xs text-[#7A7A7A]">{item.productCount}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-bold text-[#111111]">Prix (DA)</legend>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    aria-label="Prix minimum en dinars"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(event) => updateParams({ minPrice: event.target.value, page: 1 }, { replace: true })}
                    className="min-h-[46px] rounded-[10px] border-[#E6E1D8] px-3 text-[#111111] placeholder:text-[#7A7A7A] focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60"
                  />
                  <Input
                    aria-label="Prix maximum en dinars"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(event) => updateParams({ maxPrice: event.target.value, page: 1 }, { replace: true })}
                    className="min-h-[46px] rounded-[10px] border-[#E6E1D8] px-3 text-[#111111] placeholder:text-[#7A7A7A] focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60"
                  />
                </div>
                {priceError && <p role="alert" className="text-xs text-[#C8141B]">{priceError}</p>}
              </fieldset>

              <label className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => updateParams({ inStock: event.target.checked ? 'true' : null, page: 1 })}
                  className="h-4 w-4 accent-[#D71920]"
                />
                Disponible uniquement
              </label>
            </div>
          )}
        </aside>

        <section aria-label="Résultats du catalogue" className="min-w-0">
          <div className="mb-4 grid gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-4">
            <form role="search" onSubmit={(event) => event.preventDefault()} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Input
                id="catalog-search"
                label="Rechercher un produit"
                type="search"
                placeholder="Nom ou description"
                value={search}
                onChange={(event) => updateParams({ q: event.target.value, page: 1 }, { replace: true })}
                className="min-h-[46px] min-w-0 rounded-[10px] border-[#E6E1D8] px-3 text-[#111111] placeholder:text-[#7A7A7A] focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60"
                containerClassName="min-w-0 flex-1"
              />
              {search && (
                <Button
                  variant="stationerySecondary"
                  onClick={() => updateParams({ q: null, page: 1 }, { replace: true })}
                  className="self-start sm:shrink-0 sm:self-auto"
                >
                  Effacer
                </Button>
              )}
            </form>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="text-sm font-medium text-[#5B5B5B]">
                {result.meta ? `${result.meta.total} produit${result.meta.total === 1 ? '' : 's'}` : 'Résultats'}
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="catalog-sort" className="text-sm font-medium text-[#111111]">Trier :</label>
                <select
                  id="catalog-sort"
                  value={sortBy}
                  onChange={(event) => updateParams({ sort: event.target.value, page: 1 })}
                  className="min-h-[46px] rounded-[10px] border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60 sm:w-60"
                >
                  <option value="newest">Plus récents</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="name">Nom</option>
                </select>
              </div>
            </div>
          </div>

          {priceError ? (
            <p role="alert" className="rounded-2xl border border-[#E6E1D8] bg-white p-8 text-center text-sm text-[#C8141B]">
              {priceError}
            </p>
          ) : isProductsLoading ? (
            <LoadingState message="Chargement des produits..." />
          ) : result.status === 'error' ? (
            <div role="alert" className="rounded-2xl border border-[#E6E1D8] bg-white p-5 text-center shadow-sm sm:p-8">
              <h2 className="text-xl font-extrabold text-[#C8141B]">Impossible de charger les produits</h2>
              <p className="mt-3 break-words text-[#5B5B5B]">{result.error.message}</p>
              <Button
                variant="stationeryPrimary"
                onClick={() => setRetryProducts((count) => count + 1)}
                className="mt-5"
              >
                Réessayer
              </Button>
            </div>
          ) : isPageOutOfRange ? (
            <div className="rounded-2xl border border-[#E6E1D8] bg-white p-5 text-center shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold text-[#111111] sm:text-3xl">Cette page n’existe pas</h2>
              <p className="mt-3 text-sm text-[#5B5B5B]">
                La page demandée est hors de la plage disponible pour cette recherche.
              </p>
            </div>
          ) : result.products.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-3">
              {result.products.map((product) => (
                <ProductCard key={product.id} product={product} tag={product.inStock ? 'En stock' : 'Rupture'} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-[#E6E1D8] bg-white p-8 text-center text-sm text-[#5B5B5B]">
              Aucun produit ne correspond à votre recherche ou à vos filtres.
            </p>
          )}
          {result.status === 'success' && result.meta && !isPageOutOfRange && (
            <Pagination
              page={page}
              totalPages={result.meta.totalPages}
              onPageChange={(nextPage) => updateParams({ page: nextPage })}
            />
          )}
        </section>
      </div>
    </div>
  )
}
