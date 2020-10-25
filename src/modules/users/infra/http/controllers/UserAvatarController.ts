import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

//nova interface
interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at: Date;
    updated_at: Date;
  }

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    //nova linha
    const updateUser: IUser = { ...user }

    //linha abaixo alterada - delete user.password;
    delete updateUser.password;

    return response.json(user);
  }
}