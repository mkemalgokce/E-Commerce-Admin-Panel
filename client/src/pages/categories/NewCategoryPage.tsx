import { CategoryForm } from "./components/CategoryForm"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getCategory } from "@/services/category.service"
import { CategoryDocument } from "@shared/category.document.ts"
import { BillboardDocument } from "@shared/billboard.document.ts"
import { getBillboards } from "@/services/billboard.service.ts"

const NewCategoryPage = () => {
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<CategoryDocument | null>(null)
  const [billboards, setBillboards] = useState<BillboardDocument[]>([])
  const params = useParams()

  console.log("Params:", params)
  useEffect(() => {
    const fetchCategory = async () => {
      const storeId = params.storeId
      if (!storeId) return null
      const categoryId = params.categoryId ?? "new"
      console.log("ID values:", categoryId, storeId)
      try {
        const category = await getCategory(storeId, categoryId)
        console.log("Category founded:", category)
        setCategory(category)
      } catch (e) {
        console.log("Error on fetch category", e)
      } finally {
        try {
          const billboards = await getBillboards(storeId)
          console.log("Billboards:qwe", billboards)
          setBillboards(billboards)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchCategory()
  }, [])
  if (!loading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <CategoryForm initialData={category} billboards={billboards} />
        </div>
      </div>
    )
  }
  return null
}

export default NewCategoryPage
