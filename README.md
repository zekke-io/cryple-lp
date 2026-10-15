# Zekke landing page

The marketing site for the Zekke app. Next.js 16 App Router, no CSS framework — all styling lives in `src/app/globals.css` as plain CSS on top of the brand tokens declared in `:root`.

Product overview: [application-overview.md](../api-general/docs/application-overview.md)

**Every factual claim on the page has to agree with [`../api-general/docs`](../api-general/docs).** The security text was reviewed against it once; when the product changes, the page changes with it. Things that are easy to get wrong: the phrase is never stored on a device, each device has its own random keys, the PIN goes through an OPRF and Argon2id (not PBKDF2), and the server also sees device counts and connections.

## Design

The design is the `Zekke Landing` artifact, built on the `Zekke Brand` artifact. The page follows them section by section: header, hero with two phone mocks, trust strip, what it stores, how it works, security model, technical specifications, pricing with the waitlist, release status, closing call to action, footer.

### Brand rules the code relies on

- **Palette** (`:root` in `globals.css`): Zekke orange `#FF7A1A` for the brand, buttons and icon; hull `#C2410C` for orange text and links on cream; amber `#FFB066` for the armadillo's bands and highlights; violet `#6B4CF0` only for details (the Paranoid panel and the focus ring); cream `#FFF4E8` ground; peach `#FFE3C7` for cards and soft areas; ink `#2A1608` for text; night `#1C1428` for the security band. Do not swap the orange for blue or violet.
- **Type:** Nunito, loaded with `next/font` in `src/app/[lang]/layout.tsx` (weights 500–900). The wordmark is lowercase `zekke`, Nunito Black, −4.5% tracking; in running text the name is `Zekke`.
- **The mascot** is a rolled-up armadillo: closed means protected, open means at home. `ArmadilloSprite` defines the artwork once as SVG symbols and `Armadillo` places one with `<use>`. No padlock, shield, key or eye anywhere.
- **Icons** are inline stroke SVG in `Icon`, drawn in `currentColor` so a parent sets the colour.
- **App icon.** `src/app/icon.svg` is the favicon, `src/app/apple-icon.png` the touch icon (square, the platform applies its own mask) and `public/logo.png` the 512 px logo used by the structured data and the share image.

### The phone mocks are decorative

The hero shows two phones, one locked with a "Recovery phrase" field and one unlocked. They are plain `div`s, hidden from assistive technology, not an `<input>` and a `<button>`: a real field labelled "Recovery phrase" on a marketing page invites people to type their phrase into it. Keep it that way.

## Localisation

Three locales: `en` (default), `pt-br`, `es`. Copy lives in `src/dictionaries/<locale>.json` and is loaded by `src/lib/dictionaries.ts`, which types every dictionary as `typeof en.json`: a key missing from `es.json` or `pt-br.json` fails `tsc`.

`src/middleware.ts` rewrites `/` to `/en` internally, so the default locale never appears in the URL, and redirects `/en/*` back to `/*` with a permanent 308. Routes live under `src/app/[lang]/`. Internal links go through `localizedPath(lang, path)` from `src/lib/site.ts`, never a hand-built `/${lang}/…`, so English links never hit that redirect.

**Every user-facing string belongs in all three dictionaries.** The brand tagline is "Tudo seu. Só seu." in Portuguese and "Todo tuyo. Solo tuyo." in Spanish.

The language switch is three real links (`EN`, `ES`, `PT`) in the header and the three language names in the footer, each with `hreflang`, so crawlers can follow them. The current language carries `aria-current="page"`.

Spanish and Portuguese run roughly 20–30% longer than English. The header wraps (logo, then nav, then actions) rather than truncating; check `/es` first when a nav label or button gets longer.

## Structure

| Path | What it is |
| ---- | ---------- |
| `src/app/[lang]/page.tsx` | The home page: every section except the header and the footer |
| `src/components/SiteHeader.tsx`, `SiteFooter.tsx` | Header with section links, language links and "Try the app"; footer with product, legal and language columns |
| `src/components/EmailForm.tsx` | The waitlist form (client component), posting to `/api/waitlist` |
| `src/components/LegalPage.tsx` | The shared layout of the privacy, terms and security policy pages |
| `src/components/Armadillo.tsx`, `ArmadilloSprite.tsx`, `Icon.tsx` | Mascot and icons |
| `src/lib/site.ts` | Site URL, locales, `localizedPath`, `pageMetadata` |
| `src/lib/structured-data.ts` | The JSON-LD graph of the home page |

