// AdminForm.jsx
import Select from "react-select"
import { Icon } from "@iconify/react"

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
    setPlatformsRest(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]
    )
  }

  const selectStyles = {
    control: (p, s) => ({ ...p, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)", color: "white", minHeight: "48px", borderRadius: "0.5rem", boxShadow: s.isFocused ? "0 0 0 2px rgba(139,92,246,0.3)" : "none", "&:hover": { borderColor: "rgba(139,92,246,0.5)" }}),
    menu: (p) => ({ ...p, backgroundColor: "#2a0f3d", borderRadius: "0.5rem" }),
    option: (p, s) => ({ ...p, backgroundColor: s.isSelected ? "rgba(139,92,246,0.7)" : s.isFocused ? "rgba(139,92,246,0.3)" : "transparent", color: "white", cursor: "pointer" }),
    singleValue: (p) => ({ ...p, color: "white" }),
    placeholder: (p) => ({ ...p, color: "rgba(255,255,255,0.6)" }),
    dropdownIndicator: (p) => ({ ...p, color: "white" }),
    indicatorSeparator: () => ({ display: "none" })
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
          onChange={e => setPassword(e.target.value)}
          className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full"
        />
        <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
          <Icon icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} width="20" height="20" />
        </button>
      </div>

      {/* Título */}
      <input
        type="text"
        placeholder="Título del sitio"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white"
      />

      {/* Horarios */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label>Desde:</label>
          <input type="time" value={scheduleStart} onChange={e => setScheduleStart(e.target.value)} className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full" />
        </div>
        <div className="flex flex-col flex-1">
          <label>Hasta:</label>
          <input type="time" value={scheduleEnd} onChange={e => setScheduleEnd(e.target.value)} className="p-4 rounded-lg bg-white/10 placeholder-white/60 text-white w-full" />
        </div>
      </div>

      {/* Comentario iconos */}
      <div className="text-xs text-white/70 mt-6">
        🎯 Línea Tribet | 💎 Exclusivas Direc | 🌐 Multiplataformas | 🔵 Paneles Azul y Oro | ⚡ Plataformas Sect.bet | 👑 Línea Reyes
      </div>

      {/* Plataforma Top */}
      <div>
        <h2 className="m-2 font-semibold">Tu plataforma Principal:</h2>
        <Select
          options={platformOptions}
          value={platformTop}
          onChange={setPlatformTop}
          placeholder="Selecciona plataforma top"
          styles={selectStyles}
        />
      </div>

      {/* Otras plataformas */}
      <div>
        <h2 className="m-2 font-semibold">Selecciona las plataformas que usas:</h2>
        <div className="flex flex-wrap gap-2">
          {platformOptions.map(p => {
            if (platformTop?.value === p.value) return null
            const selected = platformsRest.includes(p.value)
            return (
              <div key={p.value} onClick={() => togglePlatform(p.value)}
                   className={`px-4 py-2 rounded-full cursor-pointer transition ${selected ? "bg-white/10" : "hover:bg-violet-500/20"} text-white`}>
                {p.label}
              </div>
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

export default AdminForm
