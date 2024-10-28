import "@onyx/ui/styles/globals.css";

import type { Viewport } from "next";
import { fontHeading, fontSans, fontUrban } from "@onyx/ui/assets/fonts";
import { ThemeProvider } from "next-themes";
import { constructMetadata } from "@onyx/utils/metadata";
import { cn } from "@onyx/ui/lib/utils";
import { Toaster } from "@onyx/ui";
import { api } from "@onyx/api";
import { ImportNeuron } from "@/components/neurons/import-neuron";

interface RootLayoutProps {
  children: React.ReactNode;
}

interface Neuron {
  name: string;
}

export const metadata = constructMetadata();

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
  themeColor: "var(--bg)",
  initialScale: 1,
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const neurons = await api.get<Neuron[]>("/get-neurons");
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <ImportNeuron neurons={neurons} />
        </ThemeProvider>
      </body>
    </html>
  );
}
