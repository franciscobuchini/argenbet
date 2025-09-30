import { useEffect, useState } from "react"

const FullScreenLoader = ({ duration = 2000 }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!show) return null

  return (
    <div className="flex flex-col gap-20 fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]">
      <img
        src="https://res.cloudinary.com/deykwhus9/image/upload/v1758445158/AlienMate_ut50a9.webp"
        alt="Cargando..."
        className="w-64 h-64 animate-pulse"
      />
      <img
        src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
        alt="Cargando..."
        className="w-64 animate-pulse"
      />
    </div>
  )
}

export default FullScreenLoader