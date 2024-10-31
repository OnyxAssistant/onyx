import { Controller, Get, Patch, Body, UseGuards, All, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { NeuronService } from './neuron.service';
import { AuthGuard } from '@/api/auth/auth.guard';
import { Request } from 'express';
import { User } from '@/decorators/user.decorator';

@Controller('neuron')
@ApiTags('Neuron')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class NeuronController {
  constructor(private readonly neuronService: NeuronService) {}

  @All('*')
  async handleAllRequests(@User() user: any, @Req() request: Request) {
    const path = request.path.replace('/neuron', '');

    const data = {
      user,
      body: request.body,
      query: request.query,
      params: request.params,
      method: request.method,
    };

    return await this.neuronService.sendNeuronPathEvent(path, data);
  }
}
