import { ColorForm } from "./components/ColorForm.tsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { ColorDocument } from "@shared/color.document.ts"
import { getColor } from "@/services/color.service.ts"

const NewColorPage = () => {
  const [loading, setLoading] = useState(true)
  const [color, setColor] = useState<ColorDocument | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchSize = async () => {
      const storeId = params.storeId
      if (!storeId) return null
      const colorId = params.colorId
      if (!colorId) return null
      try {
        const color = await getColor(storeId, colorId)
        setColor(color)
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
          <ColorForm initialData={color} />
        </div>
      </div>
    )
  }
  return null
}

export default NewColorPage
