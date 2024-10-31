export interface Neuron {
  manifest: {
    name: string
    slug: string
    pages: {
      path: string
      name: string
    }[]
  }
} 