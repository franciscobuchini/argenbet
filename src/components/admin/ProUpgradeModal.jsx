// ProUpgradeModal.jsx
import { Icon } from "@iconify/react";

const ProUpgradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a0a30] rounded-2xl p-8 w-full max-w-lg shadow-2xl relative border border-white/10 font-sans">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>

        <h3 className="text-white text-2xl font-bold mb-6 text-center tracking-tight">
          Actualiza a <span className="text-violet-400">Pro</span>
        </h3>

        <p className="text-white/80 mb-6 text-center leading-relaxed">
          Obtén control total sobre tu sitio web con todas las funciones avanzadas.
        </p>

        <ul className="space-y-4 mb-6">
          <li className="flex items-start gap-2 text-white/80">
            <Icon icon="mdi:check-circle" className="text-violet-400 mt-1" />
            Acceso completo a todas las plataformas
          </li>
          <li className="flex items-start gap-2 text-white/80">
            <Icon icon="mdi:check-circle" className="text-violet-400 mt-1" />
            Control sobre usuarios delegados
          </li>
          <li className="flex items-start gap-2 text-white/80">
            <Icon icon="mdi:check-circle" className="text-violet-400 mt-1" />
            Activación y desactivación de secciones
          </li>
          <li className="flex flex-col gap-1 text-white/80 text-center">
            <span>
              Opción 1:{" "}
              <span className="line-through text-red-400">Pago mensual $100.000</span>
            </span>
            <span className="font-semibold text-violet-300">Ahora $9.990 / mes</span>
          </li>
          <li className="flex flex-col gap-1 text-white/80 text-center">
            <span>
              Opción 2:{" "}
              <span className="line-through text-red-400">Carga mensual $800.000</span>
            </span>
            <span className="font-semibold text-violet-300">
              Carga de $200.000 en fichas / mes
            </span>
            <span className="font-normal text-xs text-violet-300">
              *Aproximadamente 1.000.000 de fichas para vos
            </span>
          </li>
        </ul>

        <p className="text-white/70 mb-6 text-center text-sm">
          Para activar Pro, contáctanos por soporte.
        </p>

        <button
          onClick={() => window.open("https://wa.me/34607336245", "_blank")}
          className="w-full cursor-pointer bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
        >
          Contactar soporte
        </button>
      </div>
    </div>
  );
};

export default ProUpgradeModal;
