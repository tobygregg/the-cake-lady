# The Cake Lady Guernsey — website

Single-page static site: plain HTML + Tailwind CSS v3 (compiled and committed) + a small vanilla JS file. No frameworks, no runtime CDNs.

```
npm install
npm run build    # compile src/input.css → assets/css/styles.css
npm run watch    # rebuild on save while editing
```

## Folder layout

```
index.html              ← the whole site; sections separated by big comment banners
thanks.html             ← page shown after the quote form is sent
404.html                ← GitHub Pages "not found" page (uses <base href="/the-cake-lady/">)
assets/css/styles.css   ← compiled Tailwind (do not edit by hand, run npm run build)
assets/js/main.js       ← menu, scroll reveals, hero photo card, services explorer,
                          gallery filter + lightbox, form validation, mobile call bar
assets/fonts/           ← self-hosted Fraunces + Nunito Sans (woff2) with OFL licences
images/brand/mark.svg   ← the cupcake mark used in the header, footer and favicons
images/work/            ← cake photos, each as name.webp (full) + name-sm.webp (640px)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, components, hero animation keyframes
tailwind.config.js      ← brand colours (with notes on where each came from) + fonts
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published, see Source)
```

## Brand

| Name | Hex | Used for |
| --- | --- | --- |
| Cocoa | `#3A2414` | Text, buttons, the chocolate "What I make" section, footer, illustration outlines |
| Buttercream | `#FBF5EA` | Page background |
| Cream 200 | `#F4E9D6` | Contact section, photo frames |
| Rose | `#E98A9E` | Ribbon marquee, active tabs, piped underlines, bow, accents |
| Rose pale | `#FCEBE8` | "How ordering works" section, hero plate |
| Rose dark | `#B4445D` | Pink text on cream (passes contrast) |
| Gold | `#D6AB34` | Sugar-ball dots, stars, cake stand |
| Muted | `#6B5444` | Body copy |

Colours come from her photos: the chocolate boards and ganache, the cream cake boxes, the blush-pink cupcake boxes and the gold sugar hearts / cheese yellow.

- **Fonts:** Fraunces (display, soft serif) and Nunito Sans (body), both self-hosted from @fontsource.
- **Logo:** the Facebook page has no logo (its profile picture is a cake photo), so the site uses a simple typographic wordmark ("The Cake Lady / Guernsey") with a small cupcake mark drawn as SVG. **This is a placeholder: check with Bryony whether she has a logo she'd like used instead.**

## Editing

- **Text:** everything is in `index.html`. Search for the section banner (e.g. `SERVICES`, `HOW TO ORDER`, `ABOUT`).
- **Colours / fonts:** change them in `tailwind.config.js`, then run `npm run build`.
- **Adding a work photo:** export it as `images/work/my-cake.webp` (up to ~1600px wide) and `images/work/my-cake-sm.webp` (640px wide). Copy one of the `<a class="tile …">` blocks in the `RECENT WORK` section, update the `href`, `src`, `width`/`height`, `alt` and `data-caption`, and set `data-cat` to `cakes`, `cupcakes` or `traybakes` so the filter picks it up. On tablet/desktop the first and sixth tiles are the large ones.
- **Services explorer:** each service is a tab button (`role="tab"`) plus a matching panel (`id="panel-…"`). To change a panel's photos, edit its `.thumb` buttons (`data-src` is the photo path without `-sm.webp`/`.webp`, plus its full width/height). The "Ask about…" button's `data-service` must match an `<option>` in the form's "What would you like?" list.
- **Hero illustration:** inline SVG in the `HERO` section. Its animations (tiers dropping in, the piping bag, drips, candle flame) are the `.hc-*` classes at the bottom of `src/input.css`. All motion switches off for visitors with "reduce motion" turned on.
- **Before & after:** not used. This isn't a before/after trade.

## Before going live — checklist

- [ ] Swap `https://tobygregg.github.io/the-cake-lady/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD (`@id`, `url`, `image`, `logo`), `sitemap.xml`, `robots.txt` and the form's `_next` field. On a root domain, change the `<base href>` in `404.html` to `/`.
- [ ] **When the client goes ahead, switch the form from Toby's email to the client's** (`action="https://formsubmit.co/…"` in `index.html`), then send one test enquiry and click FormSubmit's activation email.
- [ ] Confirm the phone number (07781 152205) and email (thecakelady@suremail.gg).
- [ ] Get Bryony to sign off the service wording. Things inferred from her photos rather than stated outright:
  - cupcakes come in boxes of four or twelve, or boxed individually as favours
  - photo cakes and matching printed cupcakes are offered
  - traybakes: carrot cake and a caramel traybake with fudge pieces (check the names and whether there are other flavours)
  - "How ordering works" steps (design chat, boxed ready for the day). Nothing in the pack says whether cakes are collected or delivered, so the site doesn't mention either
  - the "Bryony Nicholls" name in the hero and About section
- [ ] Logo: confirm the placeholder wordmark, or supply a real logo.
- [ ] Ask for a few more written reviews. The pack had only one, so there's no testimonials section yet; add one once there are at least three.
- [ ] No prices, opening hours or lead times are shown, because the pack doesn't give any. Add them if Bryony wants.
- [ ] Left out on purpose: the Facebook rating/review count and follower numbers, the "Open now" status and the full postcode (GY2 4TE is only in the JSON-LD).

## Source

Built from the Facebook pack in `_fb-pack/` (BRIEF.md, data.json, images). The folder starts with an underscore so GitHub Pages doesn't publish it on the live site.
