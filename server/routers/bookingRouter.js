import express from "express";
import db from "../database/connection.js";
import moment from "moment/moment.js";
import { sendBookingConfirmationEmail, sendBookingEditConfirmationEmail, sendBookingDeletionEmail } from "../email/emailUtil.js";
const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const [result] = await db.execute(`
        SELECT 
          b.id,
          b.booking_start,
          b.booking_end,
          b.price,
          b.pick_up_location,
          b.details,
          b.customer_id,
          c.name as customer_name, -- Alias for clarity
          c.email as customer_email,
          c.phone_number as customer_phone_number,
          c.address as customer_address,
          c.nip as customer_nip,
          c.regon as customer_regon,
          b.track_id,
          t.name as track_name, -- Alias for clarity
          t.description as track_description,
          t.img as track_img
        FROM bookings b
        JOIN customers c ON b.customer_id = c.id
        JOIN tracks t ON b.track_id = t.id;
      `);

    const bookings = result.map((booking) => ({
      id: booking.id,
      booking_start: moment(booking.booking_start).format("YYYY-MM-DD"),
      booking_end: moment(booking.booking_end).format("YYYY-MM-DD"),
      price: booking.price,
      pick_up_location: booking.pick_up_location,
      details: booking.details,
      customer: {
        id: booking.customer_id,
        name: booking.customer_name,
        email: booking.customer_email,
        phone_number: booking.customer_phone_number,
        address: booking.customer_address,
        nip: booking.customer_nip,
        regon: booking.customer_regon,
      },
      track: {
        id: booking.track_id,
        name: booking.track_name,
        description: booking.track_description,
        img: booking.track_img,
      },
    }));

    res.send({ data: bookings });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to retrieve bookings" });
  }
});

router.get("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    const [result] = await db.execute(
      "SELECT id, booking_start, booking_end, price, pick_up_location, details, customer_id, track_id FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (result.length === 0) {
      res.status(404).send({ error: `Booking with id ${bookingId} not found` });
    }

    const booking = {
      id: result[0].id,
      booking_start: result[0].booking_start,
      booking_end: result[0].booking_end,
      price: result[0].price,
      pick_up_location: result[0].pick_up_location,
      details: result[0].details,
      customer_id: result[0].customer_id,
      track_id: result[0].track_id,
    };

    res.send({ data: booking });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to retrieve booking" });
  }
});

