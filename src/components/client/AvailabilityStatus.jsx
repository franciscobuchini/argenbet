// src/components/client/AvailabilityStatus.jsx
import { getCurrentArgentinaTime } from "../../utils/time"

function AvailabilityStatus({ title, scheduleStart, scheduleEnd, minDeposit }) {
  const now = getCurrentArgentinaTime()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour * 60 + currentMinute

  const parseTime = str => {
    if (!str) return null
    const [h, m] = str.split(":").map(Number)
    return h * 60 + m
  }

  const formatTime = str => {
    if (!str) return ""
    const [h, m] = str.split(":").map(Number)
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }

  const start = parseTime(scheduleStart)
  const end = parseTime(scheduleEnd)

  let available = false
  if (start !== null && end !== null) {
    if (start < end) {
      available = currentTime >= start && currentTime < end
    } else {
      available = currentTime >= start || currentTime < end
    }
  }

  return (
    <div className="mt-6 w-full max-w-3xl mx-auto">
      <div className="rounded-2xl shadow-xl p-5 font-clash bg-gray-900 w-full flex flex-col items-center">
        {/* Title movido dentro */}
        <h1 className="text-xl font-bold text-center mb-4">
          {title || "👽 AlienBet"}
        </h1>

        {/* Estado */}
        <div className="flex items-center gap-3 mb-4 md:justify-center">
          <span className="relative flex h-5 w-5">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
                available ? "bg-green-400" : "bg-red-400"
              }`}
            />
            <span
              className={`relative inline-flex h-5 w-5 rounded-full ${
                available ? "bg-green-500" : "bg-red-500"
              }`}
            />
          </span>

          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${
              available
                ? "bg-green-500/20 text-green-600 border border-green-500"
                : "bg-red-500/20 text-red-600 border border-red-500"
            }`}
          >
            {available ? "Disponible entregando fichas" : "No disponible"}
          </span>
        </div>

        {/* Horario */}
        {start !== null && end !== null && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 text-center">
            Horario de atención{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              de {formatTime(scheduleStart)} a {formatTime(scheduleEnd)}
            </span>
          </p>
        )}

        {/* Monto mínimo dinámico */}
        {minDeposit != null && (
          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 text-center">
            Monto mínimo de carga: ${minDeposit.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default AvailabilityStatus
