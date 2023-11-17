import { useUser } from "@/providers/AuthProvider.tsx"
import MainNav from "@/components/MainNav.tsx"
import StoreSwitcher from "@/components/StoreSwitcher.tsx"
import { Navigate, useNavigate } from "react-router-dom"
import { getStores } from "@/services/store.service.ts"
import { useEffect, useState } from "react"
import { useStoresStore } from "@/stores/stores.store.ts"
import AccountAvatar from "./AccountAvatar"
import { logout } from "@/services/auth.service"
const Navbar = () => {
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const storeBear = useStoresStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const allStores = await getStores()
        storeBear.setStores(allStores)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStores()
  }, [])

  const logoutUser = async () => {
    await logout()
    navigate(0)
  }
  if (!loading) {
    if (!user) {
      return null
    }
    if (storeBear.stores.length === 0) {
      return <Navigate to="/create-store" />
    }
    return (
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <StoreSwitcher items={storeBear.stores} />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <AccountAvatar onLogout={logoutUser} user={user} />
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default Navbar
