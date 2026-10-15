import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { getDictionary } from "@/lib/dictionaries";
import { SITE_NAME, SITE_URL, languageTag, locales } from "@/lib/site";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const viewport: Viewport = {
  themeColor: "#FF7A1A",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: dict.meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={languageTag(lang)}>
      <body className={nunito.variable}>{children}</body>
    </html>
  );
}
