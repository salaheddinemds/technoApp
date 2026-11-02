import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import LoadingState from '../../components/ui/LoadingState'
import {
  createAdminProduct,
  deleteAdminImage,
  getAdminProduct,
  getBrands,
  getCategories,
  updateAdminProduct,
  uploadAdminProductImages,
} from '../../services/api'

const emptyForm = {
  name: '',
  price: '',
  stock: '',
  categoryId: '',
  brandId: '',
  description: '',
  specs: '{}',
}

function productToForm(product) {
  return {
    name: product.name,
    price: String(product.price),
    stock: String(product.stock),
    categoryId: String(product.category.id),
    brandId: String(product.brand.id),
    description: product.description ?? '',
    specs: JSON.stringify(product.specs ?? {}, null, 2),
  }
}

export default function AdminProductFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [form, setForm] = useState(emptyForm)
  const [options, setOptions] = useState({ categories: [], brands: [] })
  const [images, setImages] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [state, setState] = useState({ status: 'loading', error: null })
  const [saving, setSaving] = useState(false)
  const [deletingImageId, setDeletingImageId] = useState(null)

  useEffect(() => {
    let isCurrent = true

    Promise.all([
      getCategories(),
      getBrands(),
      isEditing ? getAdminProduct(id) : Promise.resolve(null),
    ])
      .then(([categories, brands, product]) => {
        if (!isCurrent) return

        setOptions({ categories, brands })
        if (product) {
          setForm(productToForm(product))
          setImages(product.images ?? [])
        }
        setState({ status: 'success', error: null })
      })
      .catch((error) => {
        if (isCurrent) {
          setState({ status: 'error', error: error.message })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [id, isEditing])

  const previews = useMemo(() => (
    selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) }))
  ), [selectedFiles])

  useEffect(() => () => {
    previews.forEach(({ url }) => URL.revokeObjectURL(url))
  }, [previews])

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleFilesChange(event) {
    const files = Array.from(event.target.files ?? [])
    setSelectedFiles(files)
  }

  async function handleDeleteImage(image) {
    if (!window.confirm('Supprimer cette photo ? Cette action est irréversible.')) return

    setDeletingImageId(image.id)
    try {
      await deleteAdminImage(image.id)
      setImages((current) => current.filter(({ id: imageId }) => imageId !== image.id))
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }))
    } finally {
      setDeletingImageId(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setState({ status: 'success', error: null })

    let specs
    try {
      specs = JSON.parse(form.specs || '{}')
    } catch {
      setState({ status: 'success', error: 'Les caractéristiques doivent être un JSON valide.' })
      return
    }

    if (
      specs === null
      || Array.isArray(specs)
      || typeof specs !== 'object'
      || Object.values(specs).some((value) => typeof value !== 'string')
    ) {
      setState({ status: 'success', error: 'Les caractéristiques doivent être un objet de textes.' })
      return
    }

    const productData = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      brandId: Number(form.brandId),
      description: form.description.trim(),
      specs,
    }

    setSaving(true)
    try {
      const product = isEditing
        ? await updateAdminProduct(id, productData)
        : await createAdminProduct(productData)

      let warning = null
      if (selectedFiles.length > 0) {
        try {
          await uploadAdminProductImages(product.id, selectedFiles)
        } catch (error) {
          warning = `Le produit est enregistré, mais les photos n'ont pas été ajoutées : ${error.message}`
        }
      }

      navigate('/admin', {
        replace: true,
        state: {
          message: isEditing ? 'Produit modifié.' : 'Produit ajouté.',
          warning,
        },
      })
    } catch (error) {
      setState({ status: 'success', error: error.message })
    } finally {
      setSaving(false)
    }
  }

  if (state.status === 'loading') {
    return <LoadingState message="Chargement du formulaire..." />
  }

  if (state.status === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-5 text-sm text-[#8F251D]">
        {state.error}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">
            {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
          </h1>
        </div>
        <Link to="/admin" className="text-sm font-bold text-[#C8141B]">Retour aux produits</Link>
      </header>

      {state.error && (
        <div role="alert" className="rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-4 text-sm text-[#8F251D]">
          {state.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="grid gap-5 rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
          <Input label="Nom du produit" name="name" value={form.name} onChange={handleChange} maxLength={120} required containerClassName="sm:col-span-2" />
          <Input label="Prix (DA)" name="price" type="number" min="0" step="1" value={form.price} onChange={handleChange} required />
          <Input label="Stock" name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required />
          <label className="block text-sm font-medium text-[#202020]">
            <span className="mb-2 block">Catégorie</span>
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 text-sm">
              <option value="">Choisir une catégorie</option>
              {options.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-[#202020]">
            <span className="mb-2 block">Marque</span>
            <select name="brandId" value={form.brandId} onChange={handleChange} required className="w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 text-sm">
              <option value="">Choisir une marque</option>
              {options.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
            </select>
          </label>
          <label className="block text-sm font-medium text-[#202020] sm:col-span-2">
            <span className="mb-2 block">Description</span>
            <textarea name="description" value={form.description} onChange={handleChange} maxLength={5000} rows="5" className="w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 text-sm" />
          </label>
          <label className="block text-sm font-medium text-[#202020] sm:col-span-2">
            <span className="mb-2 block">Caractéristiques (JSON)</span>
            <textarea name="specs" value={form.specs} onChange={handleChange} rows="6" className="w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 font-mono text-sm" aria-describedby="specs-help" />
            <span id="specs-help" className="mt-1 block text-xs text-[#5B5B5B]">Exemple : {`{"Couleur":"Bleu","Format":"A4"}`}</span>
          </label>
        </section>

        <section className="space-y-4 rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-xl font-extrabold">Photos</h2>
            <p className="mt-1 text-sm text-[#5B5B5B]">JPEG, PNG ou WebP, 5 Mio maximum par photo, 8 photos maximum.</p>
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <img src={image.url} alt="Photo du produit" className="aspect-square w-full rounded-lg object-cover" />
                  <Button type="button" variant="stationerySecondary" onClick={() => handleDeleteImage(image)} disabled={deletingImageId === image.id} className="absolute bottom-2 left-2 min-h-0 px-2 py-1 text-[10px] text-[#C8141B]">
                    {deletingImageId === image.id ? '...' : 'Supprimer'}
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Input label="Ajouter des photos" name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFilesChange} />
          {previews.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {previews.map(({ file, url }) => <img key={`${file.name}-${file.lastModified}`} src={url} alt={`Aperçu de ${file.name}`} className="aspect-square w-full rounded-lg object-cover" />)}
            </div>
          )}
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <Link to="/admin" className="inline-flex min-h-[46px] items-center rounded-[10px] border border-[#E6E1D8] bg-white px-5 py-3 text-sm font-bold uppercase">Annuler</Link>
          <Button type="submit" disabled={saving}>{saving ? 'Enregistrement...' : 'Enregistrer le produit'}</Button>
        </div>
      </form>
    </div>
  )
}
