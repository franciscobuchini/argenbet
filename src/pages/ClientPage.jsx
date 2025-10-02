import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import FullScreenLoader from "../components/FullScreenLoader"
import PlatformsGrid from "../components/client/PlatformsGrid"
import Header from "../components/client/Header"
import PLATFORMS from "../data/platforms.json"
import Layout from "../components/Layout"
import AvailabilityStatus from "../components/client/AvailabilityStatus"
import FooterInfo from "../components/client/FooterInfo"
import WhatsAppButton from "../components/client/WhatsAppButton"
import CONTACT from "../data/contact.json"

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

  const isPro = admin.plan === "pro" || admin.plan === "trial"

  // Platform Top: siempre mostrar (aunque solo haya 1 en el array)
  const platformTop =
    admin.platform_top?.[0]
      ? {
          ...PLATFORMS.find(p => p.name === admin.platform_top[0].name),
          url: admin.platform_top[0].url
        }
      : null

  // Platforms rest: array de objetos { name, url, image? }
  const platformsRest = isPro
    ? (admin.platforms_rest || [])
        .map(pObj => {
          const base = PLATFORMS.find(p => p.name === pObj.name)
          return base ? { ...base, url: pObj.url } : null
        })
        .filter(Boolean)
    : PLATFORMS.filter(p => !platformTop || p.name !== platformTop.name)

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header title={admin.title} />
      </header>

      <Layout>
        <main className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          <AvailabilityStatus
            title={admin.title}
            scheduleStart={admin.schedule_start}
            scheduleEnd={admin.schedule_end}
            minDeposit={admin.min_deposit}
          />

          <PlatformsGrid
            contact={isPro ? admin.phone : CONTACT.freeContact} // Plan free: ContactoDeConfianza
            platformTop={platformTop}
            platformsRest={platformsRest}
            containerClassName="w-full"
          />
        </main>
      </Layout>

      <FooterInfo />
      <WhatsAppButton phone={isPro ? admin.phone : CONTACT.freeContact} />
    </div>
  )
}

function renderGenericFallback(phone) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="px-4 py-10">
          <h1 className="font-clash text-xl font-bold">{phone}</h1>
        </div>
      </header>
      <img
        src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
        alt="Logo"
        className="h-12 object-contain"
      />

      <main className="flex-1 p-4">
        <p className="text-gray-600">Admin no encontrado</p>
      </main>
    </div>
  )
}

export default ClientPage
