import { dataSource } from "../utils/db.utils";
import {
  ProductDocument,
  ProductCreateAttributes,
  ProductUpdateAttributes,
} from "@shared/product.document";
import { Product } from "../models/product.model";

// Get all products
async function getAllProducts(storeId: string): Promise<ProductDocument[]> {
  const result = await dataSource.manager.find(Product, {
    where: {
      store: {
        id: storeId,
      },
    },
    relations: ["category", "size", "color", "store"],
  });
  console.log(result);
  return result;
}
// Get product by id
async function getProductById(
  id: string,
  storeId: string,
): Promise<ProductDocument> {
  return await dataSource.manager.findOneOrFail(Product, {
    where: {
      id,
      store: {
        id: storeId,
      },
    },
    relations: ["category", "size", "color", "store"],
  });
}

// Create product
async function createProduct(
  product: ProductCreateAttributes,
  storeId: string,
): Promise<ProductDocument> {
  const newProduct = dataSource.manager.create(Product, {
    ...product,
    category: {
      id: product.categoryId,
    },
    size: {
      id: product.sizeId,
    },
    color: {
      id: product.colorId,
    },
    store: {
      id: storeId,
    },
  });

  return await dataSource.manager.save(newProduct);
}

// Update product
async function updateProduct(
  id: string,
  product: ProductUpdateAttributes,
  storeId: string,
): Promise<ProductDocument> {
  const updateProduct = await dataSource.manager.update(
    Product,
    {
      id,
      store: {
        id: storeId,
      },
    },
    {
      ...product,
    },
  );
  if (!updateProduct.affected) {
    throw new Error("Product not found");
  }
  return await getProductById(id, storeId);
}

// Delete product
async function deleteProduct(id: string, storeId: string): Promise<boolean> {
  const deletedProduct = await dataSource.manager.delete(Product, {
    id,
    store: {
      id: storeId,
    },
  });
  return deletedProduct.affected === 1;
}

export const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
