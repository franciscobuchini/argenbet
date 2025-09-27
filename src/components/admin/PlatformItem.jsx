import React, { useState } from "react"
import { Icon } from "@iconify/react"

const PlatformItem = ({ platform, selected, togglePlatform }) => {
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState(platform.url || "")

  return (
    <div className="relative flex items-center">
      <div
        onClick={() => togglePlatform(platform.value)}
        className={`flex items-center justify-between px-4 py-2 rounded-full cursor-pointer transition ${
          selected ? "bg-white/10" : "hover:bg-violet-500/20"
        } text-white w-auto gap-2`}
      >
        <span>{platform.label}</span>

        {/* Botón circular de tres puntos */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setShowModal(true)
          }}
          className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm cursor-pointer"
        >
          <Icon icon="mdi:dots-horizontal" className="w-4 h-4" />
        </button>
      </div>

      {/* Modal para URL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-semibold text-center mb-4">
              {platform.label}
            </h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="URL de la plataforma"
              className="px-3 py-2 rounded-lg text-white w-full bg-gray-700 placeholder-white/70 mb-4"
            />
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="cursor-pointer px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlatformItem
