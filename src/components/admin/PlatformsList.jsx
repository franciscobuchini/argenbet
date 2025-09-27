import React from "react"
import PlatformItem from "./PlatformItem"

const PlatformsList = ({ platformOptions, platformTop, platformsRest, togglePlatform }) => {
  return (
    <div>
      <h2 className="m-2 font-semibold">Selecciona las plataformas que usas:</h2>
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
      <div className="m-4">
        <div className="text-left text-xs text-white/70">
        No te olvides de agregar la URL de cada plataforma haciendo click en los tres puntos.
      </div>
      <div className="text-left text-xs text-white/70">
        Falta alguna plataforma? Contactá con soporte para agregarla.
      </div>
      </div>
      
    </div>
  )
}

export default PlatformsList
