import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import * as path from 'path';
import * as fs from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const NEURONS_DIR = '/neurons';

interface Neuron {
  manifest: {
    name: string;
    slug: string;
    url: string;
    description: string;
  };
  timestamp: Date;
}

@Injectable()
export class NeuronsService {
  private neurons: Map<string, Neuron> = new Map();

  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly httpService: HttpService
  ) {}

  @RabbitSubscribe({
    exchange: 'neuron.events',
    routingKey: 'neuron.discovery',
    queue: 'neuron_discovery',
  })
  async handleNeuronDiscovery(data: Neuron) {
    console.log('New neuron discovered:', data.manifest.name);
    this.neurons.set(data.manifest.slug, data);
  }

  async getAllNeurons() {
    return Array.from(this.neurons.values());
  }

  async getNeuronsStore() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('https://raw.githubusercontent.com/OnyxAssistant/store/refs/heads/main/neuron-list.json')
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching neuron store:', error);
      return [];
    }
  }

  private validateGithubUrl(url: string): boolean {
    try {
      const githubUrlPattern = /^https:\/\/github\.com\/[\w-]+\/[\w-]+(?:\.git)?$/;
      if (!githubUrlPattern.test(url)) {
        throw new HttpException('Invalid GitHub URL format', HttpStatus.BAD_REQUEST);
      }
      return true;
    } catch (error) {
      throw new HttpException('Invalid GitHub URL', HttpStatus.BAD_REQUEST);
    }
  }

  private validateNeuronName(name: string): boolean {
    const namePattern = /^[\w-]+$/;
    if (!namePattern.test(name)) {
      throw new HttpException('Invalid neuron name format', HttpStatus.BAD_REQUEST);
    }
    return true;
  }

  async installNeuron(githubUrl: string): Promise<{ success: boolean, error?: string }> {
    this.validateGithubUrl(githubUrl);
    
    const repoName = githubUrl.split("/").pop()?.replace(".git", "") || "";
    this.validateNeuronName(repoName);
    
    const neuronPath = path.join(NEURONS_DIR, repoName);
    const sanitizedPath = path.normalize(neuronPath).replace(/^(\.\.(\/|\\|$))+/, '');

    try {
      await execAsync(`git clone ${githubUrl} ${sanitizedPath}`);
      console.log(`Neuron ${repoName} installed successfully`);
      // Start docker compose
      await execAsync('docker-compose up -d --build', { cwd: sanitizedPath });
      console.log(`Docker compose started for neuron ${repoName}`);
      return { success: true };
    } catch (error) {
      console.error(`Error installing neuron ${repoName}:`, error);
      return { success: false, error: `Failed to install neuron ${repoName}` };
    }
  }

  async uninstallNeuron(neuronName: string): Promise<{ success: boolean, error?: string }> {
    this.validateNeuronName(neuronName);
    
    const neuronPath = path.join(NEURONS_DIR, neuronName);
    const sanitizedPath = path.normalize(neuronPath).replace(/^(\.\.(\/|\\|$))+/, '');
    
    try {
      // Stop docker compose
      await execAsync('docker-compose down', { cwd: sanitizedPath });
      console.log(`Docker compose stopped for neuron ${neuronName}`);

      await fs.rm(sanitizedPath, { recursive: true, force: true });
      console.log(`Neuron ${neuronName} uninstalled successfully`);
      this.neurons.delete(neuronName);
      return { success: true };
    } catch (error) {
      console.error(`Error uninstalling neuron ${neuronName}:`, error);
      return { success: false, error: `Failed to uninstall neuron ${neuronName}` };
    }
  }

}
