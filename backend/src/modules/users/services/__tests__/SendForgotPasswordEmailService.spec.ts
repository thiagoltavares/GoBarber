// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/EmailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '../SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover password using his email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    fakeUsersRepository.create({
      email: 'thiago@maha.com',
      password: '123456',
      name: 'Thiago',
    });

    await sendForgotEmail.execute({
      email: 'thiago@maha.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
