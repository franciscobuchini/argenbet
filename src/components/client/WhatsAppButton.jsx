// src/components/client/WhatsAppButton.jsx
import { Icon } from "@iconify/react"

const CONTACTO_DE_CONFIANZA = "34607336245"

function WhatsAppButton({ phone = "34607336245", plan }) {
  const destino = plan === "free" ? CONTACTO_DE_CONFIANZA : phone

  const handleClick = () => {
    window.open(`https://wa.me/${destino}`, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg z-50"
      aria-label="WhatsApp"
    >
      <Icon icon="mdi:whatsapp" className="w-7 h-7" />
    </button>
  )
}

export default WhatsAppButton
