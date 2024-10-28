import { Injectable } from '@nestjs/common';
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';

interface Neuron {
  name: string;
  version: string;
  endpoints: string[];
  timestamp: Date;
}

@Injectable()
export class NeuronsService {
  private neurons: Map<string, Neuron> = new Map();

  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'neuron.events',
    routingKey: 'neuron.discovery',
    queue: 'neuron_discovery',
  })
  async handleNeuronDiscovery(data: Neuron) {
    console.log('New neuron discovered:', data);
    this.neurons.set(data.name, data);
  }

  async getAllNeurons() {
    return Array.from(this.neurons.values());
  }
}
