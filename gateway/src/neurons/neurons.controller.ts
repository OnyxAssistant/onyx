import { Controller, Get, Post, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { NeuronsService } from './neurons.service';

interface InstallNeuronDto {
  url?: string;
  slug?: string;
}

@Controller('neurons')
export class NeuronsController {
  constructor(
    private readonly neuronsService: NeuronsService,
  ) {}

  @Get('/')
  async getNeurons(): Promise<any> {
    return await this.neuronsService.getAllNeurons();
  }

  @Get('/store')
  async getNeuronsStore(): Promise<any> {
    return await this.neuronsService.getNeuronsStore();
  }

  @Post('/install')
  async installNeuron(@Body() installDto: InstallNeuronDto): Promise<{success: boolean}> {
    if (!installDto.url && !installDto.slug) {
      throw new BadRequestException('Either url or slug must be provided');
    }

    let githubUrl = installDto.url;
    
    if (installDto.slug) {
      const store = await this.neuronsService.getNeuronsStore();
      const neuron = store.find(n => n.slug === installDto.slug);
      if (!neuron) {
        throw new BadRequestException(`Neuron with slug ${installDto.slug} not found in store`);
      }
      githubUrl = neuron.url;
    }


    return await this.neuronsService.installNeuron(githubUrl);
  }

  @Delete('/:slug')
  async uninstallNeuron(@Param('slug') slug: string): Promise<{success: boolean}> {
    return await this.neuronsService.uninstallNeuron(slug);
  }
}
