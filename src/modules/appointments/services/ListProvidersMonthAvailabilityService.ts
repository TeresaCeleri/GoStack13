import { injectable, inject } from 'tsyringe';

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
    const appointments = this.appointmentsRepository.findAllMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    console.log(appointments);

    //return [{ day: 1, available: false }];
  }
}

export default ListProvidersMonthAvailabilityService;
