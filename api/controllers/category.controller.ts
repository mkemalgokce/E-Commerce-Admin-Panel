import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { categoryService } from "../services/category.service";
import { billboardService } from "../services/billboard.service";
import { Category } from "../models/category.model";

export const getCategories = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const categories = await categoryService.getCategories(storeId);
    res.json(categories);
  }
);

export const getCategoryById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const storeId = req.params.storeId;
    if (!id) throw new Error("Category id is required");
    const category = await categoryService.getCategoryById(id, storeId);
    if (!category) throw new Error("Category not found");
    res.json(category);
  }
);

export const createCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const billboardId = req.body.billboardId;
    const billboard = await billboardService.getBillboardById(
      billboardId,
      storeId
    );
    if (!billboard) throw new Error("Billboard not found");
    req.body.billboard = billboard;
    const category = await categoryService.createCategory(req.body, storeId);
    res.json(category);
  }
);

export const updateCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const storeId = req.params.storeId;
    const billboardId = req.body.billboardId;
    const billboard = await billboardService.getBillboardById(
      billboardId,
      storeId
    );
    if (!billboard) throw new Error("Billboard not found");
    req.body.billboard = billboard;
    const newCategory: Category = {
      name: req.body.name,
      description: req.body.description,
      billboard: billboard,
      store: req.body.store,
      id: req.body.id,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
    };
    const category = await categoryService.updateCategory(id, newCategory);
    if (!category) throw new Error("Category not found");
    res.json(category);
  }
);

export const deleteCategory = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const category = await categoryService.deleteCategory(id);
    if (!category) throw new Error("Category not found");
    res.json(category);
  }
);
