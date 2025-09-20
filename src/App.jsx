// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import ClientPage from "./pages/ClientPage"
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import CreateAccount from "./pages/CreateAccount"
import TermsConditions from "./pages/TermsConditions"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <LoginPage />  // redirige al login si no hay sesión
  return children
}

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
