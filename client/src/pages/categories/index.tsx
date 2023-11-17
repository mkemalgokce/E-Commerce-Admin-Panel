import CategoryClient from "@/pages/categories/components/CategoryClient"
import { getCategories } from "@/services/category.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CategoryColumn } from "@/pages/categories/components/Columns.tsx"
import { CategoryDocument } from "@shared/category.document"

const BillboardPage = () => {
  const params = useParams()
  const storeId = params.storeId
  const [loading, setLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<CategoryDocument[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        if (!storeId) return null
        const categories = await getCategories(storeId)
        console.log("Categories:", categories)
        setCategories(categories)
      } catch (e) {
        console.log("error: ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [storeId])
  const formattedCategories: CategoryColumn[] = categories.map(item => ({
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
          <CategoryClient data={formattedCategories} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default BillboardPage
