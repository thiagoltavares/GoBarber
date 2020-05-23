import { Router } from 'express';
import appointments from '@modules/appointments/infra/http/routes/appointments.routes';
import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import passwords from '@modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/password', passwords);

export default routes;
