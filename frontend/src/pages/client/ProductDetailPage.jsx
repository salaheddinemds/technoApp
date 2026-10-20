import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import LoadingState from '../../components/ui/LoadingState'
import { getProductBySlug } from '../../services/api'

function formatPrice(value) {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [result, setResult] = useState({ slug: null, product: null, error: null })
  const [selectedImage, setSelectedImage] = useState(null)
  const product = result.slug === slug ? result.product : null
  const error = result.slug === slug ? result.error : null
  const isLoading = result.slug !== slug

  useEffect(() => {
    let isCurrent = true

    getProductBySlug(slug)
      .then((data) => {
        if (isCurrent) {
          setResult({ slug, product: data, error: null })
          setSelectedImage(data.images[0] ?? null)
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setResult({ slug, product: null, error: requestError })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [slug])

  if (isLoading) {
    return <LoadingState message="Chargement du produit..." />
  }

  if (error) {
    return (
      <div className="rounded-[18px] border border-[#e7a39c] bg-[#fff1ef] p-10 text-center">
        <h1 className="text-2xl font-black uppercase text-[#c52e20]">Produit indisponible</h1>
        <p className="mt-3 text-[#5b2a25]">{error.message}</p>
        <Link to="/produits" className="mt-6 inline-flex rounded-md bg-[#ef3b2d] px-5 py-3 text-sm font-bold uppercase text-white">
          Voir les produits
        </Link>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f5f2ee] p-10 text-center">
        <h1 className="text-5xl font-black uppercase text-[#ef3b2d]">404</h1>
        <p className="mt-4 text-2xl font-bold text-[#1b1b1b]">Oups, cette page n’existe pas</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="rounded-md bg-[#ef3b2d] px-5 py-3 text-sm font-bold uppercase text-white">Retour à l’accueil</Link>
          <Link to="/produits" className="rounded-md border border-[#d7d0c5] bg-white px-5 py-3 text-sm font-bold uppercase text-[#1d1d1d]">Voir les produits</Link>
        </div>
      </div>
    )
  }

  const image = selectedImage ?? product.images[0]
  const contactMessage = encodeURIComponent(`Bonjour, je souhaite obtenir des informations sur ${product.name}.`)

  return (
    <div className="space-y-8">
      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f3efe9] p-6">
        <div className="mb-4 text-sm text-[#4d4d4d]">Accueil · {product.category.name} · {product.name}</div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[14px] border border-[#d7d0c5] bg-[#eae3da] p-4">
            {image ? (
              <img src={image.url} alt={product.name} className="h-[420px] w-full rounded-xl object-cover" />
            ) : (
              <div className="flex h-[420px] items-center justify-center rounded-xl bg-[#dfd7cf] text-sm text-[#5d5d5d]">
                Aucune photo disponible
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-3">
              {product.images.map((productImage) => (
                <button
                  key={productImage.id}
                  type="button"
                  onClick={() => setSelectedImage(productImage)}
                  className={`h-14 w-14 overflow-hidden rounded-md border-2 bg-[#f0ece7] ${selectedImage?.id === productImage.id ? 'border-[#ef3b2d]' : 'border-[#d7d0c5]'}`}
                >
                  <img src={productImage.url} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="inline-flex rounded-full bg-[#f5cc2b] px-2 py-1 text-[10px] font-black uppercase tracking-widest text-[#1d1d1d]">
              {product.category.name}
            </div>
            <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-[#1d1d1d]">
              {product.name}
            </h1>
            <div className="mt-5 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
              <span className="text-xl font-medium text-[#484848]">À partir de</span>
              <span className="text-3xl font-black text-[#1e1e1e]">{formatPrice(product.price)}</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-base font-medium text-[#1d1d1d]">
              <span className={`inline-block h-3 w-3 rounded-full ${product.inStock ? 'bg-[#3aa86b]' : 'bg-[#e2574d]'}`} />
              {product.inStock ? 'En stock' : 'Rupture de stock'}
            </div>

            {product.description && (
              <div className="mt-6 rounded-xl border border-[#d7d0c5] bg-white p-4 text-sm leading-6 text-[#2a2a2a]">
                <div className="mb-2 text-lg font-black uppercase text-[#1c1c1c]">Description</div>
                <p>{product.description}</p>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-[#d7d0c5] bg-white p-4 text-sm text-[#2a2a2a]">
              <div className="mb-3 text-lg font-black uppercase text-[#1c1c1c]">Caractéristiques</div>
              <div className="grid gap-2">
                {Object.entries(product.specs ?? {}).map(([name, value]) => (
                  <div key={name} className="flex items-center justify-between gap-4 border-b border-[#ece7e1] pb-2 last:border-0">
                    <span>{name}</span>
                    <span className="text-right font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="tel:+213550070708"><Button>Appeler</Button></a>
              <a href={`https://wa.me/213550070708?text=${contactMessage}`} target="_blank" rel="noreferrer">
                <Button variant="tertiary">WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f5f2ee] p-6">
        <h2 className="mb-5 text-3xl font-black uppercase text-[#1c1c1c]">Besoin d’aide ?</h2>
        <p className="text-sm text-[#4d4d4d]">Contactez-nous pour connaître la disponibilité et les conditions de livraison de ce produit.</p>
      </div>
    </div>
  )
}
