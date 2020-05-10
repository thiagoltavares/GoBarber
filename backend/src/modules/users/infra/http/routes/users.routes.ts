import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const avatarController = new AvatarController();

/* usersRouter.get('/', async (request, response) => {
  const users = await usersRepository.find();

  return response.json(users);
}); */

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default usersRouter;
