import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMounthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMounthFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepositories implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findAllInMouthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMounthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentByDate = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return appointmentByDate;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });
    // appointment.id = uuid();
    // appointment.provider_id = provider_id;
    // appointment.date = date;

    this.appointments.push(appointment);
    return appointment;
  }
}

export default AppointmentsRepositories;
