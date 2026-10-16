# Landing page — tasks

Open work on the landing page only. How the SEO and metadata pieces already in place work is in [README.md](README.md#seo-and-metadata).

## 1. Vercel domain configuration — blocker for the SEO work

**Owner:** Philippe, in the Vercel dashboard. No code change.

Today `https://zekke.io` answers **307** to `https://www.zekke.io/`, and the page is served from `www`. The code declares `https://zekke.io` as the site URL (`SITE_URL` in `src/lib/site.ts`): canonical URLs, hreflang, `sitemap.xml`, `robots.txt`, `og:url` and the JSON-LD all point at the apex. Until the domains agree, every canonical points at a URL that redirects away, and search engines ignore conflicting canonicals.

- [ ] Vercel → Project → Settings → Domains: make `zekke.io` the primary domain.
- [ ] Set `www.zekke.io` to redirect to `zekke.io` with **308** (permanent). A 307 tells crawlers the move is temporary and they keep indexing the old host.
- [ ] Confirm `LOOPS_API_KEY` is set for the **Production** environment. Without it `src/app/api/waitlist/route.ts` answers success and stores nothing, so signups are lost silently.
- [ ] Deploy, then check:
  - `curl -sI https://www.zekke.io` → `308`, `location: https://zekke.io/`
  - `curl -sI https://zekke.io` → `200`
  - `https://zekke.io/sitemap.xml` and `https://zekke.io/robots.txt` load
  - `https://zekke.io/social-card.png` returns the 1200×630 PNG, and the home page's `og:image` points at it
- [ ] Add `zekke.io` to Google Search Console and Bing Webmaster Tools and submit `https://zekke.io/sitemap.xml`. Bing's index also feeds ChatGPT search and Copilot.
- [ ] Validate the home page in Google's Rich Results Test (JSON-LD) and in LinkedIn Post Inspector (share preview).

If `www` should stay primary instead, the only code change is `SITE_URL` in `src/lib/site.ts`; the redirect still has to become a 308.

## 2. FAQ section

**Why:** question-and-answer blocks are what search snippets and AI answer engines quote most reliably. The answers already exist on the page, spread across the features; an FAQ puts each one next to the question people actually ask.

- [ ] Add an FAQ section to `src/app/[lang]/page.tsx`, copy in all three dictionaries. Candidate questions:
  - Can Zekke read my data?
  - What happens if I lose my recovery phrase?
  - Is Zekke post-quantum?
  - How is Zekke different from Bitwarden or 1Password?
  - Is there a free plan, and what does premium cost?
  - Where is my data stored?
- [ ] Emit the same questions as a `FAQPage` node in the home page's JSON-LD `@graph`. The markup must match the visible text word for word, or Google discards it.
- [ ] Add the FAQ questions and answers to `public/llms.txt` as a `## FAQ` section, and update its pricing section once prices are set.
- [ ] Add a link to the FAQ in the header or the footer.

**Open questions before writing the copy:** how the comparison with Bitwarden and 1Password should be phrased, and whether a premium price can be stated yet. The page only says the free tier is free and premium gets 50% off in the first month.

## 3. Security policy contradicts the product docs

`securityPolicy` in `src/dictionaries/{en,es,pt-br}.json` still carries claims that [`../api-general/docs`](../api-general/docs) contradict. Found while applying the new design; the home page was already corrected, this legal text was not.

- [ ] "Your seed phrase and your PIN never leave your browser": the PIN goes through an OPRF with the server (blinded, so the server never sees it) and the device PIN is rationed by it. Say that instead.
- [ ] "In Paranoid Mode the PIN is stretched client-side with PBKDF2-SHA256 (600,000 iterations) and stored server-side as an Argon2id hash": there is no stored PIN verifier at all ([ADR 00009](../api-general/docs/adr/00009_pin_verified_by_oprf.md)). The PIN derivation is Argon2id (64 MiB, t=3, p=1) on the client, mixed with the OPRF output.
- [ ] "Asymmetric key pairs are derived from your seed phrase": only the root keys are. Each device generates its own keys ([ADR 00006](../api-general/docs/adr/00006_seed_as_cold_root.md)).
- [ ] Read the privacy policy and the terms for the same claims, and check the three languages together.
