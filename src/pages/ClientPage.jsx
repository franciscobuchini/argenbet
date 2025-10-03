// src/pages/ClientPage.jsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import FullScreenLoader from "../components/FullScreenLoader"
import PlatformsGrid from "../components/client/PlatformsGrid"
import Header from "../components/client/Header"
import PLATFORMS from "../data/platforms.json"
import Layout from "../components/Layout"
import AvailabilityStatus from "../components/client/AvailabilityStatus"
import FooterInfo from "../components/client/FooterInfo"
import WhatsAppButton from "../components/client/WhatsAppButton"
import DEFAULT_PROFILE from "../config/defaultProfile"

function ClientPage() {
  const { phone } = useParams()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const phoneParam = phone || DEFAULT_PROFILE.phone

    const fetchAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from("admins")
          .select("*")
          .eq("phone", phoneParam)
          .maybeSingle()

        if (error) console.error("Error fetching admin:", error)

        if (!data) {
          setAdmin(DEFAULT_PROFILE)
        } else {
          setAdmin(data)
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err)
        setAdmin(DEFAULT_PROFILE)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [phone, navigate])

  if (loading || !admin) return <FullScreenLoader loading />

  const profile = admin
  const isPro = profile.plan === "pro" || profile.plan === "trial"

  const platformTop =
    profile.platform_top?.[0]
      ? {
          ...PLATFORMS.find(p => p.name === profile.platform_top[0].name),
          url: profile.platform_top[0].url
        }
      : null

  const platformsRest = isPro
    ? (profile.platforms_rest || [])
        .map(pObj => {
          const base = PLATFORMS.find(p => p.name === pObj.name)
          return base ? { ...base, url: pObj.url } : null
        })
        .filter(Boolean)
    : PLATFORMS.filter(p => !platformTop || p.name !== platformTop.name)

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Header title={profile.title} />
      </header>

      <Layout>
        <main className="w-full max-w-3xl mx-auto flex flex-col gap-6">
          <AvailabilityStatus
            title={profile.title}
            scheduleStart={profile.schedule_start}
            scheduleEnd={profile.schedule_end}
            minDeposit={profile.min_deposit}
            phone={profile.phone}
          />

          <PlatformsGrid
            contact={profile.phone} // siempre apunta al perfil (default o admin)
            adminPhone={profile.phone}
            platformTop={platformTop}
            platformsRest={platformsRest}
            containerClassName="w-full"
            plan={profile.plan}
          />
        </main>
      </Layout>

      <FooterInfo />
      <WhatsAppButton phone={profile.phone} plan={profile.plan} />
    </div>
  )
}

export default ClientPage
