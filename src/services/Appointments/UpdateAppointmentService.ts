import { HTTPError } from "../../middlewares/error_handler";
import Appointment from "../../models/Appointment";
import * as Yup from 'yup'

interface AppointmentData {
  start?: string;
  end?: string;
  title?: string;
  description?: string;
  with?: string;
}
interface Request {
  appointmentData: AppointmentData;
  userId: string | number;
  appointmentId: string | number;
}

const UpdateAppointmentService = async ({
  appointmentData,
  userId,
  appointmentId
}: Request): Promise<Appointment> => {
  const {
    start,
    end,
    title,
    description,
    with: participant
  } = appointmentData;

  const appointment = await Appointment.findOne({
    where: {
      userId,
      id: appointmentId
    }
  })

  if (appointment == null) {
    throw new HTTPError(404, "Agendamento não encontrado")
  }

  await appointment.update({
    start,
    end,
    title,
    description,
    with: participant,
    userId
  });

  appointment.reload()

  return appointment
} 

export default UpdateAppointmentService