import { useModalStore } from "@/stores/storeModal.store.ts"
import { useEffect, useState } from "react"
import { getFirstStore } from "@/services/store.service.ts"
import { useNavigate } from "react-router-dom"

const CreateStore = () => {
  const { openModal, isOpen } = useModalStore()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const store = await getFirstStore()
        if (!store) throw new Error("No Store Found")
        navigate(`/${store.id}`)
      } catch (e) {
        console.log(e)
        if (!isOpen) openModal()
      } finally {
        setIsLoading(false)
      }
    }
    fetchStores()
  }, [])
  useEffect(() => {
    if (!isOpen && !isLoading) {
      openModal()
      console.log("Open modal")
    }
  }, [isOpen, openModal])
  return null
}

export default CreateStore
