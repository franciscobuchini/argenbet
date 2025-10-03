// src/pages/LoginPage.jsx
import { useState } from "react"
import Layout from "../components/Layout"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Icon } from "@iconify/react"
import contacts from "../data/contact.json"

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState("+54")
  const fullPhone = `${countryCode}${phone.trim()}`

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!phone || !password) {
      setError("Completa todos los campos")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("phone", phone.trim())
        .eq("password", password)
        .maybeSingle()

      if (error) {
        setError("Error al verificar credenciales")
        setLoading(false)
        return
      }

      if (!data) {
        setError("Teléfono o contraseña incorrectos")
        setLoading(false)
        return
      }

      login(data)
      navigate(`/${phone}/admin`)
    } catch (err) {
      console.error("Unexpected login error:", err)
      setError("Ocurrió un error, intenta de nuevo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg shadow-violet-500/20 p-8 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
              alt="BetBase Logo"
              className="h-12 w-auto max-w-full object-contain"
            />
          </div>
          <h2 className="font-clash text-left mb-4 font-semibold">Iniciar sesión</h2>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex w-full">
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-16 sm:w-20 pl-2 rounded-l-lg bg-white/10 placeholder-white/60 text-white focus:outline-none text-center"
              />
              <input
                type="number"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 pl-2 p-4 rounded-r-lg bg-white/10 placeholder-white/60 text-white focus:outline-none min-w-0"
              />
            </div>

            {/* Input contraseña con ojo */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
                  width="20"
                  height="20"
                />
              </button>
            </div>

            {/* Espacio reservado para error */}
            <div className="h-6">
              {error && <p className="text-red-300 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-casino-primary py-4 rounded-lg font-bold cursor-pointer hover:bg-violet-600 transition disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          {/* Links abajo */}
          <div className="mt-4 flex flex-col sm:flex-row gap-6 justify-center">
            <button
              type="button"
              onClick={() => navigate("/nuevo")}
              className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
            >
              Nuevo administrador
            </button>

            <button
              type="button"
              onClick={() => window.open(`https://wa.me/${contacts.supportContact}`, "_blank")}
              className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
            >
              Contactar soporte
            </button>
          </div>

          {/* Botón volver */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPage
