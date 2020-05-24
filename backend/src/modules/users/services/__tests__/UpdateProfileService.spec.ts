import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository';
import UpdateProfileService from '../UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the name', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'Tatiana',
      email: 'thiago@maha.com',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('Tatiana');
    expect(updatedUser.email).toBe('thiago@maha.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-valid-id',
        name: 'Thiago',
        email: 'thiago2@maha.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'Thiago',
      email: 'thiago2@maha.com',
      user_id: user.id,
    });

    expect(updatedUser.email).toBe('thiago2@maha.com');
  });

  it('should be able to change to another user email.', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@maha.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        email: 'johndoe@maha.com',
        name: 'Tatiana',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      name: 'Thiago',
      email: 'thiago@maha.com',
      user_id: user.id,
      old_password: '123456',
      password: '147258369',
    });

    expect(updatedUser.password).toBe('147258369');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'Thiago',
        email: 'thiago@maha.com',
        user_id: user.id,
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        name: 'Thiago',
        email: 'thiago@maha.com',
        user_id: user.id,
        old_password: '123456s',
        password: '147258369',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
