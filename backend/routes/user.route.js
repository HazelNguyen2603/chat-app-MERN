import express from "express";
import protectRoute from "../middleware/protectRoute";
import { getUserForSidebar } from "../controllers/user";

const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);

export default router;
