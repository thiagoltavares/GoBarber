import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvalabilityService from '@modules/appointments/services/ListProviderDayAvalabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listProviderDayhAvalabilityService = container.resolve(
      ListProviderDayAvalabilityService,
    );

    const availability = await listProviderDayhAvalabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(availability);
  }
}
