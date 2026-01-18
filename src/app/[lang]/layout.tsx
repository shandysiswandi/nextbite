import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import "../globals.css";

import { APP } from "@/libraries/constants/app";
import { getDictionary } from "@/libraries/i18n";
import { I18nProvider } from "@/libraries/i18n/provider";
import { i18n, type Locale } from "@/libraries/i18n/types";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/ui/base/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: APP.title,
  description: APP.description,
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <html data-scroll-behavior="smooth" lang={lang} suppressHydrationWarning>
      <head>
        <link href="https://challenges.cloudflare.com" rel="preconnect" />
      </head>

      <body className={`${poppins.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <I18nProvider dictionary={dictionary}>
            <QueryProvider>
              <Toaster position="top-center" richColors />
              {children}
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
