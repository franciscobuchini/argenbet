// src/components/client/PlatformsGrid.jsx
import { useState } from "react"
import PlatformCard from "./PlatformCard"
import PlatformModal from "./PlatformModal"

function PlatformsGrid({ contact, platformTop, platformsRest }) {
  const [selectedPlatform, setSelectedPlatform] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
        {platformTop && (
          <div className="col-span-2 sm:col-span-2 w-full">
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
