import axios from "../utils/axios.ts"
import {
  UserDocument,
  LoginCredentials,
  RegisterCredentials
} from "@shared/user.document.ts"
// Login action
export const login = async (
  credentials: LoginCredentials
): Promise<UserDocument> => {
  const response = await axios.post<UserDocument>("/user/login", credentials)
  return response.data
}

// Register action
export const register = async (
  credentials: RegisterCredentials
): Promise<UserDocument> => {
  const response = await axios.post<UserDocument>("/user/register", credentials)
  return response.data
}

export const refresh = async (): Promise<UserDocument> => {
  const response = await axios.get<UserDocument>("/user/refresh")
  return response.data
}
export const logout = async () => {
  await axios.post("/user/logout")
}
