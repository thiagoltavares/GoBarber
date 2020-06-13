import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvalabilityService from '@modules/appointments/services/ListProviderMonthAvalabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listProviderMonthAvalabilityService = container.resolve(
      ListProviderMonthAvalabilityService,
    );

    const availability = await listProviderMonthAvalabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}
