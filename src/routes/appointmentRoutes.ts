import { Router } from "express";
import * as AppointmenteController from "../controllers/AppointmentController";
import auth from "../middlewares/auth";

const appointmentRoutes = Router();

appointmentRoutes.get("/appointment", auth,AppointmenteController.listAppointments);

appointmentRoutes.post("/appointment", auth,AppointmenteController.createAppointment);

appointmentRoutes.put("/appointment/:appointmentId", auth, AppointmenteController.updateAppointment)

appointmentRoutes.delete("/appointment/:appointmentId", auth, AppointmenteController.deleteAppointment)

export default appointmentRoutes;
