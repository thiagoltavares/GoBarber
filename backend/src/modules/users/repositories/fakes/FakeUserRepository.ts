import { uuid } from 'uuidv4';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let allProviders = this.users;

    if (except_user_id) {
      allProviders = this.users.filter(user => user.id !== except_user_id);
    }

    return allProviders;
  }

  public async findById(id: string): Promise<User | undefined> {
    const userById = this.users.find(user => user.id === id);

    return userById;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userByEmail = this.users.find(user => user.email === email);

    return userByEmail;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[userIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
