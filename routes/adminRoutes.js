import express from 'express';
import {getAdminDashboardData} from "../controllers/adminController.js";

const router = express.Router();

router.route('/admin-dashboard').get(getAdminDashboardData);

export default router;