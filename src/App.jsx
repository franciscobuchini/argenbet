// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { useState, useEffect } from "react"
import ClientPage from "./pages/ClientPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import CreateAccount from "./pages/CreateAccount"
import TermsConditions from "./pages/TermsConditions"
import FullScreenLoader from "./components/FullScreenLoader"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <LoginPage />
  return children
}

function RoutesWithLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 600) // ajusta duración
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (loading) return <FullScreenLoader />

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <LoginPage />
          </PrivateRoute>
        }
      />
      <Route path="/:phone" element={<ClientPage />} />
      <Route path="/:phone/admin" element={<AdminPage />} />
      <Route path="/nuevo" element={<CreateAccount />} />
      <Route path="/terminos_y_condiciones" element={<TermsConditions />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <RoutesWithLoader />
    </Router>
  )
}

export default App
