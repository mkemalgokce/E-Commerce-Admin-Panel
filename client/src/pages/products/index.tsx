import ProductClient from "@/pages/products/components/ProductClient.tsx"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProductColumn } from "./components/Columns.tsx"
import { ProductDocument } from "@shared/product.document.ts"
import { getProducts } from "@/services/product.service.ts"
import { getStore } from "@/services/store.service.ts"
import { formatter } from "@/utils/formetter.tsx"

const ProductPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const storeId = params.storeId
  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<ProductDocument[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const storeId = params.storeId
      if (!storeId) return null
      try {
        const store = await getStore(storeId)
        if (!store) navigate("/")
      } catch (e) {
        navigate("/")
      }
      try {
        const colors = await getProducts(storeId)
        console.log("Products:", colors)
        setProducts(colors)
      } catch (e) {
        console.log("Product fetch error : ", e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [storeId])
  const formattedProducts: ProductColumn[] = products.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(parseInt(item.price)),
    category: item.category?.name ?? "",
    size: item.size?.name ?? "",
    color: item.color?.hexCode ?? "",
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
          <ProductClient data={formattedProducts} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default ProductPage
