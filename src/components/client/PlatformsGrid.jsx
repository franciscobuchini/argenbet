// src/components/client/PlatformsGrid.jsx
import PlatformCard from "./PlatformCard"

function PlatformsGrid({ contact, platformTop, platformsRest }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
      {platformTop && (
        <div className="col-span-2 sm:col-span-2 w-full">
          <PlatformCard platform={platformTop} contact={contact} />
        </div>
      )}

      {platformsRest?.map((p, i) => (
        <PlatformCard key={p.name || i} platform={p} contact={contact} />
      ))}
    </div>
  )
}

export default PlatformsGrid
