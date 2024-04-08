import express from "express";
import { sendMessage } from "../controllers/message/index";

const router = express.Router();

router.post("/send/:id", protectRoute, sendMessage);

export default router;
