import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    //passamos repositorio fake
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    //criamos noso server
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to create a new user', async () => {
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
    //verificar se está retornando o esperado
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should delete old avatar when updating new one', async () => {
    //retorna a função que queremos espionar
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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
