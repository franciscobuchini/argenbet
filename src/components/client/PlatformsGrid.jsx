// PlatformsGrid.jsx
import PlatformCard from "./PlatformCard"

function PlatformsGrid({ contact, platformTop, platformsRest }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
      {platformTop && (
        <div className="col-span-2 sm:col-span-2">
          <PlatformCard platform={platformTop} contact={contact} isTop />
        </div>
      )}

      {platformsRest && platformsRest.length > 0 &&
        platformsRest.map((p, i) => (
          <PlatformCard key={p.name || i} platform={p} contact={contact} />
        ))
      }
    </div>
  )
}

export default PlatformsGrid
