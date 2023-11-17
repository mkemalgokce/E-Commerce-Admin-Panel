import { deleter, fetcher, poster, putter } from "@/lib/request.utils.ts"
import {
  BillboardCreateAttributes,
  BillboardDocument,
  BillboardUpdateAttributes
} from "@shared/billboard.document.ts"

export const createBillboard = async (
  billboard: BillboardCreateAttributes,
  storeId: string
): Promise<BillboardDocument> => {
  const [error, createdBillboard] = await poster<BillboardDocument>(
    `${storeId}/billboards`,
    billboard
  )
  if (error) throw error
  if (!createdBillboard) throw new Error("Billboard not created")
  return createdBillboard
}

export const getBillboards = async (
  storeId: string
): Promise<BillboardDocument[]> => {
  const [error, billboards] = await fetcher<BillboardDocument[]>(
    `${storeId}/billboards`
  )
  if (error) throw error
  if (!billboards) throw new Error("Billboards not found")
  return billboards
}

export const getBillboard = async (
  id: string,
  storeId: string
): Promise<BillboardDocument> => {
  const [error, billboard] = await fetcher<BillboardDocument>(
    `${storeId}/billboards/${id}`
  )
  if (error) throw error
  if (!billboard) throw new Error("Billboard not found")
  return billboard
}

export const updateBillboard = async (
  data: BillboardUpdateAttributes,
  id: string,
  storeId: string
): Promise<BillboardDocument> => {
  const [error, billboard] = await putter<BillboardDocument>(
    `${storeId}/billboards/${id}`,
    data
  )
  if (error) throw error
  if (!billboard) throw new Error("Billboard not found")
  return billboard
}

export const deleteBillboard = async (
  id: string,
  storeId: string
): Promise<BillboardDocument> => {
  const [error, billboard] = await deleter<BillboardDocument>(
    `${storeId}/billboards/${id}`
  )
  if (error) throw error
  if (!billboard) throw new Error("Billboard not found")
  return billboard
}
