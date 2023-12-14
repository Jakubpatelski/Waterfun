import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

// middleware to parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //true runs on https so should be false
  })
);

// check if the user is authenticated
export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

import loginRouter from "./routers/loginRouter.js";
app.use("/api/login", loginRouter);

import logoutRouter from "./routers/logoutRouter.js";
app.use("/api/logout", logoutRouter);

import contactRouter from "./routers/contactRouter.js";
app.use("/api/contact", contactRouter);

import userRouter from "./routers/usersRouter.js";
app.use("/api/users", userRouter);

import tracksRouter from "./routers/tracksRouter.js"
app.use("/api/tracks", tracksRouter);

import customerRouter from "./routers/customerRouter.js"
app.use("/api/customers", customerRouter);

import bookingRouter from "./routers/bookingRouter.js"
app.use("/api/bookings", bookingRouter);
 

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
