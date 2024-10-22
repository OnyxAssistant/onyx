"use server";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { neuronManager } from '@onyx/core/utils/neuronManager'
import { Neuron as NeuronType } from '@onyx/core/utils/loadNeurons';

const execAsync = promisify(exec);

const NEURONS_DIR = path.join(process.cwd(), "..", "..", "packages", "neurons");

export interface Neuron {
  slug: string;
  name: string;
  description: string;
  url: string;
}

export async function loadAvailableNeurons(): Promise<Neuron[]> {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/OnyxAssistant/store/refs/heads/main/neuron-list.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch neuron list");
    }
    const neurons: Neuron[] = await response.json();
    return neurons;
  } catch (error) {
    console.error("Error loading available neurons:", error);
    return [];
  }
}

export async function getInstalledNeurons(): Promise<Neuron[]> {
  try {
    const neuronFolders = await fs.readdir(NEURONS_DIR);
    const installedNeurons: Neuron[] = [];

    for (const neuronFolder of neuronFolders) {
      if (!neuronFolder.startsWith(".") && !neuronFolder.endsWith(".json")) {
        const manifestPath = path.join(NEURONS_DIR, neuronFolder, "manifest.json");
        try {
          const manifestContent = await fs.readFile(manifestPath, 'utf-8');
          const manifest = JSON.parse(manifestContent);
          
          const neuron: Neuron = {
            slug: manifest.slug,
            name: manifest.name,
            description: manifest.description,
            url: `/dashboard/neuron/${manifest.slug}/`
          };
          
          installedNeurons.push(neuron);
        } catch (error) {
          console.error(`Error reading manifest for ${neuronFolder}:`, error);
        }
      }
    }

    return installedNeurons;
  } catch (error) {
    console.error("Error reading neurons directory:", error);
    return [];
  }
}

export async function installNeuron(githubUrl: string): Promise<void> {
  const repoName = githubUrl.split("/").pop()?.replace(".git", "") || "";
  const neuronPath = path.join(NEURONS_DIR, repoName);

  try {
    await execAsync(`git clone ${githubUrl} ${neuronPath}`);
    console.log(`Neuron ${repoName} installed successfully`);
  } catch (error) {
    console.error(`Error installing neuron ${repoName}:`, error);
    throw new Error(`Failed to install neuron ${repoName}`);
  }
  await neuronManager.reloadNeurons();
}

export async function uninstallNeuron(neuronName: string): Promise<void> {
  const neuronPath = path.join(NEURONS_DIR, neuronName);

  try {
    await fs.rm(neuronPath, { recursive: true, force: true });
    console.log(`Neuron ${neuronName} uninstalled successfully`);
  } catch (error) {
    console.error(`Error uninstalling neuron ${neuronName}:`, error);
    throw new Error(`Failed to uninstall neuron ${neuronName}`);
  }
}
