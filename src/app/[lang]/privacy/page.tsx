import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { getDictionary } from '@/lib/dictionaries';
import { pageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, '/privacy', dict.privacy.title, dict.meta.privacyDescription, dict.meta.socialCardAlt);
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.privacy;

  return (
    <LegalPage
      lang={lang}
      backToHome={t.backToHome}
      title={t.title}
      lastUpdated={t.lastUpdated}
      sections={t.sections}
    />
  );
}
