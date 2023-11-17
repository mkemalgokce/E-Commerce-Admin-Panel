import ColorClient from "@/pages/colors/components/ColorClient.tsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ColorColumn } from "@/pages/colors/components/Columns.tsx"
import { ColorDocument } from "@shared/color.document.ts"
import { getColors } from "@/services/color.service.ts"
import { getStore } from "@/services/store.service.ts"

const ColorPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const storeId = params.storeId
  const [loading, setLoading] = useState<boolean>(true)
  const [colors, setColors] = useState<ColorDocument[]>([])

  useEffect(() => {
    async function fetchColors() {
      const storeId = params.storeId
      if (!storeId) return null
      try {
        const store = await getStore(storeId)
        if (!store) navigate("/")
      } catch (e) {
        navigate("/")
      }
      try {
        const colors = await getColors(storeId)
        console.log("colors:", colors)
        setColors(colors)
      } catch (e) {
        console.log("color fetch error: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchColors()
  }, [storeId])
  const formattedColors: ColorColumn[] = colors.map(item => ({
    id: item.id,
    label: item.name,
    hexCode: item.hexCode,
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
          <ColorClient data={formattedColors} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ColorPage
