// src/components/client/PlatformsGrid.jsx
import { useState } from "react"
import PlatformCard from "./PlatformCard"
import PlatformModal from "./PlatformModal"

function PlatformsGrid({ contact, platformTop, platformsRest }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const total = (platformTop ? 1 : 0) + (platformsRest?.length || 0)

  return (
    <>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-clash text-xl font-bold mb-6 text-left">
          Plataformas <span className="text-yellow-400">{total}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {platformTop && (
            <div className="col-span-2 sm:col-span-3 lg:col-span-4 w-full">
              <PlatformCard
                platform={platformTop}
                onClick={setSelectedPlatform}
              />
            </div>
          )}

          {platformsRest?.map((p, i) => (
            <PlatformCard
              key={p.name || i}
              platform={p}
              onClick={setSelectedPlatform}
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
