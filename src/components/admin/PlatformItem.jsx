import React, { useState, useEffect } from "react"
import { Icon } from "@iconify/react"

const PlatformItem = ({ platform, selected, togglePlatform, updateUrl }) => {
  const [showModal, setShowModal] = useState(false)
  const [tempUrl, setTempUrl] = useState(platform.url || "")

  // Mantener tempUrl sincronizado si cambia platform.url desde afuera
  useEffect(() => {
    setTempUrl(platform.url || "")
  }, [platform.url])

  const openModal = (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleAccept = () => {
    updateUrl(platform.name, tempUrl) // actualiza solo la URL
    setShowModal(false)
  }

  const handleCancel = () => {
    setTempUrl(platform.url || "") // restaurar valor
    setShowModal(false)
  }

  return (
    <div className="relative flex items-center">
      <div
        onClick={() => togglePlatform(platform.name)} // selecciona/deselecciona
        className={`flex items-center justify-between px-4 py-2 rounded-full cursor-pointer transition ${
          selected ? "bg-white/10" : "hover:bg-violet-500/20"
        } text-white w-auto gap-2`}
      >
        <span className="flex items-center gap-1">
          {selected && (platform.url ? "✅" : "⚠️")} {platform.name}
        </span>

        <button
          type="button"
          onClick={openModal}
          className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm cursor-pointer"
        >
          <Icon icon="mdi:dots-horizontal" className="w-4 h-4" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm relative">
            <h2 className="font-clash text-lg font-semibold text-center mb-4">
              {platform.name}
            </h2>
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="URL de la plataforma"
              className="px-3 py-2 rounded-lg text-white w-full bg-gray-700 placeholder-white/70 mb-4"
            />
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAccept}
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
