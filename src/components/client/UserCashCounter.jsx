// src/components/client/UserCashCounter.jsx
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "../../lib/supabaseClient"

function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    let start = display
    let end = value
    if (start === end) return

    let frame
    const duration = 800 // ms
    const startTime = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const current = Math.round(start + (end - start) * eased)
      setDisplay(current)
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={display}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="font-bold text-2xl tracking-wide"
      >
        {prefix}{display.toLocaleString("es-AR")}{suffix}
      </motion.span>
    </AnimatePresence>
  )
}

function UserCashCounter() {
  const [users, setUsers] = useState(0)
  const [cash, setCash] = useState(0)

  useEffect(() => {
    // Traer valores iniciales
    const fetchInitial = async () => {
      const { data, error } = await supabase.from("counters").select("*").eq("id", 1).single()
      if (error) {
        console.error("Error inicial:", error)
        return
      }
      if (data) {
        setUsers(data.user_count)
        setCash(data.cash_count)
      }
    }
    fetchInitial()

    // Suscripción en tiempo real
    const channel = supabase
      .channel("realtime:counters")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "counters", filter: "id=eq.1" },
        (payload) => {
          setUsers(payload.new.user_count)
          setCash(payload.new.cash_count)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:gap-6 gap-2 mt-4">
      <div className="flex flex-col items-center rounded-xl bg-gray-800 sm:p-4 p-4 flex-1 text-center w-full">
        <span className="text-gray-300 text-sm text-yellow-400 pb-2"> Usuarios registrados:</span>
        <AnimatedNumber prefix="👽 " value={users} />
      </div>
      <div className="flex flex-col items-center rounded-xl bg-gray-800 sm:p-4 p-4 flex-1 text-center w-full">
        <span className="text-gray-300 text-sm text-yellow-400 pb-2">Premios entregados:</span>
        <AnimatedNumber value={cash} prefix="💵 $" suffix=" ARS" />
      </div>
    </div>
  )
}

export default UserCashCounter
