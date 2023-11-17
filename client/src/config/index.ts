export const ServerConfig = {
  baseURL: import.meta.env.VITE_SERVER_URL as string,
  environment: import.meta.env.VITE_ENVIRONMENT as string,
  isProduction: import.meta.env.VITE_ENVIRONMENT === "production"
}
