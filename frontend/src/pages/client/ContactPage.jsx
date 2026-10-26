export default function ContactPage() {
  return (
    <div className="design-rise space-y-8">
      <section className="design-gradient-shift relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[#C8141B] via-[#D71920] to-[#F0561E] p-6 text-white shadow-sm sm:p-8">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-60 w-60 rounded-full bg-white/15" />
        <div className="relative">
          <div className="mb-2 text-sm text-white/80">Accueil · Contact</div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Contactez-nous</h1>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="design-lift flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]">
              <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </span>
          <h2 className="text-lg font-bold text-[#111111]">Adresse</h2>
          <p className="text-sm leading-6 text-[#5B5B5B]">Cité les Mandarines lot N 280, Pins Maritimes, Alger</p>
        </article>

        <article className="design-lift flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]">
              <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
            </svg>
          </span>
          <h2 className="text-lg font-bold text-[#111111]">Téléphone</h2>
          <p className="text-sm leading-6 text-[#5B5B5B]">+213 550 07 07 08</p>
        </article>

        <article className="design-lift flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] text-[#111111]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </span>
          <h2 className="text-lg font-bold text-[#111111]">E-mail</h2>
          <p className="break-all text-sm leading-6 text-[#5B5B5B]">contact@TechnoStationery.com</p>
        </article>

        <article className="design-lift flex flex-col gap-3 rounded-2xl border border-[#E6E1D8] bg-white p-5">
          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] text-[#111111]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <h2 className="text-lg font-bold text-[#111111]">Horaires</h2>
          <p className="text-sm leading-6 text-[#5B5B5B]">[Jours et heures d'ouverture]</p>
        </article>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />
              </svg>
            </span>
            <h2 className="min-w-0 text-xl font-extrabold text-[#111111] sm:text-2xl">Suivez-nous et écrivez-nous</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="design-lift flex items-center gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#111111] to-[#3A3A3A] text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path d="M14 8h3V5h-3a5 5 0 0 0-5 5v2H6v3h3v6h3v-6h3l1-3h-4v-2a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-[#111111]">Facebook</h3>
                <p className="mt-1 text-sm text-[#5B5B5B]">[Lien de la page Facebook]</p>
                <span className="mt-2 inline-flex rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-3 py-2 text-sm font-semibold text-white">Suivre</span>
              </div>
            </article>

            <article className="design-lift flex items-center gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-5">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0561E] to-[#D71920] text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-[#111111]">Instagram</h3>
                <p className="mt-1 text-sm text-[#5B5B5B]">[@compte Instagram]</p>
              </div>
            </article>

            <article className="design-lift flex items-center gap-4 rounded-2xl border border-[#E6E1D8] bg-white p-5 sm:col-span-2">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#111111] to-[#3A3A3A] text-white">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z" />
                  <path d="M8 12h.01M12 12h.01M16 12h.01" />
                </svg>
              </span>
              <div className="min-w-0">
                <h3 className="font-bold text-[#111111]">Messenger</h3>
                <p className="mt-1 text-sm text-[#5B5B5B]">[Lien Messenger]</p>
                <span className="mt-2 inline-flex rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-3 py-2 text-sm font-semibold text-white">Écrire</span>
              </div>
            </article>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br from-[#F3EFE7] to-[#E2DCCF] p-8 text-center text-[#5B5B5B]">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="#D71920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-14 w-14">
              <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <p>[Carte : emplacement de la marque]</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#C8141B] to-[#DC3A17] px-5 py-3 text-[15px] font-semibold text-white">
              Appeler
            </span>
            <span className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] bg-gradient-to-br from-[#FFD400] to-[#FF9F1C] px-5 py-3 text-[15px] font-semibold text-[#111111]">
              WhatsApp
            </span>
            <span className="design-button inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[10px] border border-[#E6E1D8] bg-white px-5 py-3 text-[15px] font-semibold text-[#111111]">
              Écrire un e-mail
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
