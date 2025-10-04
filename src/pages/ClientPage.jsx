// src/pages/ClientPage.jsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion, useAnimation } from "framer-motion"
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
import UserCashCounter from "../components/client/UserCashCounter"

function ClientPage() {
  const { phone } = useParams()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const controls = useAnimation() // ✅ Hook antes del condicional

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      controls.start({ opacity: 1 - y / 400, y: y / 15 })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

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
        setAdmin(data || DEFAULT_PROFILE)
      } catch (err) {
        console.error("Unexpected fetch error:", err)
        setAdmin(DEFAULT_PROFILE)
      } finally {
        setLoading(false)
      }
    }
    fetchAdmin()
  }, [phone, navigate])

  if (loading || !admin) return <FullScreenLoader loading /> // ✅ después de hooks

  const profile = admin
  const isPro = profile.plan === "pro" || profile.plan === "trial"

  const platformTop =
    profile.platform_top?.[0]
      ? {
          ...PLATFORMS.find(p => p.name === profile.platform_top[0].name),
          url: profile.platform_top[0].url,
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
        <motion.main
          animate={controls}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          className="w-full max-w-3xl mx-auto flex flex-col gap-6"
        >
          <AvailabilityStatus
            title={profile.title}
            scheduleStart={profile.schedule_start}
            scheduleEnd={profile.schedule_end}
            minDeposit={profile.min_deposit}
            phone={profile.phone}
          />
          <UserCashCounter />
                  </motion.main>
          <PlatformsGrid
            contact={profile.phone}
            adminPhone={profile.phone}
            platformTop={platformTop}
            platformsRest={platformsRest}
            plan={profile.plan}
          />

      </Layout>

      <FooterInfo />
      <WhatsAppButton phone={profile.phone} plan={profile.plan} />
    </div>
  )
}

export default ClientPage
