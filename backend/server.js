import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index";
import express from "express";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket";
import path from "path";

dotenv.config();

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//static method to serve any static file in frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(port, () => {
  connectToMongoDB();
  console.log(`server is running on ${port}`);
});
