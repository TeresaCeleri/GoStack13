import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(
      fakeUsersRepository
    );
  });

  it('Should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemplo.com',
      password: '123456'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@exemplo.com',
      password: '123456'
    });

    const loggerUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@exemplo.com',
      password: '123456'
    });

    const providers = await listProviders.execute({
      user_id: loggerUser.id,
    });

    //verificar se está retornando o esperado
    //nao poder usar toBe e sim toEqual
    expect(providers).toEqual([user1, user2]);
  });
});

