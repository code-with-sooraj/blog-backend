import express from "express";
import { approveBlog, deleteBlog, deleteUser } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/approve-blog/:id", protect, adminOnly, approveBlog);
router.delete("/delete-blog/:id", protect, adminOnly, deleteBlog);
router.delete("/delete-user/:id", protect, adminOnly, deleteUser);

export default router;
