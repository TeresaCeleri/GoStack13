import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticationUserService';

const sessionsRouter = Router();
//nova interface
interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();
  
  const { user, token } = await authenticateUser.execute({
      email, 
      password,
  });
  //nova linha
  const updateUser: IUser = {...user}
  //linha alterada - delete user.password;
  delete updateUser.password;

  return response.json( { user, token });

});

export default sessionsRouter;