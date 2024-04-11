import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index";
import express from "express";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket";

dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on ${port}`);
});
