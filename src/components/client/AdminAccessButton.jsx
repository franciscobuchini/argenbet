// src/components/client/AdminAccessButton.jsx
import { Link } from "react-router-dom"

function AdminAccessButton() {
  return (
    <Link
      to={`/admin`}
      className="bg-yellow-500 text-black text-sm py-1 px-2 rounded-lg text-center"
    >
      👾 Admin
    </Link>
  )
}

export default AdminAccessButton
