import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersControllers';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();

const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providersController = new ProvidersController();

providersRouter.use(ensureAthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

export default providersRouter;
