import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProvidersDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailabilityService: ListProvidersDayAvailabilityService;

describe('ListProvidersDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    listProvidersDayAvailabilityService = new ListProvidersDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to list the day availability from providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 27, 14, 0, 0)  //construção de um objeto date no javascript
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 27, 15, 0, 0)  //construção de um objeto date no javascript
    });

    //getTime para retornar no mesmo formato
    //função para retornar um valor fictício
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 27, 11).getTime();
    });

    //semanticamente o dev deve passar da forma abaixo
    const availability = await listProvidersDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
      day: 27,
    });
    //eu espero que a resposta seja um array e que dentro dela tenha o dia 27,28 com available: false
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 13, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
