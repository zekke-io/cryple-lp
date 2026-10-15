import Link from 'next/link';
import type { Dictionary } from '@/lib/dictionaries';
import { TEST_APP_URL, languageTag, localeLabels, locales, localizedPath } from '@/lib/site';
import Armadillo from './Armadillo';

export default function SiteHeader({ lang, dict }: { lang: string; dict: Dictionary }) {
  const sections = [
    { href: '#stores', label: dict.nav.stores },
    { href: '#how', label: dict.nav.how },
    { href: '#security', label: dict.nav.security },
    { href: '#pricing', label: dict.nav.pricing },
    { href: '#roadmap', label: dict.nav.roadmap },
  ];

  return (
    <header className="site-header">
      <Link href={localizedPath(lang)} className="brand" aria-label={dict.nav.homeLabel}>
        <Armadillo symbol="ball" className="brand-mark" width={42} height={42} />
        <span className="brand-word">zekke</span>
      </Link>
      <nav className="site-nav" aria-label={dict.nav.sectionsLabel}>
        {sections.map((section) => (
          <a key={section.href} href={section.href}>{section.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="lang-switch" role="group" aria-label={dict.nav.languageLabel}>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={localizedPath(locale)}
              lang={languageTag(locale)}
              hrefLang={languageTag(locale)}
              aria-label={localeLabels[locale].name}
              aria-current={locale === lang ? 'page' : undefined}
            >
              {localeLabels[locale].short}
            </Link>
          ))}
        </div>
        <a className="btn" href={TEST_APP_URL}>{dict.nav.tryApp}</a>
      </div>
    </header>
  );
}
