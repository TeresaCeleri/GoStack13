import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

//DTO - data transfer object

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

//a rota não tem a responsabilidade de se conectar
//com a fonte de dados da nossa aplicaçao
//nosso repositories é que deve fz isso

//SoC: Separation of concerns
//ou seja, separação das preocupaçoes

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try{
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({ 
      date: parsedDate, 
      provider,
    });
  
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
});

export default appointmentsRouter;