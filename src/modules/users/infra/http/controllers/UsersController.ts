import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

//nova interface
interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
  }

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
  
    const user = await createUser.execute({
      name, email, password,
    });
  
    //nova linha
    const updateUser: IUser = { ...user }
  
    //linha abaixo alterada - delete user.password;
    delete updateUser.password;
  
    return response.json(user);
  }
}