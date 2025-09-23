// src/components/client/PlatformsGrid.jsx
import PLATFORMS from "../../data/platforms.json"
import PlatformCard from "./PlatformCard"

function PlatformsGrid({ contact }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {PLATFORMS.map((p, i) => (
        <PlatformCard key={p.name || i} platform={p} contact={contact} />
      ))}
    </div>
  )
}

export default PlatformsGrid
