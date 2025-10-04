function PlatformCard({ platform, onClick, isTop }) {
  return (
    <button
      onClick={() => onClick(platform)}
      className="relative group rounded-lg flex items-center justify-center sm:h-48 h-36 w-full cursor-pointer hover:outline-2 outline-yellow-400 overflow-hidden shadow-lg"
    >
      {/* Background con opacidad 80%, sube a 100% al hacer hover */}
      <div
        className="absolute inset-0 rounded-lg transition-opacity duration-200 opacity-80 group-hover:opacity-100"
        style={{ background: platform.background }}
      />

      {/* Contenido principal */}
      <div className="relative w-full h-full flex items-center justify-center backdrop-blur-sm">
        {platform.image ? (
          <img
            loading="lazy"
            src={platform.image}
            alt={platform.name}
            className={`object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
              isTop ? "max-w-[80%] max-h-[80%]" : "max-w-full max-h-full"
            }`}
          />
        ) : (
          <span className="text-xs text-gray-200">Sin logo</span>
        )}
      </div>

      {/* Nombre de la plataforma en burbuja */}
      <span className="absolute top-1 left-1 text-white text-xs font-semibold px-1 py-1 text-left pointer-events-none">
        {platform.name}
      </span>
    </button>
  )
}

export default PlatformCard
