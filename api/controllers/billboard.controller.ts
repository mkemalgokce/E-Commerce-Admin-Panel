import { Request, Response } from "express";
import { billboardService } from "../services/billboard.service";
import expressAsyncHandler from "express-async-handler";
import { throwError } from "../utils/error.utils";
const getBillboards = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    if (!storeId) throwError(res, 400, "Store id is required");
    const billboards = await billboardService.getBillboards(storeId);
    res.json(billboards);
  }
);

const getBillboardById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const billboardId = req.params.id;
    if (!storeId || !billboardId)
      throwError(res, 400, "Store id and billboard id are required");
    const billboard = await billboardService.getBillboardById(
      billboardId,
      storeId
    );
    if (!billboard) throwError(res, 404, "Billboard not found");
    res.json(billboard);
  }
);

const createBillboard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const billboard = req.body;
    if (!storeId) throwError(res, 400, "Store id is required");
    const newBillboard = await billboardService.createBillboard(
      billboard,
      storeId
    );
    res.status(201).json(newBillboard);
  }
);

const updateBillboard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    console.log("update billboard");
    const storeId = req.params.storeId;
    const billboardId = req.params.id;
    const billboard = req.body;
    if (!storeId || !billboardId)
      throwError(res, 400, "Store id and billboard id are required");
    const updatedBillboard = await billboardService.updateBillboard(
      billboardId,
      billboard,
      storeId
    );
    if (!updatedBillboard) throwError(res, 404, "Billboard not found");
    res.json(updatedBillboard);
  }
);

const deleteBillboard = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.params.storeId;
    const billboardId = req.params.id;
    if (!storeId || !billboardId)
      throwError(res, 400, "Store id and billboard id are required");
    const deletedBillboard = await billboardService.deleteBillboard(
      billboardId,
      storeId
    );
    if (!deletedBillboard) throwError(res, 404, "Billboard not found");
    res.json(deletedBillboard);
  }
);

export {
  getBillboards,
  getBillboardById,
  createBillboard,
  updateBillboard,
  deleteBillboard,
};
