import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { getAdminToken, saveAdminToken } from '../../services/auth'
import { getCurrentAdmin, loginAdmin } from '../../services/api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
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

      {location.state?.message && (
        <div role="status" className="mb-5 rounded-xl border border-[#A9D8B9] bg-[#F0FFF4] p-3 text-sm text-[#287B4D]">
          {location.state.message}
        </div>
      )}

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
        <label htmlFor="password" className="block text-sm font-medium text-[#202020]">
          <span className="mb-2 block">Mot de passe</span>
          <span className="relative block">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              className="w-full rounded-md border border-[#d9d0c6] bg-white px-3 py-2.5 pr-12 text-sm text-[#1f1f1f] outline-none transition focus:border-[#b8aca0]"
            />
            <button
              type="button"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-[#5B5B5B] transition hover:text-[#C8141B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD400]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                {showPassword ? (
                  <>
                    <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </>
                ) : (
                  <>
                    <path d="M3 3l18 18" />
                    <path d="M10.6 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-3.1 3.8M6.2 6.2C3.9 7.7 2.5 12 2.5 12a17 17 0 0 0 5.2 4.9A10.7 10.7 0 0 0 12 19c1.1 0 2.1-.2 3-.5" />
                    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                  </>
                )}
              </svg>
            </button>
          </span>
        </label>
        <Button type="submit" disabled={state.status === 'loading'} className="w-full">
          {state.status === 'loading' ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-[#5B5B5B]">
        Nouveau administrateur ?{' '}
        <Link to="/admin/signup" className="font-bold text-[#C8141B] hover:underline">
          Créer un compte
        </Link>
      </p>
    </div>
  )
}
