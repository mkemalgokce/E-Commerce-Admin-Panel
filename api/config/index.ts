export const ServerConfig = {
  server_port: process.env.SERVER_PORT ?? 3002,
  server_host: process.env.SERVER_HOST ?? "localhost",
};

export const clientConfig = {
  client_port: process.env.CLIENT_PORT ?? 5173,
  client_host: process.env.CLIENT_HOST ?? "localhost",
  client_protocol: process.env.CLIENT_PROTOCOL ?? "http",
};

export const dbConfig = {
  db_user: process.env.MYSQL_USER ?? "admin",
  db_password: process.env.MYSQL_PASSWORD ?? "admin",
  db_host: process.env.MYSQL_HOST ?? "localhost",
  db_name: process.env.MYSQL_DATABASE ?? "shopar",
  db_port: process.env.MYSQL_PORT ?? 3307,
};

export const isProduction = process.env.NODE_ENV === "production";

export const clientOrigin =
  clientConfig.client_protocol +
  "://" +
  clientConfig.client_host +
  ":" +
  clientConfig.client_port;
