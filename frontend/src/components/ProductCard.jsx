import { Link } from 'react-router-dom'

function formatPrice(value) {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProductCard({ product, tag = 'Nouveau' }) {
  return (
    <article className="rounded-[18px] border border-[#d8d0c5] bg-[#f0ece7] p-3 shadow-sm">
      <div className="relative overflow-hidden rounded-[12px] bg-[#dfd7cf]">
        <div className="absolute left-2 top-2 z-10 rounded-full bg-[#f5cc2b] px-2 py-1 text-[10px] font-bold uppercase text-[#1d1d1d]">
          {tag}
        </div>
        <div className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-white/85 text-sm text-[#202020]">
          🖼️
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
      </div>

      <div className="mt-4 text-left">
        <div className="inline-flex rounded-full bg-[#f5cc2b] px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[#1f1f1f]">
          {product.brand.name}
        </div>

        <h3 className="mt-3 text-[1.05rem] font-black uppercase leading-tight text-[#1c1c1c]">
          {product.name}
        </h3>

        <div className="mt-3 text-sm text-[#2b2b2b]">
          <span className="font-medium">À partir de </span>
          <span className="font-black text-[#1e1e1e]">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#1f1f1f]">
          <span className={`inline-block h-2 w-2 rounded-full ${product.inStock ? 'bg-[#3aa86b]' : 'bg-[#e2574d]'}`} />
          {product.inStock ? 'En stock' : 'Rupture'}
        </div>

        <Link
          to={`/produits/${product.slug}`}
          className="mt-4 flex w-full items-center justify-center rounded-md bg-[#ef3b2d] px-4 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#d52f20]"
        >
          Voir le produit →
        </Link>
      </div>
    </article>
  )
}
