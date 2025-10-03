// src/components/ShareButton.jsx
import { useState } from "react"

function ShareButton({ url = window.location.href }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Mira este enlace:",
          url,
        })
      } catch (err) {
        console.error("Error al compartir:", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("No se pudo copiar al portapapeles:", err)
      }
    }
  }

  return (
<button
  onClick={handleShare}
  className=" p-1 bg-white/20 text-white rounded-lg hover:bg-blue-500 transition items-center gap-2"
>
  🔗 Compartir Sitio
  {copied && <span className="text-sm text-gray-200">Copiado!</span>}
</button>
  )
}

export default ShareButton