router.post("/", async (req, res) => {
  const {
    booking_start,
    booking_end,
    price,
    pick_up_location,
    details,
    customer_id,
    track_id,
  } = req.body;

  // Validate the required fields
  if (
    !booking_start ||
    !booking_end ||
    !price ||
    !pick_up_location ||
    !details ||
    !customer_id ||
    !track_id
  ) {
    return res
      .status(400)
      .send({ message: "Please provide all required booking information" });
  }

  try {
    
    // Check if booking_end is not before booking_start
    if (new Date(booking_end) < new Date(booking_start)) {
      return res
        .status(400)
        .send({ message: "Booking end cannot be before booking start" });
    }

    // Check if booking is not in the past
    const currentDate = new Date();
    if (
      new Date(booking_start) < currentDate ||
      new Date(booking_end) < currentDate
    ) {
      return res.status(400).send({ message: "Booking cannot be in the past" });
    }

    // Check if the track is available for the specified timespan
    const [conflictingBookings] = await db.execute(
      "SELECT id, booking_start, booking_end FROM bookings WHERE track_id = ? AND NOT (booking_end <= ? OR booking_start >= ?)",
      [track_id, booking_start, booking_end]
    );

    if (conflictingBookings.length > 0) {
      const conflictingBookingsDetails = conflictingBookings.map((booking) => ({
        id: booking.id,
        booking_start: moment(booking.booking_start).format("YYYY-MM-DD"),
        booking_end: moment(booking.booking_end).format("YYYY-MM-DD"),
      }));

      return res.status(409).send({
        message:
          "The selected track is not available for the specified timespan",
        conflictingBookings: conflictingBookingsDetails,
      });
    }

    // Insert booking into db
    const [result] = await db.execute(
      "INSERT INTO bookings (booking_start, booking_end, price, pick_up_location, details, customer_id, track_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        booking_start,
        booking_end,
        price,
        pick_up_location,
        details,
        customer_id,
        track_id,
      ]
    );

    // Retrieve customer email based on customer_id (adjust your SQL query accordingly)
    const [customerResult] = await db.execute(
      "SELECT * FROM customers WHERE id = ?",
      [customer_id]
    );

    const customerEmail = customerResult[0];

    // Fetch the booking details including the auto-generated ID
    const [bookingDetailsResult] = await db.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [result.insertId]
    );

    const bookingDetails = bookingDetailsResult[0];

    // Send booking confirmation email
    await sendBookingConfirmationEmail(customerEmail, bookingDetails);

    return res.status(201).send({ message: "Booking created" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const bookingId = req.params.id;
  const {
    booking_start,
    booking_end,
    price,
    pick_up_location,
    details,
    track_id,
  } = req.body;

  try {
    // Check if the booking exists
    const [existingBooking] = await db.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (existingBooking.length === 0) {
      return res.status(404).send({ error: "Booking not found" });
    }

    // Check if booking_end is not before booking_start
    if (new Date(booking_end) < new Date(booking_start)) {
      return res
        .status(400)
        .send({ message: "Booking end cannot be before booking start" });
    }

    // Check if booking is not in the past
    const currentDate = new Date();
    if (
      new Date(booking_start) < currentDate ||
      new Date(booking_end) < currentDate
    ) {
      return res.status(400).send({ message: "Booking cannot be in the past" });
    }

    // Check if the track is available for the specified timespan
    const [conflictingBookings] = await db.execute(
      "SELECT id FROM bookings WHERE track_id = ? AND NOT (booking_end <= ? OR booking_start >= ?) AND id != ?",
      [track_id, booking_start, booking_end, bookingId]
    );

    if (conflictingBookings.length > 0) {
      return res.status(409).send({
        message:
          "The selected track is not available for the specified timespan",
      });
    }

    // Update the booking information in the database
    await db.execute(
      "UPDATE bookings SET booking_start = ?, booking_end = ?, price = ?, pick_up_location = ?, details = ?, track_id = ? WHERE id = ?",
      [
        booking_start,
        booking_end,
        price,
        pick_up_location,
        details,
        track_id,
        bookingId,
      ]
    );

    // Retrieve updated booking details (if needed)
    const [updatedBookingDetails] = await db.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [bookingId]
    );

    // Retrieve customer details
    const [customerResult] = await db.execute(
      "SELECT * FROM customers WHERE id = ?",
      [existingBooking[0].customer_id]
    );

    if (customerResult.length === 0) {
      return res.status(404).send({ error: "Customer not found" });
    }

    const customerDetails = customerResult[0];
    const bookingDetails = updatedBookingDetails[0];
    // Send booking edit confirmation email
    await sendBookingEditConfirmationEmail(customerDetails, bookingDetails);

    res
      .status(200)
      .send({ message: `Booking ${bookingId} information updated` });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to update booking information" });
  }
});

router.delete("/:id", async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Retrieve the booking and customer details
    const [bookingDetailsResult] = await db.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [bookingId]
    );

    if (bookingDetailsResult.length === 0) {
      return res.status(404).send({ error: "Booking not found" });
    }

    const bookingDetails = bookingDetailsResult[0];

    // Retrieve customer details
    const [customerResult] = await db.execute(
      "SELECT * FROM customers WHERE id = ?",
      [bookingDetails.customer_id]
    );

    if (customerResult.length === 0) {
      return res.status(404).send({ error: "Customer not found" });
    }

    const customerDetails = customerResult[0];

    // delete the booking
    await db.execute("DELETE FROM bookings WHERE id = ?", [bookingId]);

    // Send booking deletion email
    await sendBookingDeletionEmail(customerDetails, bookingDetails);

    res.send({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Failed to delete booking" });
  }
});

export default router;
