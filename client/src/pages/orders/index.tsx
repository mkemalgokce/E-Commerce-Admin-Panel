import OrderClient from "@/pages/orders/components/OrderClient.tsx"
import { getOrders } from "@/services/order.service.ts"
import { useEffect, useState } from "react"
import { OrderDocument } from "@shared/order.document.ts"
import { useParams } from "react-router-dom"
import { OrderColumn } from "@/pages/orders/components/Columns.tsx"
import { formatter } from "@/utils/formetter.tsx"

const OrdersPage = () => {
  const params = useParams()
  const storeId = params.id
  const [loading, setLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<OrderDocument[]>([])

  useEffect(() => {
    async function fetchOrders() {
      try {
        if (!storeId) return null
        const orders = await getOrders(storeId)
        console.log("Orders", orders)
        setOrders(orders)
      } catch (e) {
        console.log("Order error:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])
  const formattedColumns: OrderColumn[] = orders.map(item => ({
    id: item.id,
    isPaid: item.isPaid,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map(item => item.product.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price)
      }, 0)
    ),
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
          <OrderClient data={formattedColumns} />
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default OrdersPage
