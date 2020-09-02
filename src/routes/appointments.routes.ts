import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

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
  const { provider, date } = request.body;

  const parsedDate = parseISO(date);
 
  return response.json(appointment);
});

export default appointmentsRouter;