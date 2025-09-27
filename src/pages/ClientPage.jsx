// src/pages/ClientPage.jsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import FullScreenLoader from "../components/FullScreenLoader"
import PlatformsGrid from "../components/client/PlatformsGrid"
import Header from "../components/client/Header"
import PLATFORMS from "../data/platforms.json"
import Layout from "../components/Layout"

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

  const platformTopName = Array.isArray(admin.platform_top)
    ? admin.platform_top[0]
    : admin.platform_top || null

  const platformTop =
    PLATFORMS.find(p => p.name.trim() === platformTopName?.trim()) || null

  const platformsRest =
    (admin.platforms_rest || [])
      .map(name => PLATFORMS.find(p => p.name.trim() === name.trim()))
      .filter(Boolean)

  return (
    
    <div className="min-h-screen flex flex-col">
  {/* HEADER */}
  <header className="flex flex-col">
    <Header title={admin.title} />
  </header>

  <Layout>
    <main className="w-full max-w-3xl mx-auto">
      <PlatformsGrid
        contact={admin.phone}
        platformTop={platformTop}
        platformsRest={platformsRest}
      />
    </main>
  </Layout>

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
      <header className="flex flex-col">
        <div className="p-4 bg-gray-100">
          <h1 className="text-xl font-bold">{phone}</h1>
          <p className="text-sm">
            Estado:{" "}
            <span className={available ? "text-green-600" : "text-red-600"}>
              {available ? "Disponible" : "No disponible"}
            </span>
          </p>
        </div>
        <EventTicker />
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
