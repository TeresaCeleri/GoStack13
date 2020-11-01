import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';

describe(' AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    //criamos noso server
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      );
    const authenticateUser = new  AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    //criamos um novo appointment passando
    const response = await authenticateUser.execute({
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    //verificar se está retornando o esperado
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
