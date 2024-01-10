import connection from "./connection.js"
import { clearAll, createUsers, createTracks, createCustomers, createBookings } from "./sql.js";
import * as dotenv from "dotenv"
dotenv.config()

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

const createTables = async () => {
    try {
        if (isDeleteMode) {
            await connection.query(clearAll);
            console.log("DROPPED ALL TABLES")
        }
        await connection.query(createUsers);
        console.log('CREATED users');

        await connection.query(createTracks);
        console.log('CREATED tracks');

        await connection.query(createCustomers);
        console.log('CREATED customers');

        await connection.query(createBookings);
        console.log('CREATED bookings');
    
 
        connection.end();
    } catch (error) {
        console.error(error);
    }
};

createTables();

  


