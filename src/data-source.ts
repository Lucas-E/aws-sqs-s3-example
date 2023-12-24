import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import 'dotenv/config'

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
