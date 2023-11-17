import { dataSource } from "../utils/db.utils";
import { Color } from "../models/color.model";

// Fetch all colors
const getColors = async (storeId: string): Promise<Color[]> => {
  return await dataSource.manager.find(Color, {
    where: { store: { id: storeId } },
  });
};

// Fetch a color by id
const getColor = async (storeId: string, id: string): Promise<Color> => {
  return await dataSource.manager.findOneOrFail(Color, {
    where: { store: { id: storeId }, id },
  });
};

// Create a color
const createColor = async (color: Color, storeId: string): Promise<Color> => {
  return await dataSource.manager.save(Color, {
    ...color,
    store: { id: storeId },
  });
};

// Update a color
const updateColor = async (
  color: Color,
  id: string,
  storeId: string,
): Promise<Color> => {
  return await dataSource.manager.save(Color, {
    ...color,
    store: { id: storeId },
    id,
  });
};

// Delete a color
const deleteColor = async (id: string, storeId: string): Promise<Color> => {
  const color = await dataSource.manager.findOneOrFail(Color, {
    where: { store: { id: storeId }, id },
  });
  await dataSource.manager.delete(Color, { id });
  return color;
};

export const colorService = {
  getColors,
  getColor,
  createColor,
  updateColor,
  deleteColor,
};
