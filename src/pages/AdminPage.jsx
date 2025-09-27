// src/pages/AdminPage.jsx
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import Layout from "../components/Layout"
import FullScreenLoader from "../components/FullScreenLoader"
import AdminHeader from "../components/admin/AdminHeader"
import AdminForm from "../components/admin/AdminForm"
import AdminButtons from "../components/admin/AdminButtons"
import platforms from "../data/platforms.json"
import AdminFooter from "../components/admin/AdminFooter"
import PlanSwitcher from "../components/admin/PlanSwitcher"

function AdminPage() {
  const { phone } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [title, setTitle] = useState("")
  const [scheduleStart, setScheduleStart] = useState("")
  const [scheduleEnd, setScheduleEnd] = useState("")
  const [platformTop, setPlatformTop] = useState("")   // ahora es string, no objeto
  const [platformsRest, setPlatformsRest] = useState([])
  const [plan, setPlan] = useState("pro")

  const platformOptions = (platforms || [])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(p => ({ value: p.name, label: p.name }))

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("phone", phone)
        .single()

      if (!error && data) {
        setPassword(data.password)
        setTitle(data.title || "")
        setScheduleStart(data.schedule_start || "")
        setScheduleEnd(data.schedule_end || "")
        setPlan(data.plan || "pro")

        // platform_top es array en DB -> tomamos primer string
        const top = Array.isArray(data.platform_top) ? data.platform_top[0] : null
        setPlatformTop(top || "")

        // platforms_rest filtrado (excluir top y no válidos)
        const validRest = (data.platforms_rest || [])
          .filter(p => platformOptions.some(po => po.value === p) && p !== top)
        setPlatformsRest(validRest)
      } else if (error) {
        console.error("Error fetch admin:", error)
      }
      setLoading(false)
    }

    fetchData()
  }, [phone])

  const handleSave = async () => {
    setSaving(true)
    const topValue = platformTop || null

    const platformsRestToSave = platformsRest.filter(
      p => platformOptions.some(po => po.value === p) && p !== topValue
    )

    const { error } = await supabase
      .from("admins")
      .update({
        password,
        title,
        schedule_start: scheduleStart || null,
        schedule_end: scheduleEnd || null,
        platform_top: topValue ? [topValue] : [],   // guardamos como array JSON con un string
        platforms_rest: platformsRestToSave
      })
      .eq("phone", phone)

    if (error) {
      console.error("Error al guardar:", error)
    } else {
      setSuccess(true)
    }

    setSaving(false)
  }

  if (loading) return <FullScreenLoader />

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto">
        <AdminHeader />

        <AdminForm
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          title={title}
          setTitle={setTitle}
          scheduleStart={scheduleStart}
          setScheduleStart={setScheduleStart}
          scheduleEnd={scheduleEnd}
          setScheduleEnd={setScheduleEnd}
          platformTop={platformTop}              // ahora es string
          setPlatformTop={setPlatformTop}
          platformsRest={platformsRest}
          setPlatformsRest={setPlatformsRest}
          platformOptions={platformOptions}
        />

        <PlanSwitcher currentPlan={plan} />

        <AdminButtons
          saving={saving}
          handleSave={handleSave}
          success={success}
          setSuccess={setSuccess}
        />

        <AdminFooter phone={phone} />
      </div>
    </Layout>
  )
}

export default AdminPage
