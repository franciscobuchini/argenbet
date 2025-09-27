// src/pages/Terms.jsx
import Layout from "../components/Layout"

function Terms() {
  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto text-white/90">
        <h1 className="font-clash text-2xl font-bold mb-4">Términos y Condiciones</h1>

        <p className="mb-4">
          Bienvenido a nuestra plataforma. Al utilizar nuestros servicios, aceptas cumplir con estos términos y condiciones.
        </p>

        <h2 className="font-clash text-xl font-semibold mb-2">1. Uso del servicio</h2>
        <p className="mb-4">
          El usuario se compromete a utilizar la plataforma de manera responsable y a no infringir leyes o derechos de terceros.
        </p>

        <h2 className="font-clash text-xl font-semibold mb-2">2. Registro y seguridad</h2>
        <p className="mb-4">
          La información proporcionada al crear una cuenta debe ser veraz y actualizada. El usuario es responsable de mantener la confidencialidad de su contraseña.
        </p>

        <h2 className="font-clash text-xl font-semibold mb-2">3. Responsabilidad</h2>
        <p className="mb-4">
          La plataforma no se hace responsable de pérdidas o daños derivados del uso del servicio.
        </p>

        <h2 className="font-clash text-xl font-semibold mb-2">4. Modificaciones</h2>
        <p className="mb-4">
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones se notificarán en la plataforma.
        </p>

        <p className="mt-6">
          Al continuar utilizando la plataforma, aceptas estos términos y cualquier actualización futura.
        </p>
      </div>
    </Layout>
  )
}

export default Terms
