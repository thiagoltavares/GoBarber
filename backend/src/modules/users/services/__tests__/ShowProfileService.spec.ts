import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository';
import ShowProfileService from '../ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Thiago');
    expect(profile.email).toBe('thiago@maha.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-valid-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
