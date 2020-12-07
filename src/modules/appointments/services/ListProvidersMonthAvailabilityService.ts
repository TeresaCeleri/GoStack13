import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

/*
* [ { day: 1, available: false }, { day: 2, available: false }, { day: 3, available: false } ]
*/

//qdo tem um colchete no final, significa que é array
//criar um tipo no typescript, este tipo é do tipo array
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvidersMonthAvailabilityService {
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
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );
    //qtde de dias do mes
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month = 1));

    const eachDayArray = Array.from({ length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    //vai ter agendamentos entre 8h e 17h = 10 agendamentos
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) == day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProvidersMonthAvailabilityService;
