import Select from "react-select"
import React, { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import PlatformsList from "./PlatformsList"
import TopPlatformModal from "./TopPlatformModal"
import { supabase } from "../../lib/supabaseClient"

const AdminForm = ({
  phone,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  title,
  setTitle,
  scheduleStart,
  setScheduleStart,
  scheduleEnd,
  setScheduleEnd,
  platformTop,
  setPlatformTop,
  platformTopUrl,
  setPlatformTopUrl,
  platformsRest,
  setPlatformsRest,
  platformOptions,
  minDeposit,
  setMinDeposit,
}) => {
  const [platformUrls, setPlatformUrls] = useState({})

  useEffect(() => {
    const urls = {}
    platformsRest.forEach((p) => {
      urls[p.name] = p.url || ""
    })
    if (platformTop && platformTopUrl) urls[platformTop] = platformTopUrl
    setPlatformUrls(urls)
  }, [platformsRest, platformTop, platformTopUrl])

  const savePlatformsRest = async (newPlatforms) => {
    const { error } = await supabase
      .from("admins")
      .update({ platforms_rest: newPlatforms })
      .eq("phone", phone)

    if (error) console.error("Error guardando platforms_rest:", error.message)
  }

  const togglePlatform = (name) => {
    setPlatformsRest((prev) => {
      const exists = prev.find((p) => p.name === name)
      const updated = exists
        ? prev.filter((p) => p.name !== name)
        : [...prev, { name, url: platformUrls[name] || "" }]
      savePlatformsRest(updated)
      return updated
    })
  }

  const updateUrl = (name, url) => {
    setPlatformUrls((prev) => ({ ...prev, [name]: url }))
    setPlatformsRest((prev) => {
      const updated = prev.map((p) => (p.name === name ? { ...p, url } : p))
      savePlatformsRest(updated)
      return updated
    })
  }

  const updateTopUrl = async (name, url) => {
    setPlatformUrls((prev) => ({ ...prev, [name]: url }))
    setPlatformTopUrl(url)

    const { error } = await supabase
      .from("admins")
      .update({ platform_top: [{ name, url }] })
      .eq("phone", phone)

    if (error) console.error("Error guardando plataforma principal:", error.message)
  }

  const selectStyles = {
    control: (p, s) => ({
      ...p,
      backgroundColor: "rgba(255,255,255,0.05)",
      borderColor: "rgba(255,255,255,0.2)",
      color: "white",
      minHeight: "48px",
      borderRadius: "0.5rem",
      boxShadow: s.isFocused ? "0 0 0 2px rgba(139,92,246,0.3)" : "none",
      "&:hover": { borderColor: "rgba(139,92,246,0.5)" },
    }),
    menu: (p) => ({ ...p, backgroundColor: "#2a0f3d", borderRadius: "0.5rem" }),
    option: (p, s) => ({
      ...p,
      backgroundColor: s.isSelected
        ? "rgba(139,92,246,0.7)"
        : s.isFocused
        ? "rgba(139,92,246,0.3)"
        : "transparent",
      color: "white",
      cursor: "pointer",
    }),
    singleValue: (p) => ({ ...p, color: "white" }),
    placeholder: (p) => ({ ...p, color: "rgba(255,255,255,0.6)" }),
    dropdownIndicator: (p) => ({ ...p, color: "white" }),
    indicatorSeparator: () => ({ display: "none" }),
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-clash text-left font-semibold">Panel de administración</h2>

      {/* Contraseña */}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 bg-white/5 border border-white/20 h-12 rounded-lg w-full hover:border-violet-500/50 placeholder-white/60 text-white"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
        >
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            width="20"
            height="20"
          />
        </button>
      </div>

      {/* Título */}
      <input
        type="text"
        placeholder="Título del sitio"
        value={title}
        maxLength={30}
        onChange={(e) => setTitle(e.target.value)}
        className="p-4 bg-white/5 border border-white/20 h-12 rounded-lg w-full hover:border-violet-500/50 placeholder-white/60 text-white"
      />

      {/* Monto mínimo de carga */}
      <input
        type="number"
        placeholder="Monto mínimo de carga"
        value={minDeposit === 0 ? "" : minDeposit}
        onChange={(e) => setMinDeposit(Number(e.target.value) || 0)}
        className="p-4 bg-white/5 border border-white/20 h-12 rounded-lg w-full hover:border-violet-500/50 placeholder-white/60 text-white"
        min="0"
      />

      {/* Horarios */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 gap-2">
          <label>Desde:</label>
          <input
            type="time"
            value={scheduleStart}
            onChange={(e) => setScheduleStart(e.target.value)}
            className="p-4 bg-white/5 border border-white/20 text-white h-12 rounded-lg w-full hover:border-violet-500/50"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label>Hasta:</label>
          <input
            type="time"
            value={scheduleEnd}
            onChange={(e) => setScheduleEnd(e.target.value)}
            className="p-4 bg-white/5 border border-white/20 text-white h-12 rounded-lg w-full hover:border-violet-500/50"
          />
        </div>
      </div>

      {/* Plataforma Top */}
      <div>
        <h2 className="font-clash m-2 font-semibold">Tu plataforma Principal:</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Select
              options={platformOptions}
              value={platformOptions.find((p) => p.value === platformTop) || null}
              onChange={(opt) => {
                setPlatformTop(opt.value)
                setPlatformTopUrl("")
                setPlatformUrls((prev) => ({ ...prev, [opt.value]: "" }))
              }}
              placeholder="Selecciona plataforma top"
              styles={selectStyles}
            />
          </div>

          {platformTop && (
            <TopPlatformModal
              platformName={platformTop}
              url={platformUrls[platformTop] || ""}
              updateUrl={updateTopUrl}
            />
          )}
        </div>
      </div>

      {/* Otras plataformas */}
      <PlatformsList
        platformOptions={platformOptions}
        platformTop={platformTop}
        platformsRest={platformsRest}
        togglePlatform={togglePlatform}
        updateUrl={updateUrl}
      />
    </div>
  )
}

export default AdminForm
