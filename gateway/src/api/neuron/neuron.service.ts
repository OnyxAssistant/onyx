import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class NeuronService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendNeuronPathEvent(path: string, data: any) {
    try {
      const routingKey = path.replace(/^\//, '').split('/').join('.');

      const response = await this.amqpConnection.request({
        exchange: 'neuron.events',
        routingKey: routingKey,
        payload: data,
      });

      console.log(`RPC call ${routingKey} completed successfully`);
      return response;
    } catch (error) {
      console.error(`Failed to make RPC call for path ${path}:`, error);
      throw error;
    }
  }
}
