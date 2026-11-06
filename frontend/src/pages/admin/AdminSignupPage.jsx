import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { signupAdmin } from '../../services/api'

export default function AdminSignupPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    firstName: '',
    phone: '',
    email: '',
    password: '',
    signupCode: '',
  })
  const [state, setState] = useState({ status: 'idle', error: null })

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setState({ status: 'loading', error: null })

    if (form.password.length < 12) {
      setState({ status: 'error', error: 'Le mot de passe doit contenir au moins 12 caractères.' })
      return
    }

    try {
      await signupAdmin({
        ...form,
        name: form.name.trim(),
        firstName: form.firstName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
      })
      navigate('/admin/login', {
        replace: true,
        state: { message: 'Compte créé. Vous pouvez maintenant vous connecter.' },
      })
    } catch (error) {
      setState({ status: 'error', error: error.message })
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-sm sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Créer un compte</h1>
      <p className="mt-2 text-sm text-[#5B5B5B]">L’inscription nécessite le code fourni par le responsable.</p>

      {state.error && (
        <div role="alert" className="mt-5 rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-3 text-sm text-[#8F251D]">
          {state.error}
        </div>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Nom" name="name" value={form.name} onChange={handleChange} maxLength={80} required />
        <Input label="Prénom" name="firstName" value={form.firstName} onChange={handleChange} maxLength={80} required />
        <Input label="Téléphone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
        <Input label="Adresse e-mail" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Mot de passe" name="password" type="password" value={form.password} onChange={handleChange} minLength={12} required />
        <Input label="Code d’inscription" name="signupCode" type="password" value={form.signupCode} onChange={handleChange} required />
        <Button type="submit" disabled={state.status === 'loading'} className="w-full">
          {state.status === 'loading' ? 'Création...' : 'Créer le compte'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-[#5B5B5B]">
        Déjà inscrit ?{' '}
        <Link to="/admin/login" className="font-bold text-[#C8141B] hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
