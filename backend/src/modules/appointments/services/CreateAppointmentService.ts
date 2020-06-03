import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUserRepository from '@modules/users/repositories/IUserRepository';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    /**
     * Validation created out of rocket
     */
    const checkProviderExists = await this.usersRepository.findById(
      provider_id,
    );

    if (!checkProviderExists) throw new AppError('Provider not found');
    /**
     * End of out of rocket validation
     */

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date');
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError(
        'You can only create appointment between 8am and 17pm',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const dateFormatted = format(appointmentDate, 'dd/MM/yyyy HH:mm');

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointments in ${dateFormatted}`,
    });

    console.log(cacheKey);

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
