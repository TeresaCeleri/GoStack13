import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository
    );
  });

  it('Should be able show the profile', async () => {
    //criamos um novo appointment passando
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    //verificar se está retornando o esperado
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@exemplo.com');
  });

  it('Should notbe able show the profile from non-existing user', async () => {
    //criamos um novo appointment passando
    expect(showProfile.execute({
      user_id: 'non-existing-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});


