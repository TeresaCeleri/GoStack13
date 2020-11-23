import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  //rota para mostrar perfi do usuario
  public async show(request: Request, response: Response): Promise<Response> {
    //exibir perfil
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

    delete user.password;

    return response.json(user);
  }
}
