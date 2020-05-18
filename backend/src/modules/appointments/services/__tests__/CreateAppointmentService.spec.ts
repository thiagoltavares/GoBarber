import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointments', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: 'dasdas5665',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
  });

  it('should not be able to create two appointments in the same date/time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointments.execute({
      date: appointmentDate,
      provider_id: 'dasdas5665',
    });

    expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: 'dasdas5665',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
