import { Request, Response, NextFunction } from "express";
import ListAppointmentsService from "../services/Appointments/ListAppointmentsService";
import CreateAppointmentService from "../services/Appointments/CreateAppointmentService";

type IndexQuery = {
  startDate: string;
  endDate: string;
}

export const listAppointments = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { userId } = req.user;
    const { startDate, endDate } = req.query as IndexQuery;
  
    const appointments = await ListAppointmentsService({startDate, endDate, userId});
  
    return res.status(200).json(appointments);
  }catch (e) {
    next(e)
  }
}

export const createAppointment = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { userId } = req.user;
    const appointmentData = req.body
    const appointments = await CreateAppointmentService({appointmentData, userId});
  
    return res.status(200).json(appointments);
  }catch (e) {
    next(e)
  }
}