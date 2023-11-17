import { redirect, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getStore } from "@/services/store.service.ts"
import { StoreDocument } from "@shared/store.document.ts"
import SettingsForm from "@/pages/settings/SettingsForm.tsx"
const Settings = () => {
  const { id: storeId } = useParams()
  const [store, setStore] = useState<StoreDocument>()
  if (!storeId) redirect("/")
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const fetchedStore = await getStore(storeId!)
        setStore(fetchedStore)
      } catch (e) {
        console.log(e)
        redirect("/")
      }
    }
    fetchStore()
  }, [])
  if (!store) return null
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialStore={store} />
      </div>
    </div>
  )
}

export default Settings
