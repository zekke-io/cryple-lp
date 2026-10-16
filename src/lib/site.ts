import type { Metadata } from "next";

export const SITE_URL = "https://zekke.io";
export const SITE_NAME = "Zekke";
export const CONTACT_EMAIL = "contact@zekke.io";
export const TEST_APP_URL = "https://test-app.zekke.io";

export const locales = ["en", "es", "pt-br"] as const;
export const defaultLocale = "en";

const languageTags: Record<string, string> = {
  en: "en",
  es: "es",
  "pt-br": "pt-BR",
};

const openGraphLocales: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  "pt-br": "pt_BR",
};

export const localeLabels: Record<string, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  es: { short: "ES", name: "Español" },
  "pt-br": { short: "PT", name: "Português (Brasil)" },
};

export const languageTag = (lang: string) =>
  languageTags[lang] ?? languageTags[defaultLocale];

export const openGraphLocale = (lang: string) =>
  openGraphLocales[lang] ?? openGraphLocales[defaultLocale];

export const localizedPath = (lang: string, path = "") => {
  const prefix = lang === defaultLocale ? "" : `/${lang}`;
  return `${prefix}${path}` || "/";
};

export const localizedUrl = (lang: string, path = "") => {
  const localized = localizedPath(lang, path);
  return localized === "/" ? SITE_URL : `${SITE_URL}${localized}`;
};

export const languageAlternates = (path = "") => ({
  ...Object.fromEntries(
    locales.map((locale) => [languageTag(locale), localizedUrl(locale, path)]),
  ),
  "x-default": localizedUrl(defaultLocale, path),
});

export const socialCard = {
  url: "/social-card.png",
  width: 1200,
  height: 630,
  type: "image/png",
};

export const pageMetadata = (
  lang: string,
  path: string,
  title: string,
  description: string,
  imageAlt: string,
): Metadata => ({
  title,
  description,
  alternates: {
    canonical: localizedPath(lang, path),
    languages: languageAlternates(path),
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title,
    description,
    url: localizedPath(lang, path),
    locale: openGraphLocale(lang),
    alternateLocale: locales
      .filter((locale) => locale !== lang)
      .map(openGraphLocale),
    images: [{ ...socialCard, alt: imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: socialCard.url, alt: imageAlt }],
  },
});
