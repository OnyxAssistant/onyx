import { Injectable, OnModuleInit } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class NeuronsEventsService implements OnModuleInit {
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

  async onModuleInit() {
    console.log('Emitting ask for discovery event');
    await this.amqpConnection.publish(
      'neuron.events',
      'neuron.ask_for_discovery',
      {
        timestamp: new Date(),
      },
    );
  }
}
