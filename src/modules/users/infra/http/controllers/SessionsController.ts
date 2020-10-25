import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticationUserService';

//nova interface
interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    //nova linha
    const updateUser: IUser = { ...user }
    //linha alterada - delete user.password;
    delete updateUser.password;

    return response.json({ user, token }); 
  }
}