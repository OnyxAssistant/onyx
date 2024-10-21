import "@/styles/globals.css";

import type { Viewport } from "next";
import { fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const viewport: Viewport = {
  maximumScale: 1,
  minimumScale: 1,
  width: "device-width",
  themeColor: "var(--bg)",
  initialScale: 1,
};

export default async function RootLayout({ children }: RootLayoutProps) {
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
        </ThemeProvider>
      </body>
    </html>
  );
}
