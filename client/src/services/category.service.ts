import { deleter, fetcher, poster, putter } from "@/lib/request.utils.ts"
import {
  CategoryCreateAttributes,
  CategoryDocument,
  CategoryUpdateAttributes
} from "@shared/category.document.ts"

// Fetch all categories
export const getCategories = async (
  storeId: string
): Promise<CategoryDocument[]> => {
  const [error, categories] = await fetcher<CategoryDocument[]>(
    `${storeId}/categories`
  )
  if (error) throw error
  if (!categories) throw new Error("Categories not found")
  return categories
}
// Fetch a category by id
export const getCategory = async (
  storeId: string,
  id: string
): Promise<CategoryDocument> => {
  const [error, category] = await fetcher<CategoryDocument>(
    `${storeId}/categories/${id}`
  )
  if (error) throw error
  if (!category) throw new Error("Category not found")
  return category
}

// Create a category
export const createCategory = async (
  category: CategoryCreateAttributes,
  storeId: string
): Promise<CategoryDocument> => {
  const [error, createdCategory] = await poster<CategoryDocument>(
    `${storeId}/categories`,
    category
  )
  if (error) throw error
  if (!createdCategory) throw new Error("Category not created")
  return createdCategory
}

// Update a category
export const updateCategory = async (
  data: CategoryUpdateAttributes,
  id: string,
  storeId: string
): Promise<CategoryDocument> => {
  const [error, category] = await putter<CategoryDocument>(
    `${storeId}/categories/${id}`,
    data
  )
  if (error) throw error
  if (!category) throw new Error("Category not found")
  return category
}
// Delete a category
export const deleteCategory = async (
  id: string,
  storeId: string
): Promise<boolean> => {
  const [error, isDeleted] = await deleter<boolean>(
    `${storeId}/categories/${id}`
  )
  if (error) throw error
  if (!isDeleted) throw new Error("Category not deleted")
  return isDeleted
}
