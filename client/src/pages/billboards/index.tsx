import BillboardClient from "@/pages/billboards/components/BillboardClient.tsx"
import { getBillboards } from "@/services/billboard.service.ts"
import { useEffect, useState } from "react"
import { BillboardDocument } from "@shared/billboard.document.ts"
import { useParams } from "react-router-dom"
import { BillboardColumn } from "@/pages/billboards/components/Columns.tsx"

const BillboardPage = () => {
  const params = useParams()
  const storeId = params.storeId
  const [loading, setLoading] = useState<boolean>(true)
  const [billboards, setBillboards] = useState<BillboardDocument[]>([])

  useEffect(() => {
    async function fetchBillboards() {
      try {
        if (!storeId) return null
        const billboards = await getBillboards(storeId)
        console.log("Bill boards:", billboards)
        setBillboards(billboards)
      } catch (e) {
        console.log("Billl", e)
      } finally {
        setLoading(false)
      }
    }
    fetchBillboards()
  }, [])
  const formattedBillboards: BillboardColumn[] = billboards.map(item => ({
    id: item.id,
    label: item.name,
    createdAt: new Date(item.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }))
  if (!loading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardClient data={formattedBillboards} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default BillboardPage
