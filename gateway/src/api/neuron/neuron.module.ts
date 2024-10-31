import { Module } from '@nestjs/common';
import { NeuronController } from './neuron.controller';
import { NeuronService } from './neuron.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
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
  controllers: [NeuronController],
  providers: [NeuronService],
})
export class NeuronModule {}
