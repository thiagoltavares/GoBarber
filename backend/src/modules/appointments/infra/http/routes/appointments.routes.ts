import { Router } from 'express';
import ensureAthenticated from '@modules/users/infra/http/middlewares/ensureAthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentRouter.use(ensureAthenticated);

/* appointmentRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

appointmentRouter.post('/', appointmentsController.create);

export default appointmentRouter;
