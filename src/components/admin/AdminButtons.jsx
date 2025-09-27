// AdminButtons.jsx
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const AdminButtons = ({ saving, handleSave, success, setSuccess }) => {
    const { phone } = useParams()
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success, setSuccess])

  return (
<div className="flex flex-col items-center gap-2 mt-4">
  <div className="min-h-[1.25rem]">
    {success && <span className="text-green-400">Cambios guardados correctamente</span>}
  </div>

  <div className="flex gap-2">
    <button
      type="button"
      onClick={handleSave}
      disabled={saving}
      className="sm:w-32 w-24 py-3 bg-violet-600 rounded-lg font-bold cursor-pointer hover:bg-violet-700 transition disabled:opacity-50"
    >
      {saving ? "Guardando..." : "Guardar"}
    </button>

            <button
                  type="button"
          onClick={() => window.open("https://wa.me/5493425974668", "_blank")}
          className="sm:w-32 w-24 py-3 bg-yellow-500 rounded-lg font-bold cursor-pointer hover:bg-yellow-600 transition"
        >
          + Fichas
        </button>

    <button
          type="button"
          onClick={() => window.open(`/${phone}`, "_blank")}
          className="sm:w-32 w-24 py-3 bg-none border-1 border-gray-600 rounded-lg font-bold cursor-pointer hover:bg-gray-600 transition"
        >
          Mi web
        </button>


  </div>
</div>

  )
}

export default AdminButtons