### Waitlist

`EmailForm` posts the address to `src/app/api/waitlist/route.ts`, which adds it to the Loops audience with `LOOPS_API_KEY`. A `409` (already on the list) is shown as success with its own message. Without the key the route answers success and stores nothing, which is meant for local development only: in production a missing key loses every signup silently. The form has no terms checkbox; the privacy notice under it says what is collected.

## SEO and metadata

`src/lib/site.ts` holds the site URL (`https://zekke.io`), the locale list and the helpers every page uses to build its metadata. `pageMetadata(lang, path, title, description)` returns the title, description, canonical URL, `hreflang` alternates, Open Graph and Twitter card for one page. Change the domain there and nowhere else.

- **Titles and descriptions** come from the `meta` block of each dictionary. `[lang]/layout.tsx` sets the default title and the `%s | Zekke` template; the home page opts out of the template with an absolute title, and the legal pages use their own `title` plus a `meta.*Description`. Keep descriptions under ~160 characters, or search engines truncate them.
- **Language alternates.** Each page lists all three locales plus `x-default` (English). The hreflang for `pt-br` is `pt-BR`, the BCP 47 form; `languageTag` does that mapping, and `<html lang>` uses it too.
- **`robots.ts` / `sitemap.ts`** in `src/app/` generate `/robots.txt` and `/sitemap.xml`. The sitemap is the `pages` list × the three locales, each entry carrying its alternates. A new public page has to be added to that list.
- **Open Graph image.** `[lang]/opengraph-image.tsx` renders a 1200×630 PNG per locale at build time from `hero.titleLine1`, `hero.titleLine2` and `meta.ogImageTagline`, in the brand colours, with `public/logo.png`. The middleware lets `/en/opengraph-image` through without its usual `/en` → `/` redirect, because Next.js puts that path in the English `og:image` tag.
- **Structured data.** The home page emits one JSON-LD `@graph` with `Organization`, `WebSite` and `WebApplication`. The address, the contact email and the free-tier `Offer` are facts about the company: update them in `structured-data.ts` when they change.
- **`public/llms.txt`** is a plain-Markdown summary of Zekke for AI crawlers and assistants ([llmstxt.org](https://llmstxt.org)): what it stores, the security model, the specs, pricing, release status and the key URLs. It repeats facts from the dictionaries by hand, so a change to the roadmap, the specs or the pricing on the page has to be made there too. It is English only.
- **Headings.** One `h1` (the hero), `h2` per section, `h3` for cards, steps and milestones. Footer column titles are paragraphs.

## Layout notes

- **Desktop wraps, mobile is its own layout.** Above 640px sections wrap their columns instead of switching on breakpoints: cards, steps, the device/server diagram and the pricing split all use `flex: 1 1 <basis>`. At 640px and below the layout follows the two mobile boards of the `Zekke Landing` artifact (`Landing page, mobile 1 of 2` and `2 of 2`, drawn at 390px): everything becomes one column with 20px side padding, buttons are full width, the specs table stacks label over value, and the header splits into two rows, with the section links as a horizontal strip (no scrollbar) under the logo, language links and "Try the app". A second query at 380px tightens the header buttons so the longest labels ("Probar la app", "Testar o app") still fit on one row at 360px; at 320px the actions wrap under the logo.
- **Mobile touch targets.** Nav links, footer links and the milestone link keep 44px-ish tap areas through vertical padding, not font size.
- **Phone mocks on mobile.** Only the locked phone shows; the unlocked one is hidden under 640px. The device/server diagram swaps its horizontal arrow for a vertical one (`.diagram-arrow-horizontal` / `.diagram-arrow-vertical`).
- **Anchors.** `html { scroll-behavior: smooth }` (off under `prefers-reduced-motion`) handles the section links; the header is not fixed, so no scroll offset is needed.
- **Decorative vs. informative.** The phones are one `role="img"` with a label; the closing mascot is a labelled image; the logo mark next to the wordmark is hidden from assistive technology because the link already has a label.

## Development

```bash
npm run dev     # localhost:3000
npm run build
npm run lint
```
