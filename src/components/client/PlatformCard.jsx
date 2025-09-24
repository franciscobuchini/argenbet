// PlatformCard.jsx
function PlatformCard({ platform, contact, isTop = false }) {
  return (
    <a
      href={`https://wa.me/${contact}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`border rounded-lg flex flex-col items-center justify-center
        ${isTop ? "h-64 w-full" : "h-64 w-64"} p-4 hover:bg-gray-50`}
    >
      {platform.image && (
        <img
          src={platform.image}
          alt={platform.name}
          className={`${isTop ? "w-16 h-16" : "w-12 h-12"} object-contain mb-3`}
        />
      )}
      <span className={`text-center ${isTop ? "text-sm font-semibold" : "text-xs"}`}>
        {platform.name}
      </span>
    </a>
  )
}

export default PlatformCard
