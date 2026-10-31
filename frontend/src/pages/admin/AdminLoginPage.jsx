import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { getAdminToken, saveAdminToken } from '../../services/auth'
import { getCurrentAdmin, loginAdmin } from '../../services/api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [state, setState] = useState({ status: 'idle', error: null })
  const [sessionCheck, setSessionCheck] = useState(() => (
    getAdminToken() ? 'checking' : 'anonymous'
  ))

  useEffect(() => {
    if (!getAdminToken()) {
      return
    }

    getCurrentAdmin()
      .then(() => setSessionCheck('authenticated'))
      .catch(() => setSessionCheck('anonymous'))
  }, [])

  if (sessionCheck === 'authenticated') {
    return <Navigate to="/admin" replace />
  }

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setState({ status: 'loading', error: null })

    try {
      const { token } = await loginAdmin(form.email, form.password)
      saveAdminToken(token)
      const destination = location.state?.from?.pathname ?? '/admin'
      navigate(destination, { replace: true })
    } catch (error) {
      setState({ status: 'error', error: error.message })
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-[#E6E1D8] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#C8141B]">Espace admin</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#111111]">Connexion</h1>
        <p className="mt-2 text-sm text-[#5B5B5B]">Connectez-vous pour gérer le catalogue.</p>
      </div>

      {state.error && (
        <div role="alert" className="mb-5 rounded-xl border border-[#E7A39C] bg-[#FFF1EF] p-3 text-sm text-[#8F251D]">
          {state.error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Adresse e-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <Input
          label="Mot de passe"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <Button type="submit" disabled={state.status === 'loading'} className="w-full">
          {state.status === 'loading' ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
    </div>
  )
}
