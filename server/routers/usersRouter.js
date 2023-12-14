import { Router } from "express";
import db from "../database/connection.js";
import bcrypt from "bcrypt"


const router = Router();

router.get("/", async (req, res) => {
  const [result] = await db.execute(
    "SELECT id, username, email, password, phone_number, job_title, admin FROM users;"
  );
  const users = result.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    phone_number: user.phone_number,
    job_title: user.job_title,
    admin: user.admin,
  }));


  res.send({ data: users });
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [result] = await db.execute(
      "SELECT id, username, email, password, phone_number, job_title, admin FROM users;"
      [userId]
    );

    if (result.length === 0) {
      res.status(404).send({ error: `User with id ${userId} not found` });
    }

    const user = {
      id: result[0].id,
      username: result[0].username,
      email: result[0].email,
      admin: result[0].admin,
      phone_number: result[0].phon_number,
      job_title: result[0].job_title,
      admin: result[0].admin,
    };

    res.send({ data: user });
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve user" });
  }
});

router.post("/", async (req, res) => {

  const { email, username, password, phoneNumber, jobTitle, admin } = req.body;

  // Validate the required fields
  if (!email || !username || !password || !phoneNumber || !jobTitle) {
    return res
      .status(400)
      .send({ message: "Please provide all required credentials" });
  }

  // Check if admin field is empty
  if (!admin) {
    admin === false;
  }

// Check if email or username already exists
const [emailCheck] = await db.execute("SELECT * FROM users WHERE email = ?", [
  email,
]);

if (emailCheck.length > 0) {
  return res.status(400).send({ message: "User with this email already exists" });
}


  // Check if username already exists
  const [usernameCheck] = await db.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (usernameCheck.length > 0) {
    return res
      .status(400)
      .send({ message: "User with this username already exists" });
  }

  try {

    // Set admin to false if it is empty
    const isAdmin = admin || false;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into db
    const [result] = await db.execute(
      "INSERT INTO users (email, username, password, phone_number, job_title, admin) VALUES (?, ?, ?, ?, ?, ?)",
      [email, username, hashedPassword, phoneNumber, jobTitle, isAdmin]
    );


    return res.status(201).send({ message: "User created" });
  } catch (error) {
    console.error("Database error:", error);

    return res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { admin, jobTitle, phoneNumber } = req.body;

  try {
    // Check if the user exists
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
      [userId]
    );

    if (existingUser.length === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    await db.execute(
      'UPDATE users SET admin = ?, job_title = ?, phone_number = ? WHERE id = ?',
      [admin, jobTitle, phoneNumber, userId]
    );

    res.status(200).send({ message: `User ${userId} information updated` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update user information' });
  }
});


router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await db.execute("DELETE FROM users WHERE id = ?", [userId]);

    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

export default router;
