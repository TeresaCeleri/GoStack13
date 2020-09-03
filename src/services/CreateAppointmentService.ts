import { startOfHour } from "date-fns";
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
interface Request {
  provider: string;
  date: Date;
}
/*
dependency inversion - SOLID
*/
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;
  
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({date, provider}: Request): Appointment {
    const appointmentDate = startOfHour(date);  

    //qdo uso findbydate, estou procurando por um unico data
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
      );
  
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    //qdo uso create, nao fica claro
    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;