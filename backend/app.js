import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(express.json()); //to parse the incoming requests with JSON payloads

app.use("/api/auth", authRoutes);

export default app;
