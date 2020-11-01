import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('Should be able to create a new user', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider ();
    //criamos noso server
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    //criamos um novo appointment passando
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    //verificar se está retornando o esperado
    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not be able to update avatar from non existing user', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider ();
    //criamos noso server
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    //verificar se está retornando o esperado
    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when updating new one', async () => {
    //passamos repositorio fake
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider ();

    //retorna a função que queremos espionar
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    //criamos noso server
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    //criamos um novo appointment passando
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    //espero que esta função tenha sido chamada
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    //verificar se está retornando o esperado
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
