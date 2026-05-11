import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { PageTransition } from "@/components/providers/page-transition";
import { ScrollToTop } from "@/components/providers/scroll-to-top";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tomrerservice.no"),
  title: "JHK Tømrerservice AS | Allsidig tømrerfirma i Bergen",
  description:
    "JHK Tømrerservice AS utfører rehabilitering, taktekking, ombygging, tilbygg og innredningssystemer i Bergen og omegn.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <SmoothScrollProvider>
          <I18nProvider>
            <ScrollToTop />
            <PageTransition>{children}</PageTransition>
          </I18nProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
