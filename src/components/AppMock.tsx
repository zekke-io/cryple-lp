import type { Dictionary } from '@/lib/dictionaries';
import AppGlyph, { type AppGlyphName } from './AppGlyph';
import Armadillo from './Armadillo';

type Tone = 'orange' | 'amber' | 'apricot' | 'ink' | 'peach' | 'white';

const actionStyles: { glyph: AppGlyphName; tone: Tone; soon: boolean }[] = [
  { glyph: 'note', tone: 'orange', soon: false },
  { glyph: 'shield', tone: 'ink', soon: false },
  { glyph: 'camera', tone: 'white', soon: true },
];

const appStyles: { glyph: AppGlyphName; tone: Tone; soon: boolean }[] = [
  { glyph: 'note', tone: 'amber', soon: false },
  { glyph: 'key', tone: 'orange', soon: false },
  { glyph: 'shield', tone: 'ink', soon: false },
  { glyph: 'doc', tone: 'apricot', soon: false },
  { glyph: 'sheet', tone: 'amber', soon: false },
  { glyph: 'folder', tone: 'orange', soon: false },
  { glyph: 'calendar', tone: 'peach', soon: true },
  { glyph: 'todo', tone: 'peach', soon: true },
  { glyph: 'diary', tone: 'peach', soon: true },
];

export function WelcomeScreen({ dict }: { dict: Dictionary }) {
  const t = dict.hero.welcome;
  return (
    <div className="phone phone-welcome" role="img" aria-label={dict.hero.welcomeLabel}>
      <div className="phone-screen">
        <div className="app-screen app-welcome" aria-hidden="true">
          <div className="app-welcome-center">
            <Armadillo symbol="ball-cream" width={208} height={208} />
            <div className="app-welcome-word">zekke</div>
            <div className="app-welcome-tagline">{t.tagline}</div>
          </div>
          <div className="app-welcome-actions">
            <div className="app-pill app-pill-ink">{t.createAccount}</div>
            <div className="app-pill app-pill-cream">{t.signIn}</div>
            <div className="app-welcome-note">{t.note}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeScreen({ dict }: { dict: Dictionary }) {
  const t = dict.hero.home;
  return (
    <div className="phone phone-home hide-small" role="img" aria-label={dict.hero.homeLabel}>
      <div className="phone-screen">
        <div className="app-screen app-home" aria-hidden="true">
          <div className="app-home-body">
            <div className="app-home-head">
              <div className="app-home-greeting">
                <Armadillo symbol="open-app" width={48} height={48} />
                <div className="app-home-greeting-text">
                  <span className="app-home-title">{t.greeting}</span>
                  <span className="app-home-subtitle">{t.greetingNote}</span>
                </div>
              </div>
              <span className="app-lock"><AppGlyph name="lock" size={24} /></span>
            </div>

            <div className="app-storage">
              <div className="app-storage-row">
                <span className="app-storage-label">{t.storage}</span>
                <span className="app-storage-plan">{t.plan}</span>
              </div>
              <div className="app-storage-amount">
                <span className="app-storage-used">{t.used}</span>
                <span className="app-storage-of">{t.usedOf}</span>
              </div>
              <div className="app-storage-bar"><div className="app-storage-fill" /></div>
              <div className="app-storage-row">
                <span className="app-storage-free">{t.free}</span>
                <span className="app-storage-link">{t.seePlans}</span>
              </div>
            </div>

            <div className="app-section">
              <div className="app-section-title">{t.whatNow}</div>
              <div className="app-actions">
                {t.actions.map((label, index) => {
                  const style = actionStyles[index];
                  return (
                    <div key={label} className={style.soon ? 'app-action app-action-soon' : 'app-action'}>
                      <span className={`app-action-icon app-tone-${style.tone}`}><AppGlyph name={style.glyph} size={24} /></span>
                      <span className="app-action-text">
                        <span className="app-action-label">{label}</span>
                        {style.soon && <span className="app-action-soon-label">{t.soon}</span>}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="app-section app-section-apps">
              <div className="app-section-title">{t.yourApps}</div>
              <div className="app-apps">
                {t.apps.map((label, index) => {
                  const style = appStyles[index];
                  return (
                    <div key={label} className="app-app">
                      <span className={`app-app-icon app-tone-${style.tone}`}>
                        <AppGlyph name={style.glyph} size={34} />
                        {style.soon && <span className="app-app-soon">{t.soon}</span>}
                      </span>
                      <span className="app-app-label">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="app-tabs">
            <div className="app-tab app-tab-active"><AppGlyph name="home" size={26} />{t.tabs[0]}</div>
            <div className="app-tab"><AppGlyph name="search" size={26} />{t.tabs[1]}</div>
            <span className="app-tab-add"><AppGlyph name="plus" size={28} /></span>
            <div className="app-tab"><AppGlyph name="activity" size={26} />{t.tabs[2]}</div>
            <div className="app-tab"><AppGlyph name="settings" size={26} />{t.tabs[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
