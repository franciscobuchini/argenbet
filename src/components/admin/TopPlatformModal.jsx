import { useState, useEffect } from "react"
import { Icon } from "@iconify/react"

const TopPlatformModal = ({ platformName, url, updateUrl }) => {
  const [showModal, setShowModal] = useState(false)
  const [tempUrl, setTempUrl] = useState(url)

  useEffect(() => {
    setTempUrl(url)
  }, [url])

  const handleAccept = () => {
    updateUrl(platformName, tempUrl)
    setShowModal(false)
  }

  const handleCancel = () => {
    setTempUrl(url)
    setShowModal(false)
  }

  return (
    <div className="flex items-center gap-2">
      {/* Estado con emojis */}
      <span className="text-xl">{url ? "✅" : "⚠️"}</span>

      {/* Botón para abrir modal */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white"
      >
        <Icon icon="mdi:dots-horizontal" className="w-4 h-4" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-sm relative">
            <h2 className="font-clash text-lg font-semibold text-center mb-4">
              {platformName}
            </h2>
            <input
              type="text"
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder="URL de la plataforma principal"
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

export default TopPlatformModal
