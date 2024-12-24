import express from 'express';
import { addDoctor,allDoctors,loginAdmin,appointmentAdmin,appointmentCancel,adminDashboard} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';
import apopointmentModel from '../models/appointmentModel.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.post('/all-doctors',authAdmin,allDoctors);
adminRouter.post('/change-availability',authAdmin,changeAvailability);
adminRouter.get('/appointments',authAdmin,appointmentAdmin);
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel);
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter;