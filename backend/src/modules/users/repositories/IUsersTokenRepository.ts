import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generated(user_id: string): Promise<UserToken>;
}
