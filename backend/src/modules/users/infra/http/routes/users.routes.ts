import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

/* usersRouter.get('/', async (request, response) => {
  const users = await usersRepository.find();

  return response.json(users);
}); */

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
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
