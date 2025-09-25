// src/components/client/PlatformCard.jsx
function PlatformCard({ platform, onClick }) {
  return (
    <button
      onClick={() => onClick(platform)}
      className="border rounded-lg flex flex-col items-center justify-center p-2 sm:h-64 h-32 w-full cursor-pointer hover:outline-1"
    >
      {platform.image && (
        <img
          src={platform.image}
          alt={platform.name}
          className="w-12 h-12 object-contain mb-2"
        />
      )}
      <span className="text-xs text-center">{platform.name}</span>
    </button>
  )
}

export default PlatformCard
