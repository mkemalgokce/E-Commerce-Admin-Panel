import { colorService } from "../services/color.service";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

const getColors = expressAsyncHandler(async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const colors = await colorService.getColors(storeId);
  res.json(colors);
});

const getColorById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { storeId, id } = req.params;
    const color = await colorService.getColor(storeId, id);
    res.json(color);
  }
);

const createColor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const color = await colorService.createColor(req.body, storeId);
  res.json(color);
});

const updateColor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { storeId, id } = req.params;
  const color = await colorService.updateColor(req.body, id, storeId);
  res.json(color);
});

const deleteColor = expressAsyncHandler(async (req: Request, res: Response) => {
  const { id, storeId } = req.params;
  const color = await colorService.deleteColor(id, storeId);
  res.json(color);
});

export { getColors, getColorById, createColor, updateColor, deleteColor };
