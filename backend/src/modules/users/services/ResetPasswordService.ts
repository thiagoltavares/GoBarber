import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

// import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokensProvider')
    private userTokensProvider: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensProvider.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exist');
    }

    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    user.password = password;

    this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
