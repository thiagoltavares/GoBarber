import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '../AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago Maha',
      email: 'thiagosasasa@maha.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'thiagosasasa@maha.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate invalid email', async () => {
    await expect(
      authenticateUser.execute({
        email: 'errormail@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await fakeUsersRepository.create({
      name: 'Thiago Maha',
      email: 'thiago@maha.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'thiago@maha.com',
        password: 'failpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
