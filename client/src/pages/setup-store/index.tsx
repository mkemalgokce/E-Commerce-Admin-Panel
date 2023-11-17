import { useModalStore } from "@/stores/storeModal.store.ts"
import { useEffect } from "react"
import StoreModal from "@/components/modals/StoreModal.tsx"
const SetupStore = () => {
  const { isOpen, openModal } = useModalStore()
  useEffect(() => {
    if (!isOpen) openModal()
  }, [isOpen, openModal])
  return <StoreModal />
}

export default SetupStore
