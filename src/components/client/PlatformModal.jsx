// src/components/client/PlatformModal.jsx
import React from "react"
import { Icon } from "@iconify/react"

function PlatformModal({ platform, contact, onClose }) {
  if (!platform) return null

  const bonusWa = `https://wa.me/${contact}?text=${encodeURIComponent(
    `Quiero solicitar un bono en ${platform.name}`
  )}`

  const loadWa = `https://wa.me/${contact}?text=${encodeURIComponent(
    `Quiero cargar fichas en ${platform.name}`
  )}`

  const playHref = platform.url && platform.url.trim() !== "" ? platform.url : loadWa

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm relative">
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>

        {/* Imagen con background, blur y shadow */}
        <div className="relative w-32 h-32 rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden backdrop-blur-sm">
          <div
            className="absolute inset-0 rounded-lg"
            style={{ background: platform.background}}
          />

          {platform.image ? (
            <img
              src={platform.image}
              alt={platform.name}
              className="relative w-28 h-28 object-contain drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <span className="text-gray-400 text-sm relative">Logo</span>
          )}
        </div>

        <h2 className="font-clash text-lg font-semibold text-center mb-4">
          {platform.name}
        </h2>

        <div className="flex flex-col gap-3">
          <a
            href={bonusWa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-500"
            aria-label={`Solicitar bono en ${platform.name}`}
          >
            <Icon icon="mdi:gift-outline" className="w-5 h-5" />
            <span>1000 fichas gratis!</span>
          </a>

          <a
            href={loadWa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-green-800 text-white py-2 rounded-lg hover:bg-green-700"
            aria-label={`Cargar fichas en ${platform.name}`}
          >
            <Icon icon="mdi:casino" className="w-5 h-5" />
            <span>Cargar fichas</span>
          </a>

          <a
            href={playHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-violet-800 text-white py-2 rounded-lg hover:bg-violet-700"
            aria-label={`Jugar en ${platform.name}`}
          >
            <Icon icon="mdi:cards-playing-outline" className="w-5 h-5" />
            <span>Jugar</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PlatformModal
