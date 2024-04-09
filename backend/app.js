import express from "express";
import cookieParser from "cookie-parser";

import { authRoutes, messageRoutes, userRoutes } from "./routes/index";

const app = express();

app.use(express.json()); //to parse the incoming requests with JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

export default app;
