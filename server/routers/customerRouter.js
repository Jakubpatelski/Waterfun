import { Router } from "express";
import db from "../database/connection.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [result] = await db.execute(
      "SELECT id, name, email, phone_number, address, nip, regon FROM customers;"
    );
    const customers = result.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone_number: customer.phone_number,
      address: customer.address,
      nip: customer.nip,
      regon: customer.regon,
    }));

    res.send({ data: customers });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to retrieve customers" });
  }
});

router.get("/:id", async (req, res) => {
  const customerId = req.params.id;

  try {
    const [result] = await db.execute(
      "SELECT id, name, email, phone_number, address, nip, regon FROM customers WHERE id = ?",
      [customerId]
    );

    if (result.length === 0) {
      res.status(404).send({ error: `Customer with id ${customerId} not found` });
    }

    const customer = {
      id: result[0].id,
      name: result[0].name,
      email: result[0].email,
      phone_number: result[0].phone_number,
      address: result[0].address,
      nip: result[0].nip,
      regon: result[0].regon,
    };

    res.send({ data: customer });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to retrieve customer" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phoneNumber, address, nip, regon } = req.body;

  // Validate the required fields
  if (!name || !email || !phoneNumber || !address || !nip || !regon) {
    return res
      .status(400)
      .send({ message: "Please provide all required customer information" });
  }

  try {
    // Insert customer into db
    const [result] = await db.execute(
      "INSERT INTO customers (name, email, phone_number, address, nip, regon) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phoneNumber, address, nip, regon]
    );

    return res.status(201).send({ message: "Customer created" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const customerId = req.params.id;
  const { name, email, phoneNumber, address, nip, regon } = req.body;

  try {
    // Check if the customer exists
    const [existingCustomer] = await db.execute(
      "SELECT * FROM customers WHERE id = ?",
      [customerId]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).send({ error: 'Customer not found' });
    }

    // Update the customer information in the database
    await db.execute(
      'UPDATE customers SET name = ?, email = ?, phone_number = ?, address = ?, nip = ?, regon = ? WHERE id = ?',
      [name, email, phoneNumber, address, nip, regon, customerId]
    );

    res.status(200).send({ message: `Customer ${customerId} information updated` });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: 'Failed to update customer information' });
  }
});

router.delete("/:id", async (req, res) => {
  const customerId = req.params.id;

  try {
    // Delete customer by id
    await db.execute("DELETE FROM customers WHERE id = ?", [customerId]);

    res.send({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to delete customer" });
  }
});

export default router;
