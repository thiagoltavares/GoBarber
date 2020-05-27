import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '../CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointments: CreateAppointmentService;

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointments = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '123456',
      user_id: '123654',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
  });

  it('should not be able to create two appointments in the same date/time', async () => {
    const appointmentDate = new Date();

    await createAppointments.execute({
      date: appointmentDate,
      provider_id: '123456',
      user_id: '123654',
    });

    await expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: '123654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
