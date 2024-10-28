import { Controller, Get } from '@nestjs/common';
import { NeuronsService } from './neurons.service';

@Controller()
export class NeuronsController {
  constructor(private readonly neuronsService: NeuronsService) {}

  @Get('get-neurons')
  async getNeurons(): Promise<any> {
    return await this.neuronsService.getAllNeurons();
  }
}
