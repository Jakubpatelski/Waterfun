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
// if (isDeleteMode) {

//     // db.execute(`DROP TABLE if exists favorites;`);
//     db.execute(`DROP TABlE if exists users`);
//     // db.execute(`DROP TABLE if exists players`);

// }

// db.execute(`
// CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTO_INCREMENT,
//     email VARCHAR(500) UNIQUE NOT NULL,
//     username VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     phone_number VARCHAR(15),
//     job_title VARCHAR(100),
//     admin BOOLEAN NOT NULL
// );

// CREATE TABLE IF NOT EXISTS tracks (
//     id INTEGER PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     description VARCHAR(255),
//     img VARCHAR(255)
// );
// `);

// db.execute(`INSERT INTO users(email, username, password, phone_number, job_title,  admin)
//   VALUES(?, ?, ?, ?, ?, ?)`, ["aa", "aa", "aa", "66666666", "CEO", 1]);

  


