import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class NeuronsEventsService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async emitUserConnected(user: any) {
    try {
      await this.amqpConnection.publish('neuron.events', 'user.connected', {
        user,
        timestamp: new Date(),
      });
      console.log('User connected event emitted successfully');
    } catch (error) {
      console.error('Failed to emit user connected event:', error);
    }
  }
}
