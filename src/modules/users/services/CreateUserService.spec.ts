import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    //passamos repositorio fake
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    //criamos nosso server
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('Should be able to create a new user', async () => {
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
    //criamos um novo appointment passando
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    //verificar se está retornando o esperado
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@exemplo.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
