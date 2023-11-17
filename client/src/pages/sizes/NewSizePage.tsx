import { SizeForm } from "./components/SizeForm.tsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { SizeDocument } from "@shared/size.document.ts"
import { getSize } from "@/services/size.service.ts"

const NewSizePage = () => {
  const [loading, setLoading] = useState(true)
  const [size, setSize] = useState<SizeDocument | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchSize = async () => {
      const storeId = params.storeId
      if (!storeId) return null
      const sizeId = params.sizeId
      if (!sizeId) return null
      try {
        const size = await getSize(storeId, sizeId)
        setSize(size)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSize()
  }, [])
  if (!loading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <SizeForm initialData={size} />
        </div>
      </div>
    )
  }
  return null
}

export default NewSizePage
