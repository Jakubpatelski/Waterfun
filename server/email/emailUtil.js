import nodemailer from "nodemailer";

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jakubnodemailer@gmail.com",
    pass: process.env.Nodemailer_Password,
  },
});

export async function sendBookingConfirmationEmail(
  customerDetails,
  bookingDetails
) {
  try {
    const info = await transporter.sendMail({
      to: customerDetails.email,
      subject: `Booking Confirmation, ${bookingDetails.id}`,
      html: `
          <html>
            <body>
            <p>Your booking number is: ${bookingDetails.id}</p>
            <p>Hey, ${customerDetails.name}, your booking has been confirmed!</p>
              <p><strong>Booking Start:</strong> ${bookingDetails.booking_start}</p>
              <p><strong>Booking End:</strong> ${bookingDetails.booking_end}</p>
              <p><strong>Price:</strong> ${bookingDetails.price}</p>
              <p><strong>Pick Up Location:</strong> ${bookingDetails.pick_up_location}</p>
              <p><strong>Details:</strong> ${bookingDetails.details}</p>
              <p>Best Regards,</p>
              <p>The Waterfun Team</p>
            </body>
          </html>
        `,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendBookingEditConfirmationEmail(
  customerDetails,
  bookingDetails
) {
  try {
    const info = await transporter.sendMail({
      to: customerDetails.email,
      subject: `Booking Update Confirmation, ${bookingDetails.id}`,
      html: `
          <html>
            <body>
            <p>Your booking number: ${bookingDetails.id} has been updated.</p>
            <p>Hello ${customerDetails.name}, your booking has been successfully updated with the new details:</p>
              <p><strong>New Booking Start:</strong> ${bookingDetails.booking_start}</p>
              <p><strong>New Booking End:</strong> ${bookingDetails.booking_end}</p>
              <p><strong>Price:</strong> ${bookingDetails.price}</p>
              <p><strong>Pick Up Location:</strong> ${bookingDetails.pick_up_location}</p>
              <p><strong>Details:</strong> ${bookingDetails.details}</p>
              <p>If you did not request this change, please contact us immediately.</p>
              <p>Best Regards,</p>
              <p>The Waterfun Team</p>
            </body>
          </html>
        `,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function sendBookingDeletionEmail(
  customerDetails,
  bookingDetails
) {
  try {
    const info = await transporter.sendMail({
      to: customerDetails.email,
      subject: `Booking Cancellation, ${bookingDetails.id}`,
      html: `
          <html>
            <body>
            <p>Your booking number: ${bookingDetails.id} has been canceled.</p>
            <p>Dear ${customerDetails.name}, we are sorry to inform you that your booking has been canceled.</p>
            <p>If this was a mistake or if you have any questions, please contact us immediately.</p>
            <p>Best Regards,</p>
            <p>The Waterfun Team</p>
            </body>
          </html>
        `,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
