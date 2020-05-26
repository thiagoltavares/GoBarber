import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMounthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMounthFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentsDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMouthFromProvider(
    data: IFindAllInMounthFromProviderDTO,
  ): Promise<Appointment[]>;
}
