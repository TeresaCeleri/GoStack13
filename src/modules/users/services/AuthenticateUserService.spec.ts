import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';

//criar uma abstração
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe(' AuthenticateUser', () => {
  beforeEach(() => {
    //passamos repositorio fake
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    //criamos nosso server
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate', async () => {
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
  });

  it('Should not be able to authenticate with non existing user', async () => {
    //verificar se está retornando o esperado
    await expect(
      authenticateUser.execute({
        email: 'johndoe@exemplo.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456',
    });

    //verificar se está retornando o esperado
    await expect(
      authenticateUser.execute({
        email: 'johndoe@exemplo.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
