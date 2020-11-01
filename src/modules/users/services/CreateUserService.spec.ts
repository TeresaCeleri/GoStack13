import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    //criamos noso server
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    //criamos um novo appointment passando
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    //verificar se está retornando o esperado
    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same email from another ', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    //criamos noso server
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    //criamos um novo appointment passando
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    //verificar se está retornando o esperado
    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@exemplo.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
