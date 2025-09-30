// src/components/client/PlatformsGrid.jsx
import { useState } from "react"
import PlatformCard from "./PlatformCard"
import PlatformModal from "./PlatformModal"

function PlatformsGrid({ contact, platformTop, platformsRest, containerClassName = "" }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const total = (platformTop ? 1 : 0) + (platformsRest?.length || 0)

  const topPlatformObject = platformTop
    ? { ...platformTop }
    : null

  return (
    <>
      <div className={`mx-auto ${containerClassName}`}>
        <h2 className="font-clash text-xl font-bold mb-6 text-left">
          Plataformas <span className="text-yellow-400">{total}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center w-full">
          {topPlatformObject && (
            <div className="col-span-2 sm:col-span-3 lg:col-span-4 w-full">
              <PlatformCard
                platform={topPlatformObject}
                onClick={setSelectedPlatform}
                index={0} // le damos un index fijo
              />
            </div>
          )}

          {platformsRest?.map((p, i) => (
            <PlatformCard
              key={p.name || i}
              platform={p}
              onClick={setSelectedPlatform}
              index={i + 1} // +1 para que no choque con el top
            />
          ))}
        </div>
      </div>

      <PlatformModal
        isOpen={!!selectedPlatform}
        onClose={() => setSelectedPlatform(null)}
        platform={selectedPlatform}
        contact={contact}
      />
    </>
  )
}

export default PlatformsGrid
