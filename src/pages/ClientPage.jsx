// src/pages/ClientPage.jsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import FullScreenLoader from "../components/FullScreenLoader"
import PlatformsGrid from "../components/client/PlatformsGrid"
import PLATFORMS from "../data/platforms.json"

function ClientPage() {
  const { phone } = useParams()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("phone", phone)
          .maybeSingle()

        if (error) console.error("Error fetching admin:", error)
        setAdmin(data)
      } catch (err) {
        console.error("Unexpected fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [phone])

  if (loading) return <FullScreenLoader loading />
  if (!admin) return renderGenericFallback(phone)

  // --- Usar la columna correcta: platform_top ---
  const platformTopName = Array.isArray(admin.platform_top)
    ? admin.platform_top[0]
    : admin.platform_top || null

  const platformTopObj =
    PLATFORMS.find(p => p.name.trim() === platformTopName?.trim()) || null

  const platformsRest = PLATFORMS.filter(
    p => p.name.trim() !== platformTopName?.trim()
  )

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <h1 className="text-xl font-bold">{admin.title || admin.phone}</h1>
        <p className="text-sm text-gray-600">
          Plan: {admin.plan || "Básico"}
        </p>
      </header>

      <main className="flex-1 p-4">
        <PlatformsGrid
          contact={admin.phone}
          platformTop={platformTopObj}
          platformsRest={platformsRest}
        />
      </main>

      <footer className="p-4 text-sm text-center">
        <p>Contacto: {admin.phone}</p>
      </footer>
    </div>
  )
}

function renderGenericFallback(phone) {
  const available = isAvailable(9, 21)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <h1 className="text-xl font-bold">{phone}</h1>
        <p className="text-sm">
          Estado:{" "}
          <span className={available ? "text-green-600" : "text-red-600"}>
            {available ? "Disponible" : "No disponible"}
          </span>
        </p>
      </header>

      <main className="flex-1 p-4">
        <p className="text-gray-600">Admin no encontrado</p>
      </main>
    </div>
  )
}

function isAvailable(startHour, endHour) {
  const now = new Date()
  const utc3 = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  const hour = utc3.getUTCHours()
  return hour >= startHour && hour < endHour
}

export default ClientPage
