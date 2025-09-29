// src/components/ProtectedRoute.jsx
import { Navigate, Outlet, useParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute() {
  const { user } = useAuth()
  const { phone } = useParams()

  // no logueado → redirige al login
  if (!user) return <Navigate to="/admin" replace />

  // logueado pero con phone que no coincide → redirige también
  if (user.phone !== phone) return <Navigate to="/admin" replace />

  return <Outlet />
}

export default ProtectedRoute
