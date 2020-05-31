import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().valid(Joi.ref('old_password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
