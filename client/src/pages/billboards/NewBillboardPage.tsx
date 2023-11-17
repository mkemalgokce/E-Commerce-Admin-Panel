import { BillboardForm } from "@/pages/billboards/components/BillboardForm.tsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getBillboard } from "@/services/billboard.service.ts"
import { BillboardDocument } from "@shared/billboard.document.ts"

const NewBillboardPage = () => {
  const [loading, setLoading] = useState(true)
  const [billboard, setBillboard] = useState<BillboardDocument | null>(null)
  const params = useParams()
  useEffect(() => {
    const fetchBillboard = async () => {
      const storeId = params.storeId
      if (!storeId) return null
      const id = params.billboardId ?? "new"
      try {
        const billboard = await getBillboard(id, storeId)
        setBillboard(billboard)
      } catch (e) {
        console.log("Error on fetch billboard", e)
      } finally {
        setLoading(false)
      }
    }
    fetchBillboard()
  }, [])
  if (!loading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialData={billboard} />
        </div>
      </div>
    )
  }
  return null
}

export default NewBillboardPage
