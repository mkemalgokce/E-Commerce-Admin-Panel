import "reflect-metadata";
import { dataSource } from "./utils/db.utils";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { clientOrigin, ServerConfig } from "./config";

import errorMiddleware from "./middlewares/error.middleware";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import router from "./routes";
const app = express();

//Middlewares
app.use(
  cors({
    credentials: true,
    origin: clientOrigin,
  })
);
app.use(express.static("api/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/", router);

//Custom middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

dataSource.initialize().then(async () => {
  console.log("Database connection successful.");
  app.listen(ServerConfig.server_port, () => {
    console.log(`Server is listening on port ${ServerConfig.server_port}`);
  });
});
