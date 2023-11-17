import { Request, Response } from "express";
import { productService } from "../services/product.service";
import expressAsyncHandler from "express-async-handler";

const getProducts = expressAsyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts(req.params.storeId);
  res.json(products);
});

const getProductById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.getProductById(
      req.params.id,
      req.params.storeId
    );
    res.json(product);
  }
);

const createProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    console.log("create body:", req.body);
    const product = await productService.createProduct(
      req.body,
      req.params.storeId
    );
    res.status(201).json(product);
  }
);

const updateProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      req.params.storeId
    );
    res.json(product);
  }
);

const deleteProduct = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const result = await productService.deleteProduct(
      req.params.id,
      req.params.storeId
    );
    console.log("Result:", result);
    res.json(result);
  }
);

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
