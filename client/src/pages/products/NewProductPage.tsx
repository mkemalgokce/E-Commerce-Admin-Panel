import { ProductForm } from "./components/ProductForm.tsx"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { ProductDocument } from "@shared/product.document.ts"
import { ColorDocument } from "@shared/color.document.ts"
import { SizeDocument } from "@shared/size.document.ts"
import { CategoryDocument } from "@shared/category.document.ts"
import { getProduct } from "@/services/product.service.ts"
import { getColors } from "@/services/color.service.ts"
import { getSizes } from "@/services/size.service.ts"
import { getCategories } from "@/services/category.service.ts"

const NewProductPage = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<ProductDocument | null>(null)
  const [colors, setColors] = useState<ColorDocument[]>([])
  const [sizes, setSizes] = useState<SizeDocument[]>([])
  const [categories, setCategories] = useState<CategoryDocument[]>([])
  const params = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const storeId = params.storeId
      if (!storeId) return null
      const productId = params.productId
      if (!productId) return null
      try {
        const colors = await getColors(storeId)
        setColors(colors)
        const sizes = await getSizes(storeId)
        setSizes(sizes)
        const categories = await getCategories(storeId)
        setCategories(categories)
        const product = await getProduct(storeId, productId)
        setProduct(product)
      } catch (error) {
        console.log("Lan error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])
  if (!loading) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ProductForm
            initialData={product}
            categories={categories ?? []}
            sizes={sizes ?? []}
            colors={colors ?? []}
          />
        </div>
      </div>
    )
  }
  return null
}

export default NewProductPage
