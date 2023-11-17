import { deleter, fetcher, poster, putter } from "@/lib/request.utils.ts"
import {
  ColorCreateAttributes,
  ColorDocument,
  ColorUpdateAttributes
} from "@shared/color.document.ts"

// Fetch all colors
export const getColors = async (storeId: string): Promise<ColorDocument[]> => {
  const [error, colors] = await fetcher<ColorDocument[]>(`${storeId}/colors`)
  if (error) throw error
  if (!colors) throw new Error("Colors not found")
  return colors
}

// Fetch a color by id
export const getColor = async (
  storeId: string,
  id: string
): Promise<ColorDocument> => {
  const [error, color] = await fetcher<ColorDocument>(`${storeId}/colors/${id}`)
  if (error) throw error
  if (!color) throw new Error("Color not found")
  return color
}

// Create a color
export const createColor = async (
  color: ColorCreateAttributes,
  storeId: string
): Promise<ColorDocument> => {
  const [error, createdColor] = await poster<ColorDocument>(
    `${storeId}/colors`,
    color
  )
  if (error) throw error
  if (!createdColor) throw new Error("Color not created")
  return createdColor
}

// Update a color
export const updateColor = async (
  data: ColorUpdateAttributes,
  id: string,
  storeId: string
): Promise<ColorDocument> => {
  const [error, color] = await putter<ColorDocument>(
    `${storeId}/colors/${id}`,
    data
  )
  if (error) throw error
  if (!color) throw new Error("Color not found")
  return color
}

// Delete a color
export const deleteColor = async (
  id: string,
  storeId: string
): Promise<boolean> => {
  const [error, isDeleted] = await deleter<boolean>(`${storeId}/colors/${id}`)
  if (error) throw error
  if (!isDeleted) throw new Error("Color not deleted")
  return isDeleted
}
