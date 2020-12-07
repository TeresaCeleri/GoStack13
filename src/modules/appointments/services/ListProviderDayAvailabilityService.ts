import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

//qdo tem um colchete no final, significa que é array
//criar um tipo no typescript, este tipo é do tipo array
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  //metodo findByDate procura numa data especifica
  //preciso crir um novo metodo para ler de um array
  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    });

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment =>
        getHours(appointment.date) == hour,
      );

      //comparar data e hora
      const compareDate = new Date(year, month - 1, day, hour); //2020-11-27 08:00:00 ...

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
