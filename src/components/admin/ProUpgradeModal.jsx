// ProUpgradeModal.jsx
import { Icon } from "@iconify/react";

const ProUpgradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a0a30] rounded-2xl p-8 w-full max-w-lg shadow-2xl relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>

        <h3 className="text-white text-2xl font-bold mb-6 text-center">Actualizar a Pro</h3>

        <p className="text-white/80 mb-6 text-left">
          Con la versión Pro tendrás control total sobre tu sitio web. Detalles incluidos:
        </p>

        <ul className="list-disc list-inside text-white/70 space-y-4 mb-6 pl-4">
          <li>Acceso completo a todas las plataformas</li>
          <li>Control sobre usuarios delegados</li>
          <li>Activación y desactivación de cualquier sección</li>
          <li>Opción 1: pago mensual: $9.990</li>
          <li>Opción 2: carga mensual de $100.000 en fichas con nosotros</li>
        </ul>

        <p className="text-white/70 mb-6 text-left">
          Para activar la versión Pro, contacta con soporte o sigue las instrucciones de pago.
        </p>

        <button
          onClick={() => window.open("https://wa.me/34607336245", "_blank")}
          className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
        >
          Contactar soporte
        </button>
      </div>
    </div>
  );
};

export default ProUpgradeModal;
