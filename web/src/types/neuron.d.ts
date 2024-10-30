export type Neuron = {
  manifest: {
    name: string;
    slug: string;
    version: string;
    url: string;
    description: string;
    pages: {
      path: string;
      name: string;
    }[];
    nav: {
      title: string;
      url: string;
      icon: string;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  };
};

export type NeuronStore = {
  slug: string;
  name: string;
  description: string;
  url: string;
};
