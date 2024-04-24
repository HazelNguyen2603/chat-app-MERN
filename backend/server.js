import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index.js";

import connectMongo from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import session from "express-session";
import logger from "morgan";
import path from "path";
import configFacebookPassport from "./passports/facebook.config.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
app.use(logger("dev"));
configFacebookPassport();

const port = process.env.PORT || 5000;

const __dirname = path.resolve();
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URI,
  collection: "session",
});

store.on("error", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // this option specifies whether to save the session to the store on every request
    saveUninitialized: false, // option specifies whether to save uninitialized sessions
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true, // this option prevents the Cross-Site Scripting (XSS) attacks
    },
    store: store,
  })
);

app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

//static method to serve any static file in frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on ${port}`);
});
