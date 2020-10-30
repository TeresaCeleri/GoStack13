//deletar tudo que está relacionado com typeorm
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const finUser = this.users.find(user => user.id === id);

    return finUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const finUser = this.users.find(user => user.email === email);

    return finUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;