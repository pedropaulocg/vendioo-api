import { Op } from "sequelize";
import Appointment from "../../models/Appointment";


interface Request {
  startDate: string;
  endDate: string;
  userId: string | number;
}

interface Response {
  count: number;
  appointments: Appointment[]
}

const ListAppointmentsService = async ({
  startDate,
  endDate,
  userId
}: Request): Promise<Response> => {
  console.log(startDate, endDate);
  
  const { count, rows: appointments } = await Appointment.findAndCountAll({
    where: {
      start: {
        [Op.between]: [startDate, endDate],
      },
      userId: userId,
    },
  });

  return {
    count,
    appointments,
  };
};

export default ListAppointmentsService