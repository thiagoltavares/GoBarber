import { Router } from 'express';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import ProvidersControllers from '@modules/appointments/infra/http/controllers/ProvidersControllers';

const providersRouter = Router();
const providersController = new ProvidersControllers();

providersRouter.use(ensureAthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
