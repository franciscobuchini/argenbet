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
      className="px-6 py-3 bg-violet-800 rounded-lg font-bold cursor-pointer hover:bg-violet-600 transition disabled:opacity-50"
    >
      {saving ? "Guardando..." : "Guardar cambios"}
    </button>

<button
          type="button"
          onClick={() => window.open(`/${phone}`, "_blank")}
          className="px-6 py-3 bg-none border-2 border-gray-600 rounded-lg font-bold cursor-pointer hover:bg-gray-600 transition"
        >
          Ir a mi web
        </button>
  </div>
</div>

  )
}

export default AdminButtons
