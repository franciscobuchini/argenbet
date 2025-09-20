// src/pages/AdminPage.jsx
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import Layout from "../components/Layout"
import Select from "react-select"
import { Icon } from "@iconify/react"
import platforms from "../data/platforms.json"

function AdminPage() {
  const { phone } = useParams()

  const platformOptions = platforms
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(p => ({ value: p.name, label: p.name }))

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [title, setTitle] = useState("")
  const [scheduleStart, setScheduleStart] = useState("")
  const [scheduleEnd, setScheduleEnd] = useState("")
  const [platformTop, setPlatformTop] = useState(null)
  const [platformsRest, setPlatformsRest] = useState(
    platformOptions.map(p => p.value)
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const clickableOptions = platformOptions.filter(
    p => !platformTop || p.value !== platformTop?.value
  )

  const handlePlatformClick = (platformName) => {
    setPlatformsRest(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("phone", phone)
        .single()

      if (error) {
        console.error(error)
      } else if (data) {
        setPassword(data.password)
        setTitle(data.title || "")
        setScheduleStart(data.schedule_start || "")
        setScheduleEnd(data.schedule_end || "")
        setPlatformTop(
          data.platform_top?.length
            ? platformOptions.find(p => p.value === data.platform_top[0])
            : null
        )
        setPlatformsRest(data.platforms_rest || platformOptions.map(p => p.value))
      }
      setLoading(false)
    }

    fetchData()
  }, [phone])

  const handleSave = async () => {
    setSaving(true)
    const { data, error } = await supabase
      .from("admins")
      .update({
        password,
        title,
        schedule_start: scheduleStart || null,
        schedule_end: scheduleEnd || null,
        platform_top: platformTop ? [platformTop.value] : [],
        platforms_rest: platformsRest
      })
      .eq("phone", phone)
      .select()
      .maybeSingle()

    if (error) {
      console.error("Error al guardar:", error)
      alert("No se pudo guardar, revisa la consola")
    } else {
      alert("Cambios guardados correctamente")
    }
    setSaving(false)
  }

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.2)",
      color: "white",
      minHeight: "48px",
      borderRadius: "0.5rem",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(139,92,246,0.3)" : "none",
      "&:hover": { borderColor: "rgba(139,92,246,0.5)" }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2a0f3d",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(139,92,246,0.7)"
        : state.isFocused
        ? "rgba(139,92,246,0.3)"
        : "transparent",
      color: "white",
      cursor: "pointer"
    }),
    singleValue: (provided) => ({ ...provided, color: "white" }),
    placeholder: (provided) => ({ ...provided, color: "rgba(255,255,255,0.6)" }),
    dropdownIndicator: (provided) => ({ ...provided, color: "white" }),
    indicatorSeparator: () => ({ display: "none" })
  }

  if (loading) return <p className="text-white p-4">Cargando...</p>

  return (
    <Layout>
      <div className="w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <img
            src="https://res.cloudinary.com/deykwhus9/image/upload/v1758394343/ArgenBet_Logo_e4frz1.webp"
            alt="ArgenBet Logo"
            className="h-12 w-auto max-w-full object-contain"
          />
        </div>

        <h2 className="text-left mb-4 font-semibold">Panel de administración</h2>

        <div className="flex flex-col gap-4">
          {/* Contraseña */}
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

          <input
            type="text"
            placeholder="Título del sitio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none"
          />

          <h2 className="text-left mt-4">Horarios de atención:</h2>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-left">Desde:</label>
              <input
                type="time"
                value={scheduleStart}
                onChange={(e) => setScheduleStart(e.target.value)}
                className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="mb-1 text-left">Hasta:</label>
              <input
                type="time"
                value={scheduleEnd}
                onChange={(e) => setScheduleEnd(e.target.value)}
                className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="block mt-4 mb-1 text-left">Plataforma Top</label>
            <Select
              options={platformOptions}
              value={platformTop}
              onChange={setPlatformTop}
              placeholder="Selecciona plataforma top"
              styles={customSelectStyles}
            />
          </div>

          <div>
            <label className="block mt-4 mb-1 text-left">Otras plataformas</label>
            <div className="flex flex-wrap gap-2 p-3 border border-white/20 rounded-xl bg-white/5 shadow-inner scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-white/10">
              {clickableOptions.map(p => {
                const isSelected = platformsRest.includes(p.value)
                return (
                  <div
                    key={p.value}
                    onClick={() => handlePlatformClick(p.value)}
                    className={`px-4 py-2 rounded-full cursor-pointer transition
                      ${isSelected ? "bg-casino-primary text-white" : "bg-white/10 text-white hover:bg-violet-500/20"}`}
                  >
                    {p.label}
                  </div>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-casino-primary py-4 rounded-lg font-bold cursor-pointer hover:bg-violet-600 transition disabled:opacity-50 mt-4"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default AdminPage
