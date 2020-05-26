import { Router } from 'express';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAthenticated);

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
