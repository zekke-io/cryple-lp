import Link from 'next/link';
import type { Dictionary } from '@/lib/dictionaries';
import { CONTACT_EMAIL, GITHUB_URL, TEST_APP_URL, languageTag, localeLabels, locales, localizedPath } from '@/lib/site';
import Armadillo from './Armadillo';
import GitHubMark from './GitHubMark';

export default function SiteFooter({ lang, dict }: { lang: string; dict: Dictionary }) {
  const productLinks = [
    { href: TEST_APP_URL, label: dict.footer.tryApp },
    { href: '#how', label: dict.footer.how },
    { href: '#security', label: dict.footer.security },
    { href: '#roadmap', label: dict.footer.roadmap },
  ];
  const legalLinks = [
    { path: '/security-policy', label: dict.footer.securityPolicy },
    { path: '/privacy', label: dict.footer.privacyPolicy },
    { path: '/terms', label: dict.footer.termsOfService },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-columns">
          <div className="footer-brand-column">
            <div className="brand footer-brand">
              <Armadillo symbol="ball" className="brand-mark" width={44} height={44} />
              <span className="brand-word">zekke</span>
            </div>
            <p className="footer-description">{dict.footer.description}</p>
            <p className="footer-description">{dict.footer.openSource}</p>
            <a className="footer-github" href={GITHUB_URL} rel="noopener">
              <GitHubMark />
              {dict.footer.github}
            </a>
          </div>
          <div className="footer-column">
            <p className="footer-column-title">{dict.footer.product}</p>
            {productLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="footer-column">
            <p className="footer-column-title">{dict.footer.legal}</p>
            {legalLinks.map((link) => (
              <Link key={link.path} href={localizedPath(lang, link.path)}>{link.label}</Link>
            ))}
          </div>
          <div className="footer-column">
            <p className="footer-column-title">{dict.footer.language}</p>
            {locales.map((locale) => (
              <Link
                key={locale}
                href={localizedPath(locale)}
                lang={languageTag(locale)}
                hrefLang={languageTag(locale)}
                aria-current={locale === lang ? 'page' : undefined}
              >
                {localeLabels[locale].name}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div>{dict.footer.copyright}</div>
          <div>{dict.footer.contact} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
        </div>
      </div>
    </footer>
  );
}
