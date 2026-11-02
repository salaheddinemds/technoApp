import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import LoadingState from '../../components/ui/LoadingState'
import { deleteAdminProduct, getAdminProducts } from '../../services/api'

export default function AdminHomePage() {
  const { admin } = useOutletContext()
  const [result, setResult] = useState({
    status: 'loading',
    products: [],
    error: null,
  })
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    getAdminProducts({ limit: 50, sort: 'name' })
      .then(({ products }) => {
        if (isCurrent) {
          setResult({ status: 'success', products, error: null })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setResult({ status: 'error', products: [], error })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [retryCount])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('fr')

    if (!normalizedSearch) {
      return result.products
    }

    return result.products.filter((product) => (
      product.name.toLocaleLowerCase('fr').includes(normalizedSearch)
    ))
  }, [result.products, search])

  async function handleDelete(product) {
    if (!window.confirm(`Supprimer « ${product.name} » ? Cette action est irréversible.`)) {
      return
    }

    setDeletingId(product.id)

    try {
      await deleteAdminProduct(product.id)
      setResult((current) => ({
        ...current,
        products: current.products.filter(({ id }) => id !== product.id),
      }))
    } catch (error) {
      setResult((current) => ({ ...current, error }))
    } finally {
      setDeletingId(null)
    }
  }

  if (result.status === 'loading') {
    return <LoadingState message="Chargement des produits..." />
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Tableau de bord</h1>
          <p className="mt-2 text-sm text-[#5B5B5B]">Bonjour {admin.email}, gérez les produits du catalogue.</p>
        </div>
        <span className="text-sm text-[#5B5B5B]">
          {result.products.length} produit{result.products.length > 1 ? 's' : ''}
        </span>
      </header>

      {result.error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-4 text-sm text-[#8F251D]">
          <span>{result.error.message}</span>
          {result.status === 'error' && (
            <Button
              variant="stationerySecondary"
              onClick={() => {
                setResult({ status: 'loading', products: [], error: null })
                setRetryCount((count) => count + 1)
              }}
              className="min-h-0 px-3 py-2 text-xs text-[#C8141B]"
            >
              Réessayer
            </Button>
          )}
        </div>
      )}

      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#111111]">Produits</h2>
            <p className="mt-1 text-sm text-[#5B5B5B]">Recherchez un produit par son nom.</p>
          </div>
          <Input
            label="Rechercher"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Nom du produit"
            className="sm:min-w-72"
          />
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-[#D7D0C5] bg-[#F7F5F0] p-8 text-center text-sm text-[#5B5B5B]">
            {search.trim() ? 'Aucun produit ne correspond à cette recherche.' : 'Aucun produit à afficher.'}
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6E1D8] text-xs uppercase tracking-[0.08em] text-[#5B5B5B]">
                  <th className="px-3 py-3 font-bold">Produit</th>
                  <th className="px-3 py-3 font-bold">Catégorie</th>
                  <th className="px-3 py-3 font-bold">Prix</th>
                  <th className="px-3 py-3 font-bold">Stock</th>
                  <th className="px-3 py-3 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#F0ECE7] last:border-0">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-[#F3EFE7]" aria-hidden="true" />
                        )}
                        <div>
                          <div className="font-bold text-[#111111]">{product.name}</div>
                          <div className="text-xs text-[#5B5B5B]">{product.brand.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-[#5B5B5B]">{product.category.name}</td>
                    <td className="px-3 py-4 font-medium text-[#111111]">{product.price} DA</td>
                    <td className="px-3 py-4">
                      <span className={product.inStock ? 'text-[#287B4D]' : 'text-[#B52B21]'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/produits/${product.slug}`}
                          className="inline-flex min-h-[40px] items-center rounded-[10px] border border-[#E6E1D8] bg-white px-3 py-2 text-xs font-bold uppercase text-[#111111]"
                        >
                          Voir
                        </Link>
                        <Button
                          variant="stationerySecondary"
                          onClick={() => handleDelete(product)}
                          disabled={deletingId === product.id}
                          className="min-h-[40px] border-[#E7A39C] px-3 py-2 text-xs text-[#C8141B] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === product.id ? 'Suppression...' : 'Supprimer'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
