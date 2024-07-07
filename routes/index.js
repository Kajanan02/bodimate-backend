import express from "express";
import userRoutes from "./userRoutes.js";
import boardingRoutes from "./boardingRoutes.js";
import contactUsRoutes from "./contactUsRoutes.js";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/boardings", boardingRoutes);
router.use("/api/contactUs", contactUsRoutes);

export default router;