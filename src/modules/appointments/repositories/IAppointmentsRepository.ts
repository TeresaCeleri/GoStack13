import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllMonthFromProvider(date: IFindAllMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllDayFromProviderDTO): Promise<Appointment[]>;
}
