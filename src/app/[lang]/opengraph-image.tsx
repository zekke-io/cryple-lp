import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { getDictionary } from '@/lib/dictionaries';
import { locales } from '@/lib/site';

export const alt = 'Zekke — zero-knowledge encrypted vault';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSource = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#FFF4E8',
          color: '#2A1608',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <img src={logoSource} width={104} height={104} alt="" />
          <span style={{ fontSize: 76, fontWeight: 900, letterSpacing: -3 }}>zekke</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 900, lineHeight: 1, letterSpacing: -4 }}>
            <span>{dict.hero.titleLine1}</span>
            <span style={{ color: '#C2410C' }}>{dict.hero.titleLine2}</span>
          </div>
          <span style={{ fontSize: 32, color: '#4A2E1A', lineHeight: 1.3, maxWidth: 900 }}>{dict.meta.ogImageTagline}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 28, color: '#9A3412', fontWeight: 700 }}>zekke.io</span>
          <span style={{ width: 220, height: 14, borderRadius: 7, background: '#FF7A1A' }} />
        </div>
      </div>
    ),
    size,
  );
}
