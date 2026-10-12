import { Link } from 'react-router-dom'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/ui/Button'
import { mockCategories, mockProducts } from '../../data/mockProducts'

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4)

  return (
    <div className="space-y-8 py-2">
      <section className="overflow-hidden rounded-[18px] bg-gradient-to-r from-[#e2261d] via-[#ea4a2d] to-[#f59a5a] p-6 text-white shadow-sm lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-[#f5cc2b] px-3 py-1 text-[10px] font-black uppercase text-[#1d1d1d]">
              Nouveautés tech
            </div>
            <h1 className="max-w-[500px] text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl">
              La tech qui fait la différence
            </h1>
            <p className="mt-4 text-base text-white/90">
              Accessoires premium pour le travail, la mobilité et la maison connectée.
            </p>
            <div className="mt-6">
              <Link
                to="/produits"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-bold uppercase text-[#1f1f1f] shadow-sm"
              >
                Voir le catalogue →
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[18px] bg-[#f5cc2b] p-5 text-[#1f1f1f]">
              <div className="text-sm font-bold uppercase">Offre de lancement</div>
              <div className="mt-1 text-sm">-20% sur les accessoires connectés</div>
            </div>
            <div className="rounded-[18px] bg-[#1d1d1d] p-5 text-white">
              <div className="text-sm font-bold uppercase">Livraison express</div>
              <div className="mt-1 text-sm text-white/80">Sous 48h partout en Algérie</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          'Qualité garantie',
          'Produits sélectionnés',
          'Contact direct',
          'Livraison rapide',
        ].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-[14px] border border-[#d7d0c5] bg-[#f3efe9] p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5cc2b] text-sm">{['✓', '★', '☎', '🚚'][index]}</div>
            <span className="text-sm text-[#1c1c1c]">{item}</span>
          </div>
        ))}
      </section>

      <section className="pt-2">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase text-[#1c1c1c]">Catégories</h2>
          <Link to="/produits" className="text-sm font-bold uppercase text-[#1d1d1d] hover:text-[#000]">
            Voir tout →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockCategories.map((category) => (
            <div key={category.slug} className="rounded-[14px] border border-[#d7d0c5] bg-[#f5f2ee] p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ef3b2d] text-lg text-white">▣</div>
              <h3 className="mt-4 text-lg font-black uppercase text-[#1c1c1c]">{category.name}</h3>
              <p className="mt-2 text-sm text-[#4d4d4d]">{mockProducts.filter((item) => item.category.slug === category.slug).length} produits</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-2">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase text-[#1c1c1c]">Meilleures ventes</h2>
          <Link to="/produits" className="text-sm font-bold uppercase text-[#1d1d1d] hover:text-[#000]">
            Voir tout →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} tag="Nouveau" />
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[16px] bg-[#ec3b2a] px-6 py-5 text-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-2xl font-black uppercase">Une question sur un produit ?</h3>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white text-[#1a1a1a]">WhatsApp</Button>
            <Button variant="tertiary" className="bg-[#f5cc2b] text-[#1a1a1a]">Appeler</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
