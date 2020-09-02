import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/*
Recebimento das finformações
tratativa de erros e excessoes
acesso ao reporitorio de appointment
*/

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
    const findAppointmentInSameDate =appointmentsRepository.findByDate(
      parsedDate,
      );
  
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    //qdo uso create, nao fica claro
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;