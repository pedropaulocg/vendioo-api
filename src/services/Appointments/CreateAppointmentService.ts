import { HTTPError } from "../../middlewares/error_handler";
import Appointment from "../../models/Appointment";
import * as Yup from 'yup'

interface AppointmentData {
  start: string;
  end: string;
  title: string;
  description?: string;
  with: string;
}
interface Request {
  appointmentData: AppointmentData;
  userId: string | number;
}

const CreateAppointmentService = async ({
  appointmentData,
  userId
}: Request): Promise<Appointment> => {
  const {
    start,
    end,
    title,
    description,
    with: participant
  } = appointmentData;
  
  const schema = Yup.object().shape({
    start: Yup.string().required(),
    end: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string(),
    with: Yup.string(),

  })

  try {
    await schema.validate({start, end, title, description, with: participant });
  } catch (e) {
    console.log(e);
    throw new HTTPError(400, 'Verifique os campos')
  }

  const appointment = await Appointment.create({
    start,
    end,
    title,
    description,
    with: participant,
    userId
  });

  return appointment
} 

export default CreateAppointmentService