import type { Config } from "tailwindcss";
import uiConfig from "@onyx/ui/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [uiConfig],
};

export default config;
