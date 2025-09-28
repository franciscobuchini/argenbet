import EventTicker from "./EventTicker"
import { Icon } from "@iconify/react"

function Header({ title }) {
  return (
    <header className="w-full flex flex-col">
      <EventTicker />

      <div className="flex items-center px-4 py-2 bg-gray-800 text-white">
        <h1 className="font-clash text-lg font-bold">
          {title || "👽 AlienBet"}
        </h1>
      </div>
    </header>
  )
}

export default Header
