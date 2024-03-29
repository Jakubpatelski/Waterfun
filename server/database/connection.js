import mysql from "mysql2/promise"
import * as dotenv from "dotenv"
dotenv.config()

const connection = await mysql.createConnection(process.env.DATABASE_URL);

export default connection;