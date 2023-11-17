import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { sizeService } from "../services/size.service";
import { throwError } from "../utils/error.utils";

export const getSizes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const sizes = await sizeService.getSizes(storeId);
    res.json(sizes);
  }
);

export const getSizeById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const storeId = req.params.storeId;
    if (!id) throwError(res, 401, "Size id is required");
    const size = await sizeService.getSizeById(id, storeId);
    if (!size) throwError(res, 404, "Size not found");
    res.json(size);
  }
);

export const createSize = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const size = await sizeService.createSize(req.body, storeId);
    res.json(size);
  }
);

export const updateSize = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const storeId = req.params.storeId;
    const size = await sizeService.updateSize(id, req.body, storeId);
    if (!size) throwError(res, 404, "Size not found");
    res.json(size);
  }
);

export const deleteSize = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const storeId = req.params.storeId;
    const size = await sizeService.deleteSize(id, storeId);
    if (!size) throwError(res, 404, "Size not found");
    res.json(size);
  }
);
