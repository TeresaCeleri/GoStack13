import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
//nova interface
interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

usersRouter.post('/', async (request, response) => {
  try{
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name, email, password,
    });

    //nova linha
    const updateUser: IUser = {...user}

    //linha abaixo alterada - delete user.password;
    delete updateUser.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message});
  }
});

usersRouter.patch('./avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;