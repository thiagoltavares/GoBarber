import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
