// src/components/client/FooterInfo.jsx
import { useNavigate } from "react-router-dom"
import contacts from "../../data/contact.json"

function FooterInfo() {
  const navigate = useNavigate()

  const handleLegal = () => navigate("/bases_legales")
  const handleAdmin = () => navigate("/admin")

  return (
    <footer
      className="
        p-4 text-sm
        flex flex-col items-center gap-3
        md:flex-row md:justify-center md:items-center md:gap-8
      "
    >
      <div className="flex flex-col gap-3 md:flex-row md:gap-8 md:items-center">
        <button
          onClick={() => window.open(`https://wa.me/${contacts.supportContact}`, "_blank")}
          className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
        >
          Contactar soporte
        </button>
        <button
          onClick={handleLegal}
          className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
        >
          Bases legales
        </button>
        <button
          onClick={handleAdmin}
          className="text-sm text-white/80 underline hover:text-white transition cursor-pointer"
        >
          Administradores
        </button>
      </div>

      <img
        src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
        alt="Logo"
        className="h-4 object-contain"
      />
    </footer>
  )
}

export default FooterInfo
