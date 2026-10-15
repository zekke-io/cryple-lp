import type { Metadata } from "next";
import Link from "next/link";
import Armadillo from "@/components/Armadillo";
import ArmadilloSprite from "@/components/ArmadilloSprite";
import EmailForm from "@/components/EmailForm";
import Icon, { type IconName } from "@/components/Icon";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { getDictionary } from "@/lib/dictionaries";
import { TEST_APP_URL, localizedPath, pageMetadata } from "@/lib/site";
import { structuredData } from "@/lib/structured-data";

const homeIcons: IconName[] = ["secrets", "passwords", "notes", "documents", "files"];
const storeIcons: IconName[] = ["secrets", "passwords", "notes", "documents"];
const milestoneDots = ["dot-live", "dot-next", "dot-later"];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    ...pageMetadata(lang, "", dict.meta.title, dict.meta.description),
    title: { absolute: dict.meta.title },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const jsonLd = JSON.stringify(structuredData(lang, dict.meta.description)).replace(/</g, "\\u003c");

  return (
    <div id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <ArmadilloSprite />
      <SiteHeader lang={lang} dict={dict} />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <a className="status-pill" href={TEST_APP_URL}>
              <span className="status-dot" />
              <span>{dict.hero.badge}</span>
            </a>
            <h1>
              {dict.hero.titleLine1}
              <br />
              <span className="accent">{dict.hero.titleLine2}</span>
            </h1>
            <p className="hero-subtitle">{dict.hero.subtitle}</p>
            <div className="hero-actions">
              <a className="btn btn-lg" href={TEST_APP_URL}>{dict.hero.tryApp}</a>
              <a className="btn btn-lg btn-outline" href="#waitlist">{dict.hero.joinWaitlist}</a>
            </div>
            <p className="hero-note">{dict.hero.note}</p>
          </div>

          <div className="hero-art">
            <div className="phones" role="img" aria-label={dict.hero.openLabel}>
              <div className="phone phone-lock" aria-hidden="true">
                <div className="phone-screen">
                  <div className="lock-center">
                    <Armadillo symbol="ball-cream" width={136} height={136} />
                    <div className="lock-word">zekke</div>
                    <div className="lock-tagline">{dict.hero.lock.tagline}</div>
                  </div>
                  <div className="lock-form">
                    <div className="lock-label">{dict.hero.lock.phraseLabel}</div>
                    <div className="mock-input">{dict.hero.lock.phrasePlaceholder}</div>
                    <div className="mock-button mock-button-ink">{dict.hero.lock.open}</div>
                  </div>
                </div>
              </div>

              <div className="phone phone-home hide-small" aria-hidden="true">
                <div className="phone-screen">
                  <div className="home-head">
                    <Armadillo symbol="open-app" width={50} height={50} />
                    <div>
                      <div className="home-greeting">{dict.hero.home.greeting}</div>
                      <div className="home-note">{dict.hero.home.note}</div>
                    </div>
                  </div>
                  <div className="home-list">
                    {dict.hero.home.items.map((item, index) => {
                      const soon = index === homeIcons.length - 1;
                      return (
                        <div key={item} className={soon ? "home-row home-row-soon" : "home-row"}>
                          <span className="icon-tile"><Icon name={homeIcons[index]} size={20} /></span>
                          <span className="home-row-label">{item}</span>
                          {soon && <span className="soon-badge">{dict.hero.home.soon}</span>}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mock-button mock-button-orange">{dict.hero.home.lock}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust">
          <ul className="trust-inner">
            {dict.trust.items.map((item) => (
              <li key={item.title} className="trust-item">
                <div className="trust-title">{item.title}</div>
                <div className="trust-desc">{item.desc}</div>
              </li>
            ))}
          </ul>
        </section>

        <section id="stores" className="section">
          <div className="section-head">
            <div className="eyebrow">{dict.stores.eyebrow}</div>
            <h2 className="section-title">{dict.stores.title}</h2>
            <p className="section-lede">{dict.stores.subtitle}</p>
          </div>
          <div className="card-grid">
            {dict.stores.items.map((item, index) => (
              <div key={item.title} className={index === 3 ? "card card-wide" : "card"}>
                <span className="card-icon"><Icon name={storeIcons[index]} size={28} /></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
            <div className="card card-wide card-soon">
              <div className="card-soon-head">
                <span className="card-icon"><Icon name="files" size={28} /></span>
                <span className="pill pill-orange">{dict.stores.soon.badge}</span>
              </div>
              <h3>{dict.stores.soon.title}</h3>
              <p>{dict.stores.soon.desc}</p>
            </div>
          </div>
        </section>

        <section id="how" className="band">
          <div className="band-inner">
            <div className="section-head">
              <div className="eyebrow">{dict.how.eyebrow}</div>
              <h2 className="section-title">{dict.how.title}</h2>
            </div>

            <ol className="steps">
              {dict.how.steps.map((step, index) => (
                <li key={step.title} className="step">
                  <span className="step-number">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>

            <div className="diagram">
              <div className="diagram-panel diagram-device">
                <h3 className="diagram-title">
                  <Armadillo symbol="ball" width={40} height={40} />
                  {dict.how.device.title}
                </h3>
                <ul className="diagram-rows">
                  {dict.how.device.items.map((item) => (
                    <li key={item} className="diagram-row">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="diagram-arrow" aria-hidden="true">
                <span className="diagram-arrow-label">
                  {dict.how.blobLabel[0]}{" "}
                  <br className="diagram-arrow-break" />
                  {dict.how.blobLabel[1]}
                </span>
                <svg className="diagram-arrow-horizontal" width="48" height="24" viewBox="0 0 48 24">
                  <path d="M2 12h40M32 4l10 8-10 8" stroke="#C2410C" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className="diagram-arrow-vertical" width="24" height="48" viewBox="0 0 24 48">
                  <path d="M12 2v40M4 32l8 10 8-10" stroke="#C2410C" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="diagram-panel diagram-server">
                <h3 className="diagram-title">{dict.how.server.title}</h3>
                <ul className="diagram-rows">
                  {dict.how.server.rows.map((row) => (
                    <li key={row.label} className="diagram-row">
                      <span className="diagram-row-label">{row.label}</span> {row.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="band band-night">
          <div className="band-inner band-inner-tall">
            <div className="section-head section-head-wide">
              <div className="eyebrow">{dict.security.eyebrow}</div>
              <h2 className="section-title">{dict.security.title}</h2>
              <p className="section-lede">{dict.security.subtitle}</p>
            </div>

            <div className="panel-grid">
              <div className="panel">
                <div className="panel-head">
                  <h3>{dict.security.standard.title}</h3>
                  <span className="pill pill-amber">{dict.security.standard.badge}</span>
                </div>
                <p>{dict.security.standard.desc}</p>
              </div>
              <div className="panel panel-paranoid">
                <div className="panel-head">
                  <h3>{dict.security.paranoid.title}</h3>
                  <span className="pill pill-violet">{dict.security.paranoid.badge}</span>
                </div>
                <p>{dict.security.paranoid.desc}</p>
              </div>
            </div>

            <div className="panel-grid">
              <div className="panel panel-amber">
                <h3>{dict.security.lose.title}</h3>
                <p>{dict.security.lose.desc}</p>
              </div>
              <div className="panel">
                <h3>{dict.security.postQuantum.title}</h3>
                <p>{dict.security.postQuantum.desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="specs" className="specs">
          <div className="specs-head">
            <div className="eyebrow">{dict.specs.eyebrow}</div>
            <h2 className="section-title section-title-small">{dict.specs.title}</h2>
            <p className="specs-lede">{dict.specs.subtitle}</p>
          </div>
          <dl className="specs-table">
            {dict.specs.rows.map((row) => (
              <div key={row.label} className="spec-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="pricing" className="band">
          <div className="band-inner pricing-inner">
            <div className="pricing-copy">
              <div className="eyebrow">{dict.pricing.eyebrow}</div>
              <h2 className="section-title">{dict.pricing.title}</h2>
              <ul className="bullets">
                {dict.pricing.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
            <div id="waitlist" className="waitlist">
              <span className="pill pill-orange pill-large">{dict.pricing.waitlist.badge}</span>
              <h3>{dict.pricing.waitlist.title}</h3>
              <p className="waitlist-desc">{dict.pricing.waitlist.desc}</p>
              <EmailForm
                labels={{
                  emailLabel: dict.pricing.waitlist.emailLabel,
                  placeholder: dict.pricing.waitlist.placeholder,
                  button: dict.pricing.waitlist.button,
                  sending: dict.form.sending,
                  successMessage: dict.form.successMessage,
                  alreadyOnList: dict.form.alreadyOnList,
                  error: dict.form.error,
                }}
              />
              <p className="waitlist-privacy">
                {dict.pricing.waitlist.privacyBefore}
                <Link href={localizedPath(lang, "/privacy")}>{dict.pricing.waitlist.privacyLink}</Link>
                {dict.pricing.waitlist.privacyAfter}
              </p>
            </div>
          </div>
        </section>

        <section id="roadmap" className="section">
          <div className="section-head">
            <div className="eyebrow">{dict.roadmap.eyebrow}</div>
            <h2 className="section-title">{dict.roadmap.title}</h2>
          </div>
          <ol className="timeline">
            {dict.roadmap.items.map((item, index) => {
              const live = index === 0;
              return (
                <li key={item.date} className="milestone">
                  <div className="milestone-track" aria-hidden="true">
                    <span className={`milestone-dot ${milestoneDots[index]}`} />
                    <span className="milestone-line" />
                  </div>
                  <div className={live ? "milestone-card milestone-card-live" : "milestone-card"}>
                    <div className="milestone-date">
                      <span>{item.date}</span>
                      {"badge" in item && <span className="pill pill-orange pill-small">{item.badge}</span>}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    {"link" in item && <a className="milestone-link" href={TEST_APP_URL}>{item.link}</a>}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="cta">
          <div className="cta-card">
            <div className="cta-copy">
              <h2 className="cta-title">{dict.cta.title}</h2>
              <p className="cta-desc">{dict.cta.desc}</p>
              <div className="hero-actions">
                <a className="btn btn-lg btn-ink" href={TEST_APP_URL}>{dict.cta.tryApp}</a>
                <a className="btn btn-lg btn-cream" href="#waitlist">{dict.cta.joinWaitlist}</a>
              </div>
            </div>
            <div className="cta-art">
              <Armadillo symbol="open-cream" className="cta-armadillo" width={380} label={dict.hero.openLabel} />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} dict={dict} />
    </div>
  );
}
