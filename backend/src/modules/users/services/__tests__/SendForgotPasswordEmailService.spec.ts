import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/EmailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using his email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create({
      email: 'thiago@maha.com',
      password: '123456',
      name: 'Thiago',
    });

    await sendForgotPasswordEmail.execute({
      email: 'thiago@maha.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('not be able to recover a non-existent user email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'thiago@maha.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generated');

    const user = await fakeUsersRepository.create({
      email: 'thiago@maha.com',
      password: '123456',
      name: 'Thiago',
    });

    await sendForgotPasswordEmail.execute({
      email: 'thiago@maha.com',
    });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  });
});
