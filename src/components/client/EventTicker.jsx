import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getCurrentArgentinaTime } from "../../utils/time"
import { supabase } from "../../lib/supabaseClient"

function EventTicker() {
  const [event, setEvent] = useState("")
  const [playersOnline, setPlayersOnline] = useState(() => {
    const hour = getCurrentArgentinaTime().getHours()
    return hour >= 20 || hour <= 2 ? 1000 : 500
  })

  const getRandomPrize = () => {
    const tiers = [
      { min: 10000, max: 20000, weight: 90 },
      { min: 20000, max: 100000, weight: 9 },
      { min: 100000, max: 150000, weight: 1 },
    ]
    let totalWeight = tiers.reduce((acc, t) => acc + t.weight, 0)
    let rnd = Math.random() * totalWeight
    for (let t of tiers) {
      if (rnd < t.weight) return Math.round((Math.random() * (t.max - t.min) + t.min) / 100) * 100
      rnd -= t.weight
    }
    return tiers[0].min
  }

  const getNextPlayers = () => {
    const hour = getCurrentArgentinaTime().getHours()
    const base = hour >= 20 || hour <= 2 ? 1000 : 500
    const variation = Math.floor(Math.random() * 21) - 10
    let next = playersOnline + variation
    if (next < base - 20) next = base - 20
    if (next > base + 50) next = base + 50
    setPlayersOnline(next)
    return next
  }

  const updateCounters = async (type, amount = 1) => {
    let res
    if (type === "user") res = await supabase.rpc("increment_user", { amount_input: amount })
    if (type === "cash") res = await supabase.rpc("increment_cash", { amount_input: amount })
    if (res?.error) console.error("Error actualizando contador:", res.error)
  }

  const generateEvent = async () => {
    const prize = getRandomPrize()
    const options = [
      { text: `Se registró un nuevo jugador. ➕👽`, action: () => updateCounters("user", 1) },
      { text: `Se entregó un premio de $${prize.toLocaleString("es-AR")} 💵`, action: () => updateCounters("cash", prize) },
      { text: `👽 Hay ${getNextPlayers()} jugadores en línea. 👽`, action: null },
    ]
    const picked = options[Math.floor(Math.random() * options.length)]
    if (picked.action) await picked.action()
    return picked.text
  }

  useEffect(() => {
    const init = async () => setEvent(await generateEvent())
    init()
    const interval = setInterval(async () => setEvent(await generateEvent()), 5000 + Math.random() * 5000)
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
