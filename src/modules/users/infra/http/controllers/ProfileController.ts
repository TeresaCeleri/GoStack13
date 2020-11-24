import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

//nova interface
interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

export default class ProfileController {
  //rota para mostrar perfi do usuario
  public async show(request: Request, response: Response): Promise<Response> {
    //exibir perfil
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    //nova linha
    const updateUser: IUser = { ...user }

    //linha abaixo alterada - delete user.password;
    delete updateUser.password;

    return response.json(user);
  }
}
