import { HTTPError } from "../../middlewares/error_handler"
import Appointment from "../../models/Appointment";


export const DeleteAppointmentService = async (appointmentId: string | number): Promise<void> => {
  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
    }
  })
  
  if (!appointment) {
    throw new HTTPError(404, "Agendamento não encontrado")
  }

  await appointment.destroy();
}

