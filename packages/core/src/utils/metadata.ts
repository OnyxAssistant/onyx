import { Metadata } from "next";

export function constructMetadata({
    title = "Onyx",
    description = "Your intelligent second brain.",
    icons = "/favicon.ico",
    noIndex = false,
  }: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
  } = {}): Metadata {
    return {
      title,
      description,
      authors: [
        {
          name: "aituglo",
        },
      ],
      creator: "aituglo",
      openGraph: {
        type: "website",
        locale: "en_US",
        title,
        description,
        siteName: title,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@aituglo",
      },
      icons: {
        icon: "/favicon.ico",
      },
      appleWebApp: {
        title,
        capable: true,
        statusBarStyle: "black-translucent",
      },
      manifest: `$/manifest.json`,
      ...(noIndex && {
        robots: {
          index: false,
          follow: false,
        },
      }),
    };
  }
  