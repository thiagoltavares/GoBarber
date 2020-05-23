import { Router } from 'express';

import ForgotPasswordcontroller from '@modules/users/infra/http/controllers/ForgotPasswordcontroller';
import ResetPasswordcontroller from '@modules/users/infra/http/controllers/ResetPasswordcontroller';

const passwordRouter = Router();
const forgotPasswordcontroller = new ForgotPasswordcontroller();
const resetPasswordcontroller = new ResetPasswordcontroller();

passwordRouter.post('/forgot', forgotPasswordcontroller.create);
passwordRouter.post('/reset', resetPasswordcontroller.create);

export default passwordRouter;
