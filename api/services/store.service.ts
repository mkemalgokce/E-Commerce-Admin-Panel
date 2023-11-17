import { Store } from "../models/store.model";
import { dataSource } from "../utils/db.utils";
import { User } from "../models/user.model";
import { StoreDocument } from "shared/store.document";
//@desc    Get all stores
const getStores = async (userId: string): Promise<Store[]> => {
  return await dataSource.manager.find(Store, {
    where: {
      owner: {
        id: userId,
      },
    },
  });
};

//@desc    Get store by id
const getStoreById = async (
  id: string,
  userId: string
): Promise<Store | null> => {
  return await dataSource.manager.findOne(Store, {
    where: {
      id,
      owner: {
        id: userId,
      },
    },
  });
};

//@desc    Create store
const createStore = async (store: Store, userId: string): Promise<Store> => {
  const user = await dataSource.manager.findOne(User, {
    where: {
      id: userId,
    },
  });
  if (!user) throw new Error("User not found");
  const newStore = dataSource.manager.create(Store, {
    ...store,
    owner: user,
  });
  return await dataSource.manager.save(newStore);
};

//@desc    Update store
const updateStore = async (
  id: string,
  store: Store,
  userId: string
): Promise<Store | null> => {
  console.log("Store:", store);
  await dataSource.manager.update(
    Store,
    {
      id,
      owner: {
        id: userId,
      },
    },
    {
      name: store.name,
      description: store.description,
    }
  );
  return await getStoreById(id, userId);
};

//@desc    Delete store
const deleteStore = async (id: string, userId: string): Promise<boolean> => {
  const result = await dataSource.manager.delete(Store, {
    id,
    owner: {
      id: userId,
    },
  });
  return result.affected !== 0;
};

const getFirstStore = async (userId: string): Promise<Store | null> => {
  return await dataSource.manager.findOne(Store, {
    where: {
      owner: {
        id: userId,
      },
    },
  });
};
const storeResponse = (store: Store): StoreDocument => {
  const { id, name, description, createdAt, updatedAt } = store;
  return {
    id: id,
    name: name,
    description: description,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };
};
export const storeService = {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  storeResponse,
  getFirstStore,
};
