import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import LoadingState from '../ui/LoadingState'
import { clearAdminToken, getAdminToken } from '../../services/auth'
import { getCurrentAdmin } from '../../services/api'

export default function RequireAdmin() {
  const location = useLocation()
  const [state, setState] = useState(() => ({
    status: getAdminToken() ? 'loading' : 'unauthenticated',
    admin: null,
  }))

  useEffect(() => {
    let isCurrent = true

    if (!getAdminToken()) {
      return () => {
        isCurrent = false
      }
    }

    getCurrentAdmin()
      .then((admin) => {
        if (isCurrent) {
          setState({ status: 'authenticated', admin })
        }
      })
      .catch((error) => {
        if (isCurrent) {
          if (error.status === 401) {
            clearAdminToken()
          }
          setState({ status: 'error', admin: null })
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  if (state.status === 'loading') {
    return <LoadingState message="Vérification de la session..." />
  }

  if (state.status !== 'authenticated') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet context={{ admin: state.admin }} />
}
