import express from "express";
import userRoutes from "./userRoutes.js";
import boardingRoutes from "./boardingRoutes.js";
import contactUsRoutes from "./contactUsRoutes.js";
import chatRoutes from "./chatRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import adminRoutes from "./adminRoutes.js";
import universityRoutes from "./universityRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({msg: "API is running"});
});

router.use("/api/users", userRoutes);
router.use("/api/boardings", boardingRoutes);
router.use("/api/contactUs", contactUsRoutes);
router.use("/api/chat", chatRoutes);
router.use("/api/booking", bookingRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/admin", adminRoutes);
router.use("/api/university", universityRoutes);
router.use("/api/favourite", universityRoutes);
export default router;