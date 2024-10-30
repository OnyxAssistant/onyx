import "@/styles/globals.css";

import type { Viewport } from "next";
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { ThemeProvider } from "next-themes";
import { constructMetadata } from "@/utils/metadata";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components";
import { api } from "@/api";
import { ImportNeuron } from "@/components/neurons/import-neuron";
import { Neuron } from "@/types/neuron";

interface RootLayoutProps {
  children: React.ReactNode;
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
  const neurons = await api.get<Neuron[]>("/neurons");
  
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
