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

  const playHref = platform.url || bonusWa

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm relative">
        {/* Cerrar */}
        <button
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>

        {/* Placeholder de imagen */}
        <div className="w-24 h-24 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center">
          {platform.image && (
            <img
              src={platform.image}
              alt={platform.name}
              className="w-full h-full object-contain"
            />
          )}
          {!platform.image && (
            <span className="text-gray-400 text-sm">Logo</span>
          )}
        </div>

        {/* Título */}
        <h2 className="font-clash text-lg font-semibold text-center mb-4">
          {platform.name}
        </h2>

        {/* Botones */}
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
