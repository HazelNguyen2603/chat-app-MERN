import express from "express";
import {
  sendMessage,
  getMessage,
  deleteMessage,
} from "../controllers/message/index.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:id", protectRoute, deleteMessage);

export default router;
