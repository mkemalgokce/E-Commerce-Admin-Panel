import { useModalStore } from "@/stores/storeModal.store.ts"
import { useEffect, useState } from "react"
import { getFirstStore, getStore } from "@/services/store.service.ts"
import { StoreDocument } from "@shared/store.document.ts"
import { useNavigate, useParams } from "react-router-dom"
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { Overview } from "@/components/ui/Overview"
import Heading from "@/components/Heading"
import { formatter } from "@/utils/formetter"
const Home = () => {
  const navigate = useNavigate()
  const params = useParams()
  const storeId = params.id
  const { openModal, isOpen } = useModalStore()
  const [isLoading, setIsLoading] = useState(true)
  const [store, setStore] = useState<StoreDocument | null>(null)
  console.log("Open modal value:", isOpen)
  const totalRevenue = 0
  const graphRevenue = 0
  const salesCount = 0
  const stockCount = 0
  useEffect(() => {
    const fetchStores = async () => {
      try {
        if (storeId) {
          const store = await getStore(storeId)
          setStore(store)
          navigate(`/${store.id}`)
        } else {
          const firstStore = await getFirstStore()
          setStore(store)
          navigate(`/${firstStore.id}`)
        }
      } catch (e) {
        if (storeId) {
          const firstStore = await getFirstStore()
          setStore(store)
          navigate(`/${firstStore.id}`)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchStores()
  }, [])
  useEffect(() => {
    if (!isOpen && !isLoading && !store) {
      navigate(0)
      openModal()
      console.log("Open modal")
    }
  }, [isOpen, openModal, store])
  if (isLoading) return null
  return (
    <div>
      {store && (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatter.format(totalRevenue)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+{salesCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Products In Stock
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stockCount}</div>
                </CardContent>
              </Card>
            </div>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={graphRevenue} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}{" "}
    </div>
  )
}

export default Home
