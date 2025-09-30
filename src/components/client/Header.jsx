import EventTicker from "./EventTicker"
import { Icon } from "@iconify/react"

function Header({ title }) {
  return (
    <header className="w-full flex flex-col">


      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white gap-3">
        {/* Logo */}
        <img
          src="https://res.cloudinary.com/deykwhus9/image/upload/v1759252048/betbase_clbqpu.webp"
          alt="Logo"
          className="h-8 object-contain"
        />
      </div>
            <EventTicker />
    </header>
  )
}

export default Header
