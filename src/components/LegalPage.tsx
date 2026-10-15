import Link from 'next/link';
import { localizedPath } from '@/lib/site';

export interface LegalSection {
  title: string;
  content: string;
  note?: string | null;
  items: string[];
  extra?: string | null;
  extra2?: string | null;
}

interface LegalPageProps {
  lang: string;
  backToHome: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalPage({ lang, backToHome, title, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="legal">
      <main className="legal-main">
        <Link href={localizedPath(lang)} className="legal-back">{backToHome}</Link>
        <h1>{title}</h1>
        <p className="legal-updated">{lastUpdated}</p>

        {sections.map((section) => (
          <section key={section.title} className="legal-section">
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            {section.note && <p>{section.note}</p>}
            {section.items.length > 0 && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.extra && <p>{section.extra}</p>}
            {section.extra2 && <p>{section.extra2}</p>}
          </section>
        ))}
      </main>
    </div>
  );
}
