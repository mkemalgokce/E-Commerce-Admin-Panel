import { User } from "../models/user.model";
import { dataSource } from "../utils/db.utils";
import { LoginCredentials, RegisterCredentials } from "shared/user.document";
import { compareHash, generateSalt, hashText } from "../utils/hash.utils";

const getUserById = async (id: string): Promise<User | null> => {
  return await dataSource.manager.findOne(User, {
    where: {
      id,
    },
  });
};
const getUserByEmail = async (email: string): Promise<User | null> => {
  return await dataSource.manager.findOne(User, {
    where: {
      email,
    },
  });
};

const createUser = async (credentials: RegisterCredentials): Promise<User> => {
  const salt = generateSalt();
  const password = hashText(credentials.password, salt);
  const user = dataSource.manager.create(User, {
    ...credentials,
    password,
    salt,
  });
  return await dataSource.manager.save(user);
};

const saveRefreshToken = async (
  user: User,
  refreshToken: string,
  oldRefreshToken?: string
): Promise<User | null> => {
  const refreshTokens = user.refreshToken ?? [];
  if (refreshTokens.length > 10) refreshTokens.splice(0, 1);
  if (oldRefreshToken) {
    const hashOldRefreshToken = hashText(oldRefreshToken);
    const index = refreshTokens.findIndex(
      (token) => token === hashOldRefreshToken
    );
    if (index !== -1) refreshTokens.splice(index, 1);
  }
  console.log("Token count:", refreshTokens.length);
  const hashedRefreshToken = hashText(refreshToken);
  const result = await dataSource.manager.update(User, user.id, {
    refreshToken: refreshTokens.concat(hashedRefreshToken),
  });
  if (result.affected === 0) new Error("User not found");
  return await getUserById(user.id);
};

const authenticateUser = async (
  credentials: LoginCredentials
): Promise<User | null> => {
  const { email, password } = credentials;
  const user = await getUserByEmail(email);
  if (!user) return null;
  const isMatch = compareHash(password, user.password, user.salt);
  if (!isMatch) return null;
  return user;
};

const checkRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<User> => {
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  const hashedRefreshToken = hashText(refreshToken);
  const refreshTokens = user.refreshToken ?? [];
  const index = refreshTokens.find((token) => token === hashedRefreshToken);
  if (index) return user;
  throw new Error("Invalid refresh token");
};

const deleteRefreshToken = async (
  userId: string,
  refreshToken: string
): Promise<User | null> => {
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");
  const hashedRefreshToken = hashText(refreshToken);
  const refreshTokens = user.refreshToken ?? [];
  const index = refreshTokens.findIndex(
    (token) => token === hashedRefreshToken
  );
  if (index !== -1) refreshTokens.splice(index, 1);
  const result = await dataSource.manager.update(User, user.id, {
    refreshToken: refreshTokens,
  });
  if (result.affected === 0) throw new Error("User not found");
  return await getUserById(user.id);
};
const responseUser = (user: User) => {
  const { id, firstName, lastName, email, createdAt, updatedAt } = user;
  return { id, firstName, lastName, email, createdAt, updatedAt };
};

export const userService = {
  getUserById,
  getUserByEmail,
  createUser,
  saveRefreshToken,
  authenticateUser,
  checkRefreshToken,
  responseUser,
  deleteRefreshToken,
};
