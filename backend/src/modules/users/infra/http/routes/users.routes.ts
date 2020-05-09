import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({ email, name, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const { id } = request.user;
    const { filename } = request.file;

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename,
    });
    return response.json(user);
  },
);
export default usersRouter;
