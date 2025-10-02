import { useState } from "react"
import contacts from "../../data/contact.json"

const AdminFooter = ({ phone }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${phone}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-white/70">
      <button
        type="button"
        onClick={() => window.open(`https://wa.me/${contacts.supportContact}`, "_blank")}
        className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
      >
        Contactar soporte
      </button>

      <button
        type="button"
        onClick={() => window.open("/terminos_y_condiciones", "_blank")}
        className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
      >
        Términos y condiciones
      </button>

      <button
        type="button"
        onClick={handleCopyUrl}
        className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
      >
        {copied ? "URL copiada!" : "Copiar URL para clientes"}
      </button>

      <button
        type="button"
        onClick={() => window.open(`https://wa.me/${contacts.freeContact}`, "_blank")}
        className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
      >
        Cargá fichas con nosotros
      </button>
    </div>
  )
}

export default AdminFooter
