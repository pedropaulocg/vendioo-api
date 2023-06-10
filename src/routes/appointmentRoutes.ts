import { Router } from "express";
import * as AppointmenteController from "../controllers/AppointmentController";
import auth from "../middlewares/auth";

const appointmentRoutes = Router();

appointmentRoutes.get("/appointment", auth,AppointmenteController.listAppointments);

appointmentRoutes.post("/appointment", auth,AppointmenteController.createAppointment);

// appointmentRoutes.put("/products/:productId", auth, AppointmenteController.updateProduct)

// appointmentRoutes.delete("/products/:productId", auth, AppointmenteController.deleteProduct)

export default appointmentRoutes;
