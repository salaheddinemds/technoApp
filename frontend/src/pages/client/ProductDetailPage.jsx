import { Link, useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/ui/Button'
import { mockProducts } from '../../data/mockProducts'

function formatPrice(value) {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = mockProducts.find((item) => item.slug === slug)

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

  return (
    <div className="space-y-8">
      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f3efe9] p-6">
        <div className="mb-4 text-sm text-[#4d4d4d]">Accueil · {product.category.name} · {product.name}</div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[14px] border border-[#d7d0c5] bg-[#eae3da] p-4">
            <img src={product.image} alt={product.name} className="h-105 w-full rounded-xl object-cover" />
            <div className="mt-5 flex gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex h-14 w-14 items-center justify-center rounded-md border border-[#d7d0c5] bg-[#f0ece7] text-xs font-medium text-[#2a2a2a]">
                  {item}
                </div>
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

            <div className="mt-6 rounded-xl border border-[#d7d0c5] bg-white p-4 text-sm text-[#2a2a2a]">
              <div className="mb-3 text-lg font-black uppercase text-[#1c1c1c]">Caractéristiques</div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between border-b border-[#ece7e1] pb-2"><span>Marque</span><span>{product.brand.name}</span></div>
                <div className="flex items-center justify-between border-b border-[#ece7e1] pb-2"><span>Catégorie</span><span>{product.category.name}</span></div>
                <div className="flex items-center justify-between"><span>Garantie</span><span>12 mois</span></div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Appeler</Button>
              <Button variant="tertiary">WhatsApp</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#d7d0c5] bg-[#f5f2ee] p-6">
        <h2 className="mb-5 text-3xl font-black uppercase text-[#1c1c1c]">Produits similaires</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {mockProducts.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} tag="Nouveau" />
          ))}
        </div>
      </div>
    </div>
  )
}
