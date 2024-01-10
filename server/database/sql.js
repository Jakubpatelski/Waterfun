export const clearAll = `DROP TABLE IF EXISTS users, tracks, bookings, customers`;

export const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(500) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15),
  job_title VARCHAR(100),
  admin BOOLEAN NOT NULL
);
`;

export const createTracks = `
CREATE TABLE IF NOT EXISTS tracks (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  img VARCHAR(255)
);
`;


export const createCustomers = `
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(500) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  address VARCHAR(500) NOT NULL,
  nip VARCHAR(10) UNIQUE NOT NULL,
  regon VARCHAR(14) UNIQUE NOT NULL
);
`;

export const createBookings = `
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  booking_start DATETIME NOT NULL,
  booking_end DATETIME NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  pick_up_location VARCHAR(255) NOT NULL,
  details TEXT,
  customer_id INTEGER NOT NULL,
  KEY customer_id_idx (customer_id),
  track_id INTEGER NOT NULL,
  KEY track_id_idx (track_id)
);
`;


