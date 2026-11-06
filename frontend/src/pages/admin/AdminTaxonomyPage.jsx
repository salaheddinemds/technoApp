import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import LoadingState from '../../components/ui/LoadingState'
import {
  createAdminBrand,
  createAdminCategory,
  deleteAdminBrand,
  deleteAdminCategory,
  getBrands,
  getCategories,
} from '../../services/api'

const resourceLabels = {
  category: {
    singular: 'catégorie',
    plural: 'Catégories',
    placeholder: 'Nouvelle catégorie',
  },
  brand: {
    singular: 'marque',
    plural: 'Marques',
    placeholder: 'Nouvelle marque',
  },
}

function TaxonomySection({ type, items, onAdd, onDelete, deletingId }) {
  const labels = resourceLabels[type]
  const [name, setName] = useState('')
  const [state, setState] = useState({ status: 'idle', error: null })

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmedName = name.trim()

    if (!trimmedName || trimmedName.length > 60) {
      setState({
        status: 'error',
        error: `Le nom de la ${labels.singular} doit contenir de 1 à 60 caractères.`,
      })
      return
    }

    setState({ status: 'loading', error: null })

    try {
      await onAdd(trimmedName)
      setName('')
      setState({ status: 'success', error: null })
    } catch (error) {
      setState({ status: 'error', error: error.message })
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer la ${labels.singular} « ${item.name} » ?`)) {
      return
    }

    try {
      await onDelete(item.id)
    } catch (error) {
      setState({ status: 'error', error: error.message })
    }
  }

  return (
    <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
          <span aria-hidden="true" className="text-xl font-bold">{type === 'category' ? '⌂' : '◆'}</span>
        </span>
        <h2 className="text-xl font-extrabold text-[#111111]">{labels.plural}</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
        <Input
          label={`Ajouter une ${labels.singular}`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={labels.placeholder}
          maxLength={60}
          required
          className="min-h-[46px]"
          containerClassName="min-w-0 flex-1"
        />
        <Button type="submit" disabled={state.status === 'loading'} className="sm:shrink-0">
          {state.status === 'loading' ? 'Ajout...' : 'Ajouter'}
        </Button>
      </form>

      {state.error && (
        <p role="alert" className="mt-4 rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-3 text-sm text-[#8F251D]">
          {state.error}
        </p>
      )}

      {items.length === 0 ? (
        <p className="mt-5 rounded-xl border border-dashed border-[#D7D0C5] bg-[#F7F5F0] p-5 text-center text-sm text-[#5B5B5B]">
          Aucune {labels.singular} disponible.
        </p>
      ) : (
        <ul className="mt-5">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 border-t border-[#E6E1D8] py-3">
              <span className="min-w-0 flex-1 break-words font-bold text-[#111111]">{item.name}</span>
              <span className="shrink-0 rounded-full border border-[#E6E1D8] bg-[#FAF8F3] px-3 py-1 text-xs text-[#5B5B5B]">
                {item.productCount} produit{item.productCount > 1 ? 's' : ''}
              </span>
              <Button
                type="button"
                variant="stationerySecondary"
                onClick={() => handleDelete(item)}
                disabled={deletingId === `${type}-${item.id}`}
                className="min-h-[40px] shrink-0 border-[#E7A39C] px-3 py-2 text-xs text-[#C8141B] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deletingId === `${type}-${item.id}` ? 'Suppression...' : 'Supprimer'}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default function AdminTaxonomyPage() {
  const [result, setResult] = useState({ status: 'loading', categories: [], brands: [], error: null })
  const [deletingId, setDeletingId] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    let isCurrent = true

    Promise.all([getCategories(), getBrands()])
      .then(([categories, brands]) => {
        if (isCurrent) {
          setResult({ status: 'success', categories, brands, error: null })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setResult({ status: 'error', categories: [], brands: [], error })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [retryCount])

  async function handleAdd(type, name) {
    const item = type === 'category'
      ? await createAdminCategory(name)
      : await createAdminBrand(name)

    setResult((current) => ({
      ...current,
      [type === 'category' ? 'categories' : 'brands']: [
        ...current[type === 'category' ? 'categories' : 'brands'],
        item,
      ].sort((first, second) => first.name.localeCompare(second.name, 'fr')),
    }))
  }

  async function handleDelete(type, id) {
    setDeletingId(`${type}-${id}`)

    try {
      if (type === 'category') {
        await deleteAdminCategory(id)
      } else {
        await deleteAdminBrand(id)
      }

      const key = type === 'category' ? 'categories' : 'brands'
      setResult((current) => ({
        ...current,
        [key]: current[key].filter((item) => item.id !== id),
      }))
    } finally {
      setDeletingId(null)
    }
  }

  if (result.status === 'loading') {
    return <LoadingState message="Chargement des catégories et des marques..." />
  }

  if (result.status === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-5 text-sm text-[#8F251D]">
        <p>{result.error.message}</p>
        <Button
          variant="stationerySecondary"
          onClick={() => setRetryCount((count) => count + 1)}
          className="mt-4 min-h-0 px-3 py-2 text-xs text-[#C8141B]"
        >
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Catégories et marques</h1>
          <p className="mt-2 text-sm text-[#5B5B5B]">Ajoutez ou supprimez les options du catalogue.</p>
        </div>
        <Link to="/admin" className="text-sm font-bold text-[#C8141B]">Retour aux produits</Link>
      </header>

      <div className="grid gap-6 xl:grid-cols-2">
        <TaxonomySection
          type="category"
          items={result.categories}
          onAdd={(name) => handleAdd('category', name)}
          onDelete={(id) => handleDelete('category', id)}
          deletingId={deletingId}
        />
        <TaxonomySection
          type="brand"
          items={result.brands}
          onAdd={(name) => handleAdd('brand', name)}
          onDelete={(id) => handleDelete('brand', id)}
          deletingId={deletingId}
        />
      </div>
    </div>
  )
}
