// src/pages/LegalClients.jsx
import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"

function LegalClients() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="sm:p-8 max-w-3xl mx-auto">
        <div className="border border-gray-700 bg-gray-900 p-6 rounded-lg text-left">
          <h1 className="text-2xl font-sans font-bold mb-4 text-yellow-500">
            Bases Legales para Clientes
          </h1>

          <p className="mb-4 text-white/90">
            Estas bases legales regulan el uso de la plataforma por parte de los clientes. 
            Al utilizar nuestros servicios, aceptas cumplir con estas condiciones.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            1. Mayoría de edad
          </h2>
          <p className="mb-4 text-white/90">
            El uso de la plataforma está prohibido a menores de 18 años.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            2. Intermediación limitada
          </h2>
          <p className="mb-4 text-white/90">
            La plataforma funciona únicamente como un punto de contacto entre clientes y cajeros.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            3. Transacciones externas
          </h2>
          <p className="mb-4 text-white/90">
            Todas las operaciones se realizan directamente entre cliente y cajero a través de 
            canales externos como WhatsApp. La plataforma no participa, supervisa ni garantiza 
            dichas operaciones.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            4. Exclusión de responsabilidad
          </h2>
          <p className="mb-4 text-white/90">
            La plataforma no se hace responsable por fraudes, pérdidas, retrasos o incumplimientos 
            en las operaciones realizadas entre cliente y cajero.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            5. Independencia de los cajeros
          </h2>
          <p className="mb-4 text-white/90">
            Cada cajero actúa de manera independiente. La plataforma no tiene relación laboral, 
            societaria ni contractual con ellos más allá del uso del sistema.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            6. Sin manejo de fondos
          </h2>
          <p className="mb-4 text-white/90">
            La plataforma no recibe, administra ni transfiere dinero en ningún momento.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            7. Prohibición a menores
          </h2>
          <p className="mb-4 text-white/90">
            Queda prohibido que un menor de edad solicite, reciba o utilice servicios relacionados 
            con apuestas.
          </p>

          <h2 className="text-xl font-sans font-semibold mb-2 text-yellow-500">
            8. Uso bajo riesgo propio
          </h2>
          <p className="mb-4 text-white/90">
            Al usar la plataforma, el cliente acepta que toda transacción se realiza bajo su propio 
            riesgo y responsabilidad.
          </p>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LegalClients
