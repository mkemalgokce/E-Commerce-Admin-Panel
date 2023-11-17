import axios from "axios"
import { ServerConfig } from "@/config"

const instance = axios.create({
  baseURL: ServerConfig.baseURL,
  withCredentials: true,
  timeout: 3000
})

export default instance
