// src/pages/ClientPage.jsx
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useAuth } from "../hooks/useAuth"
import FullScreenLoader from "../components/FullScreenLoader"

function ClientPage() {
  const { user } = useAuth()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!user?.phone) {
        setError("Usuario no válido")
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("phone", user.phone)
          .maybeSingle()

        if (error) {
          console.error("Error fetching admin:", error)
          setError("No se pudo obtener el admin")
          setLoading(false)
          return
        }

        if (!data) {
          setError("Admin no encontrado")
          setLoading(false)
          return
        }

        setAdmin(data)
      } catch (err) {
        console.error("Unexpected fetch error:", err)
        setError("Ocurrió un error inesperado")
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [user])

  return (
    <>
      <FullScreenLoader loading={loading} />
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        admin && (
          <div>
            <h1>Bienvenido, {admin.name}</h1>
            <p>Teléfono: {admin.phone}</p>
          </div>
        )
      )}
    </>
  )
}

export default ClientPage
