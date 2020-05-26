import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersServices from '../ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;

let listProvidersServices: ListProvidersServices;

describe('listProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersServices = new ListProvidersServices(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Thiago',
      email: 'thiago@maha.com',
      password: '123456',
    });

    const provider1 = await fakeUsersRepository.create({
      name: 'Tati',
      email: 'tati@maha.com',
      password: '123456',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Selma',
      email: 'selma@maha.com',
      password: '123456',
    });

    const providers = await listProvidersServices.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([provider1, provider2]);
  });
});
