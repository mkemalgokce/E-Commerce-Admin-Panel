import { poster, deleter, fetcher, putter } from "@/lib/request.utils.ts"

import {
  SizeCreateAttributes,
  SizeDocument,
  SizeUpdateAttributes
} from "@shared/size.document.ts"

// Fetch all sizes
export const getSizes = async (storeId: string): Promise<SizeDocument[]> => {
  const [error, sizes] = await fetcher<SizeDocument[]>(`${storeId}/sizes`)
  if (error) throw error
  if (!sizes) throw new Error("Sizes not found")
  return sizes
}

// Fetch a size by id
export const getSize = async (
  storeId: string,
  id: string
): Promise<SizeDocument> => {
  const [error, size] = await fetcher<SizeDocument>(`${storeId}/sizes/${id}`)
  if (error) throw error
  if (!size) throw new Error("Size not found")
  return size
}

// Create a size
export const createSize = async (
  size: SizeCreateAttributes,
  storeId: string
): Promise<SizeDocument> => {
  console.log("Size document", size)
  const [error, createdSize] = await poster<SizeDocument>(
    `${storeId}/sizes`,
    size
  )
  if (error) throw error
  if (!createdSize) throw new Error("Size not created")
  return createdSize
}

// Update a size
export const updateSize = async (
  data: SizeUpdateAttributes,
  id: string,
  storeId: string
): Promise<SizeDocument> => {
  const [error, size] = await putter<SizeDocument>(
    `${storeId}/sizes/${id}`,
    data
  )
  if (error) throw error
  if (!size) throw new Error("Size not found")
  return size
}

// Delete a size
export const deleteSize = async (
  id: string,
  storeId: string
): Promise<boolean> => {
  const [error, isDeleted] = await deleter<boolean>(`${storeId}/sizes/${id}`)
  if (error) throw error
  if (!isDeleted) throw new Error("Size not deleted")
  return isDeleted
}
