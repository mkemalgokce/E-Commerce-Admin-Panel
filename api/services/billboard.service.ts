import { Billboard } from "../models/billboard.model";
import { dataSource } from "../utils/db.utils";
import { BillboardDocument } from "@shared/billboard.document";

//@desc    Get all billboards
const getBillboards = async (storeId: string): Promise<Billboard[]> => {
  return await dataSource.manager.find(Billboard, {
    where: {
      store: {
        id: storeId,
      },
    },
  });
};

//@desc    Get billboard by id
const getBillboardById = async (
  id: string,
  storeId: string
): Promise<Billboard | null> => {
  return await dataSource.manager.findOne(Billboard, {
    where: {
      id,
      store: {
        id: storeId,
      },
    },
  });
};

//@desc    Create billboard
const createBillboard = async (
  billboard: Billboard,
  storeId: string
): Promise<Billboard> => {
  const newBillboard = dataSource.manager.create(Billboard, {
    ...billboard,
    store: {
      id: storeId,
    },
  });
  return await dataSource.manager.save(newBillboard);
};

//@desc    Update billboard
const updateBillboard = async (
  id: string,
  billboard: BillboardDocument,
  storeId: string
): Promise<Billboard | null> => {
  const updatedBillboard = await dataSource.manager.update(
    Billboard,
    id,
    billboard
  );
  if (!updatedBillboard) throw new Error("Error updating billboard");
  return await getBillboardById(id, storeId);
};

//@desc    Delete billboard
const deleteBillboard = async (
  id: string,
  storeId: string
): Promise<Billboard | null> => {
  const billboard = await getBillboardById(id, storeId);
  if (!billboard) throw new Error("Billboard not found");
  await dataSource.manager.delete(Billboard, {
    id,
    store: {
      id: storeId,
    },
  });
  return billboard;
};

export const billboardService = {
  getBillboards,
  getBillboardById,
  createBillboard,
  updateBillboard,
  deleteBillboard,
};
