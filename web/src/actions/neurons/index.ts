'use server'
import { api } from "@/api";

export const installNeuronFromUrl = async (url: string): Promise<{ success: boolean, error?: string }> => {
  return await api.post<{ success: boolean, error?: string }>("/neurons/install", { url });
};

export const installNeuronFromStore = async (slug: string): Promise<{ success: boolean, error?: string }> => {
  return await api.post<{ success: boolean, error?: string }>("/neurons/install", { slug });
};

export const uninstallNeuron = async (slug: string): Promise<{ success: boolean, error?: string }> => {
  return await api.delete<{ success: boolean, error?: string }>(`/neurons/${slug}`);
};
