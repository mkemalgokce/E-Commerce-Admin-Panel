import { Size } from "../models/size.model";
import { Store } from "../models/store.model";
import { dataSource } from "../utils/db.utils";

//@desc    Get all sizes
const getSizes = async (storeId: string): Promise<Size[]> => {
  return await dataSource.manager.find(Size, {
    where: {
      store: {
        id: storeId,
      },
    },
  });
};

const getSizeById = async (
  id: string,
  storeId: string
): Promise<Size | null> => {
  return await dataSource.manager.findOne(Size, {
    where: {
      id,
      store: {
        id: storeId,
      },
    },
  });
};

const createSize = async (size: Size, storeId: string): Promise<Size> => {
  const store = await dataSource.manager.findOne(Store, {
    where: {
      id: storeId,
    },
  });
  if (!store) throw new Error("Store not found");
  return await dataSource.manager.save(Size, {
    ...size,
    store,
  });
};

const updateSize = async (
  id: string,
  size: Size,
  storeId: string
): Promise<Size | null> => {
  await dataSource.manager.update(
    Size,
    {
      id,
      store: {
        id: size.store.id,
      },
    },
    size
  );
  if (!size) throw new Error("Error updating sizes");
  return await getSizeById(id, storeId);
};

const deleteSize = async (id: string, storeId: string): Promise<boolean> => {
  await dataSource.manager.delete(Size, {
    id,
    store: {
      id: storeId,
    },
  });
  return true;
};

export const sizeService = {
  createSize,
  deleteSize,
  getSizeById,
  getSizes,
  updateSize,
};
