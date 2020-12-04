import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProvidersMonthAvailabilityService from './ListProvidersMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthAvailabilityService: ListProvidersMonthAvailabilityService;

describe('ListProvidersMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository;
    listProvidersMonthAvailabilityService = new ListProvidersMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

  it('Should be able to list the providers', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 27, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 27, 10, 0, 0)  //construção de um objeto date no javascript
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 28, 8, 0, 0)
    });

    //semanticamente o dev deve passar da forma abaixo
    const availability = await listProvidersMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
    });
    //eu espero que a resposta seja um array e que dentro dela tenha o dia 27,28 com available: false
    expect(availability).toEqual(expect.arrayContaining([
      { day: 26, available: true },
      { day: 27, available: false },
      { day: 28, available: false },
      { day: 29, available: true },
    ]));
  });
});
