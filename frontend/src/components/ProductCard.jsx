import { Link } from 'react-router-dom'
import { useState } from 'react'

function formatPrice(value) {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: 'DZD',
    maximumFractionDigits: 0,
  }).format(value)
}

export default function ProductCard({ product, tag = 'Nouveau' }) {
  const [failedImage, setFailedImage] = useState(null)

  return (
    <article className="design-lift group flex h-full flex-col rounded-2xl border border-[#E6E1D8] bg-white p-3.5 shadow-sm">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F3EFE7] to-[#E2DCCF]">
        <div className="absolute left-2 top-2 z-10 rounded-full bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] px-2.5 py-1 text-[10px] font-bold uppercase text-[#111111]">
          {tag}
        </div>
        {product.image && failedImage !== product.image ? (
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            onError={() => setFailedImage(product.image)}
            className="h-40 w-full object-cover"
          />
        ) : (
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#F3EFE7] to-[#E2DCCF]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-[#9b8c7b]">
              <rect x="3.5" y="4.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m5 17 4-4 3 3 2-2 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col text-left">
        <div className="inline-flex self-start rounded-full bg-[#F7F5F0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#5B5B5B]">
          {product.brand.name}
        </div>

        <h3 className="mt-3 text-base font-extrabold leading-tight text-[#111111]">
          {product.name}
        </h3>

        <div className="mt-3 text-sm text-[#5B5B5B]">
          <span className="font-medium">À partir de </span>
          <span className="font-extrabold text-[#111111]">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-[#111111]">
          <span className={`inline-block h-2 w-2 rounded-full ${product.inStock ? 'bg-[#3aa86b]' : 'bg-[#e2574d]'}`} />
          {product.inStock ? 'En stock' : 'Rupture'}
        </div>

        <div className="mt-auto pt-3">
          <Link
            to={`/produits/${product.slug}`}
            className="design-button flex min-h-[46px] w-full items-center justify-center rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-4 py-3 text-sm font-bold uppercase text-white shadow-sm"
          >
            Voir le produit →
          </Link>
        </div>
      </div>
    </article>
  )
}
