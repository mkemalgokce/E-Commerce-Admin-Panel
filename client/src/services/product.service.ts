import { poster, deleter, fetcher, putter } from "@/lib/request.utils.ts"

import {
  ProductCreateAttributes,
  ProductUpdateAttributes,
  ProductDocument
} from "@shared/product.document.ts"

// Fetch all products
export const getProducts = async (
  storeId: string
): Promise<ProductDocument[]> => {
  const [error, products] = await fetcher<ProductDocument[]>(
    `${storeId}/products`
  )
  if (error) throw error
  if (!products) throw new Error("Products not found")
  return products
}

// Fetch a product by id
export const getProduct = async (
  storeId: string,
  id: string
): Promise<ProductDocument> => {
  const [error, product] = await fetcher<ProductDocument>(
    `${storeId}/products/${id}`
  )
  if (error) throw error
  if (!product) throw new Error("Product not found")
  return product
}

// Create a product
export const createProduct = async (
  product: ProductCreateAttributes,
  storeId: string
): Promise<ProductDocument> => {
  console.log("Product document", product)
  const [error, createdProduct] = await poster<ProductDocument>(
    `${storeId}/products`,
    product
  )
  if (error) throw error
  if (!createdProduct) throw new Error("Product not created")
  return createdProduct
}

// Update a product

export const updateProduct = async (
  data: ProductUpdateAttributes,
  id: string,
  storeId: string
): Promise<ProductDocument> => {
  const [error, product] = await putter<ProductDocument>(
    `${storeId}/products/${id}`,
    data
  )
  if (error) throw error
  if (!product) throw new Error("Product not found")
  return product
}

// Delete a product

export const deleteProduct = async (
  id: string,
  storeId: string
): Promise<ProductDocument> => {
  const [error, product] = await deleter<ProductDocument>(
    `${storeId}/products/${id}`
  )
  if (error) throw error
  if (!product) throw new Error("Product not found")
  return product
}
