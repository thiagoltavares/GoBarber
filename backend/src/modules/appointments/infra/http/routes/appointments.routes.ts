import { Router } from 'express';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentRouter.use(ensureAthenticated);

appointmentRouter.post('/', appointmentsController.create);

appointmentRouter.get('/me', providerAppointmentsController.index);

export default appointmentRouter;
