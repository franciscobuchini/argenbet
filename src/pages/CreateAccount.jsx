// src/pages/CreateAccount.jsx
import { useState } from "react"
import Layout from "../components/Layout"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Icon } from "@iconify/react"

function CreateAccount() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [title, setTitle] = useState("")
  const [countryCode, setCountryCode] = useState("+54")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    setError("")

    if (!phone || !password || !title) {
      setError("Completa todos los campos")
      return
    }

    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    setLoading(true)
    try {
      const trimmedPhone = phone.trim()

      // Verificar si el usuario ya existe
      const { data: existingUser, error: fetchError } = await supabase
        .from("admins")
        .select("*")
        .eq("phone", trimmedPhone)
        .maybeSingle()

      if (fetchError) {
        setError("Error al verificar usuario existente")
        setLoading(false)
        return
      }

      if (existingUser) {
        setError("El teléfono ya está registrado")
        setLoading(false)
        return
      }

      // Insertar nuevo administrador con valores por defecto
      const newAdmin = {
        phone: trimmedPhone,
        password,
        title: title,
        plan: "trial",
        platform_top: [],
        platforms_rest: [],
        min_deposit: 0
      }

      const { data, error } = await supabase
        .from("admins")
        .insert([{
          phone: phone.trim(),
          password,
          title: title,
          plan: "trial",
          platform_top: [],
          platforms_rest: [],
          min_deposit: 0
        }])
        .select()
        .maybeSingle()

      if (error || !data) {
        console.error("Supabase insert error:", error)
        setError("No se pudo crear la cuenta")
        setLoading(false)
        return
      }

      login(data)
      navigate(`/${trimmedPhone}/admin`)
    } catch (err) {
      console.error("Unexpected create account error:", err)
      setError("Ocurrió un error, intenta de nuevo")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg shadow-violet-500/20 p-8 w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
              alt="BetBase Logo"
              className="h-12 w-auto max-w-full object-contain"
            />
          </div>

          {/* Título */}
          <h2 className="font-clash text-center mb-4 font-semibold text-xl">
            Crear administrador nuevo
          </h2>

          <form onSubmit={handleCreateAccount} className="flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Nombre del sitio"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none w-full"
            />

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

            {/* Checkbox términos y condiciones */}
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="accent-violet-500"
              />
              Acepto los{" "}
              <a
                href="/terminos_y_condiciones"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                términos y condiciones
              </a>
            </label>

            <div className="h-6">
              {error && <p className="text-red-300 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-casino-primary py-4 rounded-lg font-bold cursor-pointer hover:bg-violet-600 transition disabled:opacity-50"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default CreateAccount
