// test('dois numeros', () => {
//     expect(1 + 2).toBe(3);
// });

import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    //passamos repositorio fake
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    //criamos noso server
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    //criamos um novo appointment passando
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    //verificar se está retornando o esperado
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('Should Not be able to create two appointments on the same', async () => {
    //passamos repositorio fake
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    //criamos noso server
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    //ano, mes(começa 0, dia, hora)
    const appointmentDate = new Date(2020, 9, 30, 15);

    //criamos um novo appointment passando
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    })).rejects.toBeInstanceOf(AppError);
  });
});