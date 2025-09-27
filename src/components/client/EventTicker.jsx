import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getCurrentArgentinaTime } from "../../utils/time"

function EventTicker() {
  const [event, setEvent] = useState("")
  const [playersOnline, setPlayersOnline] = useState(() => {
    const hour = getCurrentArgentinaTime().getHours()
    return hour >= 20 || hour <= 2 ? 1000 : 500
  })

  const getRandomPrize = () => {
    const tiers = [
      { min: 15000, max: 50000, weight: 50 },
      { min: 50000, max: 200000, weight: 30 },
      { min: 200000, max: 500000, weight: 15 },
      { min: 500000, max: 1000000, weight: 5 },
    ]
    const totalWeight = tiers.reduce((acc, t) => acc + t.weight, 0)
    let rnd = Math.random() * totalWeight
    let tier = tiers[0]
    for (let t of tiers) {
      if (rnd < t.weight) {
        tier = t
        break
      }
      rnd -= t.weight
    }
    const value = Math.floor(Math.random() * (tier.max - tier.min) + tier.min)
    return Math.round(value / 100) * 100
  }

  const getNextPlayers = () => {
    const hour = getCurrentArgentinaTime().getHours()
    const base = hour >= 20 || hour <= 2 ? 1000 : 500
    const variation = Math.floor(Math.random() * 51) - 25 // -25 a +25
    let next = playersOnline + variation
    // limitar a rango lógico
    if (next < base - 50) next = base - 50
    if (next > base + 200) next = base + 200
    setPlayersOnline(next)
    return next
  }

  const generateEvent = () => {
    const options = [
      `Se registró un nuevo jugador.`,
      `Se entregó un premio de $${getRandomPrize().toLocaleString("es-AR")}`,
      `Hay ${getNextPlayers()} jugadores en línea.`,
    ]
    return options[Math.floor(Math.random() * options.length)]
  }

  useEffect(() => {
    setEvent(generateEvent())
    const interval = setInterval(() => {
      setEvent(generateEvent())
    }, 5000 + Math.random() * 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 bg-gray-900 text-yellow-400 flex items-center justify-center text-sm font-medium overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={event}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          {event}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EventTicker
