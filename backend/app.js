import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRoutes, messageRoutes } from "./routes/index";

dotenv.config();

const app = express();

app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

export default app;
