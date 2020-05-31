import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordcontroller from '@modules/users/infra/http/controllers/ForgotPasswordcontroller';
import ResetPasswordcontroller from '@modules/users/infra/http/controllers/ResetPasswordcontroller';

const passwordRouter = Router();
const forgotPasswordcontroller = new ForgotPasswordcontroller();
const resetPasswordcontroller = new ResetPasswordcontroller();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordcontroller.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordcontroller.create,
);

export default passwordRouter;
