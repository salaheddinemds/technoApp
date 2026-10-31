import { useOutletContext } from 'react-router-dom'

export default function AdminHomePage() {
  const { admin } = useOutletContext()

  return (
    <section className="rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Bonjour {admin.email}</h1>
      <p className="mt-3 text-[#5B5B5B]">Le tableau de bord sera disponible dans T26.</p>
    </section>
  )
}
