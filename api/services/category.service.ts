import { dataSource } from "../utils/db.utils";
import { Category } from "../models/category.model";

// Get all categories
const getCategories = async (storeId: string): Promise<Category[]> => {
  const categories = await dataSource.manager.find(Category, {
    where: {
      store: {
        id: storeId,
      },
    },
  });
  return categories;
};

// Get category by id
const getCategoryById = async (
  id: string,
  storeId: string,
): Promise<Category | null> => {
  return await dataSource.manager.findOne(Category, {
    where: {
      id,
      store: {
        id: storeId,
      },
    },
    relations: ["billboard"],
  });
};

// Create category
const createCategory = async (
  category: Category,
  storeId: string,
): Promise<Category> => {
  const newCategory = dataSource.manager.create(Category, {
    ...category,
    store: {
      id: storeId,
    },
  });
  return await dataSource.manager.save(newCategory);
};

// Update category
const updateCategory = async (
  id: string,
  category: Category,
): Promise<Category> => {
  const updatedCategory = await dataSource.manager.update(Category, id, {
    ...category,
  });
  return updatedCategory.raw;
};

// Delete category
const deleteCategory = async (id: string): Promise<boolean> => {
  const deletedCategory = await dataSource.manager.delete(Category, id);
  return deletedCategory.affected === 1;
};

export const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
