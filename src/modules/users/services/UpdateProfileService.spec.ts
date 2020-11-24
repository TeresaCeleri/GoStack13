import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    //passamos repositorio fake
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    //criamos noso server
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able update the profile', async () => {
    //criamos um novo appointment passando
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@exemplo.com',
    });

    //verificar se está retornando o esperado
    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johntre@exemplo.com');
  });

  it('Should notbe able show the profile from non-existing user', async () => {
    //criamos um novo appointment passando
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'test',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@exemplo.com',
      password: '123456'
    });

    //espero que dê erro - uso expect
    //toda vez que faço alguma coisa assincrona dentro do expect, tem que por await
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@exemplo.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able update the password', async () => {
    //criamos um novo appointment passando
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@exemplo.com',
      old_password: '123456',
      password: '123123',
    });

    //verificar se está retornando o esperado
    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@exemplo.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password with wrong old password', async () => {
    //não pode atualizar, se informar a senha antiga errado
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Tre',
        email: 'johntre@exemplo.com',
        old_password: 'wrong-old-pasword',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

