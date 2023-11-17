import { deleter, fetcher, poster, putter } from "@/lib/request.utils.ts"
import {
  StoreCreateAttributes,
  StoreDocument,
  StoreUpdateAttributes
} from "@shared/store.document.ts"

export const createStore = async (
  store: StoreCreateAttributes
): Promise<StoreDocument> => {
  const [error, createdStore] = await poster<StoreDocument>("/stores", store)
  if (error) throw error
  if (!createdStore) throw new Error("Store not created")
  return createdStore
}

export const getFirstStore = async (): Promise<StoreDocument> => {
  const [error, store] = await fetcher<StoreDocument>("stores/first")
  if (error) throw error
  if (!store) throw new Error("Stores not found")
  return store
}

export const getStores = async (): Promise<StoreDocument[]> => {
  const [error, stores] = await fetcher<StoreDocument[]>("stores")
  if (error) throw error
  if (!stores) throw new Error("Stores not found")
  return stores
}

export const getStore = async (id: string): Promise<StoreDocument> => {
  const [error, store] = await fetcher<StoreDocument>(`stores/${id}`)
  if (error) throw error
  if (!store) throw new Error("Store not found")
  return store
}

export const updateStore = async (
  data: StoreUpdateAttributes,
  id: string
): Promise<StoreDocument> => {
  const [error, store] = await putter<StoreDocument>(`stores/${id}`, data)
  if (error) throw error
  if (!store) throw new Error("Store not found")
  return store
}

export const deleteStore = async (id: string): Promise<boolean> => {
  const [error, isDeleted] = await deleter<boolean>(`stores/${id}`)
  if (error) throw error
  if (!isDeleted) throw new Error("Store not deleted")
  return isDeleted
}
