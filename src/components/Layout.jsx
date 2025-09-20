// src/components/Layout.jsx
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full relative bg-casino-bg text-white">
      {/* Luces de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-300/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-300/40 rounded-full blur-3xl animate-float-reverse"></div>
      </div>

      {/* Contenido de cada página */}
      <div className="relative z-10 flex flex-col items-center justify-start p-4 w-full">
        {children}
      </div>
    </div>
  )
}

export default Layout
