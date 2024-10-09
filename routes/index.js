import express from "express";
import userRoutes from "./userRoutes.js";
import boardingRoutes from "./boardingRoutes.js";
import contactUsRoutes from "./contactUsRoutes.js";
import chatRoutes from "./chatRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({msg: "API is running"});
});

router.use("/api/users", userRoutes);
router.use("/api/boardings", boardingRoutes);
router.use("/api/contactUs", contactUsRoutes);
router.use("/api/chat", chatRoutes)

export default router;