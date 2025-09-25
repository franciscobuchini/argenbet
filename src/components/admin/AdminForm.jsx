// src/components/admin/AdminForm.jsx
import Select from "react-select"
import { Icon } from "@iconify/react"
import React, { useState, useRef, useEffect } from "react"

const AdminForm = ({
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
  platformsRest,
  setPlatformsRest,
  platformOptions, // solo value = nombre
}) => {
  const togglePlatform = (name) => {
    setPlatformsRest((prev) =>
      prev.includes(name)
        ? prev.filter((p) => p !== name)
        : [...prev, name]
    )
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
    menu: (p) => ({
      ...p,
      backgroundColor: "#2a0f3d",
      borderRadius: "0.5rem",
    }),
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
      <h2 className="text-left font-semibold">Panel de administración</h2>

      {/* Contraseña */}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full"
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
        onChange={(e) => setTitle(e.target.value)}
        className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white"
      />

      {/* Horarios */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label>Desde:</label>
          <input
            type="time"
            value={scheduleStart}
            onChange={(e) => setScheduleStart(e.target.value)}
            className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Hasta:</label>
          <input
            type="time"
            value={scheduleEnd}
            onChange={(e) => setScheduleEnd(e.target.value)}
            className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full"
          />
        </div>
      </div>

      {/* Comentario iconos */}
      <div className="text-xs text-white/70 mt-6">
        🎯 Línea Tribet | 💎 Exclusivas Direc | 🌐 Multiplataformas | 🔵
        Paneles Azul y Oro | ⚡ Plataformas Sect.bet | 👑 Línea Reyes
      </div>

      {/* Plataforma Top */}
      <div>
        <h2 className="m-2 font-semibold">Tu plataforma Principal:</h2>
        <Select
          options={platformOptions}
          value={platformOptions.find((p) => p.value === platformTop) || null}
          onChange={(opt) => setPlatformTop(opt.value)} // <- guarda solo el string
          placeholder="Selecciona plataforma top"
          styles={selectStyles}
        />
      </div>

      {/* Otras plataformas */}
      <div>
        <h2 className="m-2 font-semibold">
          Selecciona las plataformas que usas:
        </h2>
        <div className="flex flex-wrap gap-2 relative">
          {platformOptions.map((p) => {
            if (platformTop === p.value) return null
            const selected = platformsRest.includes(p.value)

            return (
              <PlatformItem
                key={p.value}
                platform={p}
                selected={selected}
                togglePlatform={togglePlatform}
              />
            )
          })}
        </div>
        <div className="text-left text-xs text-white/70 mt-6">
          Falta alguna plataforma? Contactá con soporte para agregarla.
        </div>
      </div>
    </div>
  )
}

const PlatformItem = ({ platform, selected, togglePlatform }) => {
  const [showInput, setShowInput] = useState(false)
  const [url, setUrl] = useState(platform.url || "")
  const tooltipRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShowInput(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex items-center">
      <div
        onClick={() => togglePlatform(platform.value)}
        className={`flex items-center justify-between px-4 py-2 rounded-full cursor-pointer transition ${
          selected ? "bg-white/10" : "hover:bg-violet-500/20"
        } text-white w-auto gap-2`}
      >
        <span>{platform.label}</span>

        {/* Botón circular de tres puntos */}
        <div className="relative" ref={tooltipRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setShowInput((prev) => !prev)
            }}
            className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm cursor-pointer"
          >
            <Icon icon="mdi:dots-horizontal" className="w-4 h-4" />
          </button>

          {/* Tooltip con input */}
          {showInput && (
            <div className="absolute top-full left-0 mt-1 p-0 bg-gray-400 rounded-lg shadow-lg z-10 w-64 text-white">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL de la plataforma"
                className="px-2 py-1 rounded-lg text-white w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminForm
