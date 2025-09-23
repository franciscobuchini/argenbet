// src/components/client/PlatformCard.jsx
function PlatformCard({ platform, contact }) {
  return (
    <a
      href={`https://wa.me/${contact}`}
      target="_blank"
      rel="noopener noreferrer"
      className="border rounded-lg flex flex-col items-center justify-center aspect-square w-full p-2 hover:bg-gray-50"
    >
      {platform.image && (
        <img
          src={platform.image}
          alt={platform.name}
          className="w-12 h-12 object-contain mb-2"
        />
      )}
      <span className="text-xs text-center">{platform.name}</span>
    </a>
  )
}

export default PlatformCard
