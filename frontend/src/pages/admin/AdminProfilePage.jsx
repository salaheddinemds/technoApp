import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { updateCurrentAdmin } from '../../services/api'

export default function AdminProfilePage() {
  const { admin } = useOutletContext()
  const [form, setForm] = useState({
    email: admin.email ?? '',
    name: admin.name ?? '',
    firstName: admin.firstName ?? '',
    phone: admin.phone ?? '',
  })
  const [state, setState] = useState({ status: 'idle', error: null, message: null })

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setState({ status: 'loading', error: null, message: null })

    try {
      const updatedAdmin = await updateCurrentAdmin({
        ...form,
        email: form.email.trim(),
        name: form.name.trim(),
        firstName: form.firstName.trim(),
        phone: form.phone.trim(),
      })
      setForm({
        email: updatedAdmin.email,
        name: updatedAdmin.name,
        firstName: updatedAdmin.firstName,
        phone: updatedAdmin.phone,
      })
      setState({ status: 'success', error: null, message: 'Profil mis à jour.' })
    } catch (error) {
      setState({ status: 'error', error: error.message, message: null })
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Mon profil</h1>
          <p className="mt-2 text-sm text-[#5B5B5B]">Consultez et modifiez vos informations administrateur.</p>
        </div>
        <Link to="/admin" className="text-sm font-bold text-[#C8141B]">Retour aux produits</Link>
      </header>

      <section className="rounded-2xl border border-[#E6E1D8] bg-white p-5 shadow-sm sm:p-8">
        {state.error && (
          <div role="alert" className="mb-5 rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-3 text-sm text-[#8F251D]">
            {state.error}
          </div>
        )}
        {state.message && (
          <div role="status" className="mb-5 rounded-xl border border-[#A9D8B9] bg-[#F0FFF4] p-3 text-sm text-[#287B4D]">
            {state.message}
          </div>
        )}

        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
          <Input label="Nom" name="name" value={form.name} onChange={handleChange} maxLength={80} required />
          <Input label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} maxLength={80} required />
          <Input label="Téléphone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
          <Input label="Adresse e-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
          <div className="sm:col-span-2">
            <Button type="submit" disabled={state.status === 'loading'}>
              {state.status === 'loading' ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
