import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import LoadingState from '../../components/ui/LoadingState'
import { getBrands, getCategories, getProducts } from '../../services/api'

export default function CatalogPage() {
  const [search, _setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('price_desc')
  const [result, setResult] = useState({ status: 'loading', products: [], categories: [], brands: [], error: null })
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    Promise.all([
      getProducts({ limit: 50 }),
      getCategories(),
      getBrands(),
    ])
      .then(([{ products }, categories, brands]) => {
        if (isCurrent) {
          setResult({ status: 'success', products, categories, brands, error: null })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setResult({ status: 'error', products: [], categories: [], brands: [], error })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [retryCount])

  const filteredProducts = useMemo(() => {
    const items = result.products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.name.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === 'all' || product.category.slug === selectedCategory
      const matchesBrand = selectedBrand === 'all' || product.brand.slug === selectedBrand
      const matchesStock = !inStockOnly || product.inStock

      return matchesSearch && matchesCategory && matchesBrand && matchesStock
    })

    return [...items].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price
      if (sortBy === 'price_desc') return b.price - a.price
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return b.id - a.id
    })
  }, [inStockOnly, result.products, search, selectedBrand, selectedCategory, sortBy])

  if (result.status === 'loading') {
    return <LoadingState message="Chargement des produits..." />
  }

  if (result.status === 'error') {
    return (
      <div className="rounded-2xl border border-[#E6E1D8] bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#C8141B]">Impossible de charger le catalogue</h1>
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
    <div className="design-rise space-y-8 py-2">
      <div className="design-gradient-shift relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E] p-6 text-white shadow-sm sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-60 w-60 rounded-full bg-white/15" />
        <div className="relative">
          <div className="mb-2 text-sm text-white/80">Accueil · Tous les produits</div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Tous les produits</h1>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6E1D8] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {['Nouveau', 'Promo', 'En stock'].map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-[#E6E1D8] bg-[#F7F5F0] px-3 py-1.5 text-[11px] font-bold uppercase text-[#5B5B5B]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-[#E6E1D8] pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 4h18l-7 9v6l-4 2v-8z" />
                </svg>
              </span>
              <h2 className="flex-1 text-xl font-extrabold text-[#111111]">Filtres</h2>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#5B5B5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </div>

            <div className="mt-5 space-y-6">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold text-[#111111]">Catégorie</div>
                {result.categories.map((item) => (
                  <label key={item.slug} className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                    <input
                      type="checkbox"
                      checked={selectedCategory === item.slug}
                      onChange={() => setSelectedCategory(selectedCategory === item.slug ? 'all' : item.slug)}
                      className="h-4 w-4 accent-[#D71920]"
                    />
                    {item.name}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold text-[#111111]">Marque</div>
                {result.brands.map((item) => (
                  <label key={item.slug} className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                    <input
                      type="checkbox"
                      checked={selectedBrand === item.slug}
                      onChange={() => setSelectedBrand(selectedBrand === item.slug ? 'all' : item.slug)}
                      className="h-4 w-4 accent-[#D71920]"
                    />
                    {item.name}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm font-bold text-[#111111]">Prix (DA)</div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" className="min-h-[46px] rounded-[10px] border-[#E6E1D8] px-3 text-[#111111] placeholder:text-[#7A7A7A] focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60" />
                  <Input placeholder="Max" className="min-h-[46px] rounded-[10px] border-[#E6E1D8] px-3 text-[#111111] placeholder:text-[#7A7A7A] focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#5B5B5B]">
                <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly((value) => !value)} className="h-4 w-4 accent-[#D71920]" />
                Disponible uniquement
              </div>

              <div className="flex gap-3">
                <Button variant="stationeryPrimary" className="flex-1">Appliquer</Button>
                <Button variant="stationerySecondary" className="flex-1">Réinitialiser</Button>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-[#5B5B5B]">
                {filteredProducts.length} produits
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-[#111111]">Trier :</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="min-h-[46px] rounded-[10px] border border-[#E6E1D8] bg-white px-3 py-2 text-sm text-[#111111] outline-none focus:border-[#D71920] focus:ring-2 focus:ring-[#FFD400]/60 sm:w-60"
                >
                  <option value="price_desc">Plus récents</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="name">Nom</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} tag={product.inStock ? 'Nouveau' : 'Promo'} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-[#E6E1D8] bg-white p-8 text-center text-sm text-[#5B5B5B]">
                Aucun produit ne correspond à votre sélection.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
