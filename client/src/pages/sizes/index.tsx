import SizeClient from "@/pages/sizes/components/SizeClient.tsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SizeColumn } from "@/pages/sizes/components/Columns.tsx"
import { SizeDocument } from "@shared/size.document.ts"
import { getSizes } from "@/services/size.service.ts"
import { getStore } from "@/services/store.service.ts"

const SizePage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const storeId = params.storeId
  const [loading, setLoading] = useState<boolean>(true)
  const [sizes, setSizes] = useState<SizeDocument[]>([])

  useEffect(() => {
    async function fetchSizes() {
      const storeId = params.storeId
      if (!storeId) return null
      try {
        const store = await getStore(storeId)
        if (!store) navigate("/")
      } catch (e) {
        navigate("/")
      }
      try {
        const sizes = await getSizes(storeId)
        console.log("Sizes:", sizes)
        setSizes(sizes)
      } catch (e) {
        console.log("Size fetch error: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchSizes()
  }, [storeId])
  const formattedSizes: SizeColumn[] = sizes.map(item => ({
    id: item.id,
    value: item.value,
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
          <SizeClient data={formattedSizes} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default SizePage
