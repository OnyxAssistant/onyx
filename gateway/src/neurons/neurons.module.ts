import { Module } from '@nestjs/common';
import { NeuronsService } from './neurons.service';
import { NeuronsController } from './neurons.controller';
import { NeuronsEventsService } from './neurons-events.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://onyx-queue:5672',
      exchanges: [
        {
          name: 'neuron.events',
          type: 'topic',
        },
      ],
      defaultRpcTimeout: 15000,
      enableControllerDiscovery: true,
    }),
  ],
  controllers: [NeuronsController],
  providers: [NeuronsService, NeuronsEventsService],
  exports: [NeuronsService, NeuronsEventsService],
})
export class NeuronsModule {}
