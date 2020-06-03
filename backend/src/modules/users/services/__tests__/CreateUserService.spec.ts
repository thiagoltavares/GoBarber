import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two User with the same email', async () => {
    await createUser.execute({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Thiago',
        email: 'thiago@maha.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
