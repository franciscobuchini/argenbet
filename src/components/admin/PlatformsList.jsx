import React from "react"
import PlatformItem from "./PlatformItem"

const PlatformsList = ({ platformOptions, platformTop, platformsRest, togglePlatform, updateUrl }) => {
  // Seleccionados en el orden de platformsRest
  const selectedPlatforms = platformsRest
    .map((pObj) => {
      const opt = platformOptions.find((p) => p.value === pObj.name)
      return opt ? { name: pObj.name, url: pObj.url || "" } : null
    })
    .filter(Boolean)

  // No seleccionados
  const unselectedPlatforms = platformOptions
    .filter((p) => p.value !== platformTop && !platformsRest.some((r) => r.name === p.value))
    .map((p) => ({ name: p.value, url: "" }))

  const renderPlatform = (p, selected) => (
    <PlatformItem
      key={p.name}
      platform={p}
      selected={selected}
      togglePlatform={togglePlatform}
      updateUrl={updateUrl}
    />
  )

  return (
    <div>
      <h2 className="font-clash m-2 font-semibold">Selecciona las plataformas que usas:</h2>
      <div className="flex flex-wrap gap-2 relative">
        {selectedPlatforms.map((p) => renderPlatform(p, true))}
        {unselectedPlatforms.map((p) => renderPlatform(p, false))}
      </div>

      <div className="flex flex-col gap-2 m-4 text-left text-sm text-white/90">
        <div>⚠️ No te olvides de agregar la URL de cada plataforma haciendo click en los tres puntos.</div>
        <div>⛔ Falta alguna plataforma? Contactá con soporte para agregarla.</div>
      </div>
    </div>
  )
}

export default PlatformsList
