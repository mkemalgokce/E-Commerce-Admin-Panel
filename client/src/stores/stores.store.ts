import { create } from "zustand"
import { StoreDocument } from "@shared/store.document.ts"

interface StoresStore {
  stores: StoreDocument[]
  setStores: (stores: any[]) => void
}

export const useStoresStore = create<StoresStore>(set => ({
  stores: [],
  setStores: (stores: any[]) => set({ stores })
}))
