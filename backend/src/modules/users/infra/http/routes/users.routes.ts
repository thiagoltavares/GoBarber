import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersAvatarController from '@modules/users/infra/http/controllers/UsersAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

/* usersRouter.get('/', async (request, response) => {
  const users = await usersRepository.find();

  return response.json(users);
}); */

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
