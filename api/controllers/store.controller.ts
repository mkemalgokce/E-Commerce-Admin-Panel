import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { storeService } from "../services/store.service";
import { throwError } from "../utils/error.utils";
import { Store } from "../models/store.model";

const getStores = expressAsyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) res.status(400).json({ message: "Missing user" });
  try {
    const stores = await storeService.getStores(user.id);
    res.json(stores);
  } catch (e: any) {
    throwError(res, 400, e.message ?? "Something went wrong");
  }
});

const getStoreById = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { storeId } = req.params;
    const { user } = req.body;
    if (!user || !storeId) throwError(res, 400, "Missing user or storeId");
    try {
      const store = await storeService.getStoreById(storeId, user.id);
      res.json(store);
    } catch (e: any) {
      throwError(res, 400, e.message ?? "Something went wrong");
    }
  },
);

const createStore = expressAsyncHandler(async (req: Request, res: Response) => {
  const { user } = req.body;
  const store = req.body as Store;
  const { name, description } = store;
  console.log("name and description", name, description);
  if (!name || !description) throwError(res, 400, "All fields are required");
  if (!user || !store) throwError(res, 400, "Missing user or store");
  try {
    const newStore = await storeService.createStore(store, user.id);
    res.json(storeService.storeResponse(newStore));
  } catch (e: any) {
    throwError(res, 400, e.message ?? "Something went wrong");
  }
});

const getFirstStore = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) throwError(res, 400, "Missing user");
    try {
      const store = await storeService.getFirstStore(user.id);
      res.json(store);
    } catch (e: any) {
      throwError(res, 400, e.message ?? "Something went wrong");
    }
  },
);

const updateStore = expressAsyncHandler(async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const store = req.body as Store;
  const { user } = req.body;
  if (!user || !store || !storeId)
    throwError(res, 400, "Missing user, store or storeId");
  try {
    const updatedStore = await storeService.updateStore(
      storeId,
      store,
      user.id,
    );
    if (!updatedStore) throw new Error("Store not found");
    res.json(storeService.storeResponse(updatedStore));
  } catch (e: any) {
    throwError(res, 400, e.message ?? "Something went wrong");
  }
});

const deleteStore = expressAsyncHandler(async (req: Request, res: Response) => {
  const { storeId } = req.params;
  const { user } = req.body;
  if (!user || !storeId) throwError(res, 400, "Missing user or storeId");
  try {
    const deletedStore = await storeService.deleteStore(storeId, user.id);
    if (!deletedStore) throw new Error("Store not found");
    res.json(deletedStore);
  } catch (e: any) {
    throwError(res, 400, e.message ?? "Something went wrong");
  }
});
export {
  getStores,
  getStoreById,
  createStore,
  getFirstStore,
  updateStore,
  deleteStore,
};
