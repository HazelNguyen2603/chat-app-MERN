import express from "express";
import { sendMessage, getMessage } from "../controllers/message/index";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
