// src/components/client/WhatsAppButton.jsx
import { Icon } from "@iconify/react"
import contact from "../../data/contact.json"   // <- singular

function WhatsAppButton({ phone, plan }) {
const destino = plan === "free" ? contact.freeContact : phone


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