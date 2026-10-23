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
      <div className="rounded-[18px] border border-[#e7a39c] bg-[#fff1ef] p-8 text-center">
        <h1 className="text-2xl font-black uppercase text-[#c52e20]">Impossible de charger le catalogue</h1>
        <p className="mt-3 text-[#5b2a25]">{result.error.message}</p>
        <button
          type="button"
          onClick={() => {
            setResult((current) => ({ ...current, status: 'loading' }))
            setRetryCount((count) => count + 1)
          }}
          className="mt-5 rounded-md bg-[#ef3b2d] px-5 py-3 text-sm font-bold uppercase text-white"
        >
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-2">
      <div className="rounded-[18px] bg-gradient-to-r from-[#e2261d] via-[#ea4a2d] to-[#f59a5a] p-5 text-white">
        <div className="mb-2 text-sm font-medium uppercase tracking-[0.12em] text-white/80">Accueil · Tous les produits</div>
        <h1 className="text-4xl font-black uppercase tracking-[-0.05em] text-white">Tous les produits</h1>
      </div>

      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f3efe9] p-4">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {['Nouveau', 'Promo', 'En stock'].map((tag) => (
            <span
              key={tag}
              className="inline-flex rounded-full border border-[#d7d0c5] bg-white px-2.5 py-1 text-[10px] font-black uppercase text-[#1c1c1c]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[14px] border border-[#d7d0c5] bg-[#f5f2ee] p-4">
            <h2 className="text-2xl font-black uppercase text-[#1f1f1f]">Filtres</h2>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 text-sm font-bold uppercase text-[#1f1f1f]">Catégorie</div>
                {result.categories.map((item) => (
                  <label key={item.slug} className="mb-2 flex items-center gap-2 text-sm text-[#2b2b2b]">
                    <input
                      type="checkbox"
                      checked={selectedCategory === item.slug}
                      onChange={() => setSelectedCategory(selectedCategory === item.slug ? 'all' : item.slug)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>

              <div>
                <div className="mb-2 text-sm font-bold uppercase text-[#1f1f1f]">Marque</div>
                {result.brands.map((item) => (
                  <label key={item.slug} className="mb-2 flex items-center gap-2 text-sm text-[#2b2b2b]">
                    <input
                      type="checkbox"
                      checked={selectedBrand === item.slug}
                      onChange={() => setSelectedBrand(selectedBrand === item.slug ? 'all' : item.slug)}
                    />
                    {item.name}
                  </label>
                ))}
              </div>

              <div>
                <div className="mb-2 text-sm font-bold uppercase text-[#1f1f1f]">Prix (DA)</div>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Min" />
                  <Input placeholder="Max" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#2b2b2b]">
                <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly((value) => !value)} />
                Disponible uniquement
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Appliquer</Button>
                <Button variant="secondary" className="flex-1">Réinitialiser</Button>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-[#2b2b2b]">
                {filteredProducts.length} produits
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-[#1f1f1f]">Trier :</label>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="rounded-md border border-[#d7d0c5] bg-white px-3 py-2 text-sm text-[#202020] outline-none"
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
              <p className="rounded-xl bg-white p-8 text-center text-sm text-[#4d4d4d]">
                Aucun produit ne correspond à votre sélection.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
