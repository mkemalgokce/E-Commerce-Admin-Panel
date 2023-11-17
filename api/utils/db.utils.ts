import { DataSource } from "typeorm"
import {dbConfig} from "../config";
import path from "path";

export const dataSource = new DataSource({
    type: "mysql",
    host: dbConfig.db_host,
    port: dbConfig.db_port as number,
    username: dbConfig.db_user,
    password: dbConfig.db_password,
    database: dbConfig.db_name,
    entities: [
        path.join(__dirname, "../models/*.model.ts")
    ],
    logging: true,
    synchronize: true,
})
