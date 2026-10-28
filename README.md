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
assets/js/main.js       ← menu, reveals, services menu + cake stand,
                          polaroid stack + lightbox, form validation, mobile call bar
assets/fonts/           ← self-hosted Shrikhand, Schibsted Grotesk, Gochi Hand (woff2) + OFL licences
images/brand/mark.svg   ← the cupcake mark used in the header, footer and favicons
images/work/            ← cake photos, each as name.webp (full) + name-sm.webp (640px)
images/                 ← favicons, og-image.jpg (1200×630 share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, components, hero animation keyframes
tailwind.config.js      ← brand colours (with notes on where each came from) + fonts
sitemap.xml, robots.txt
_fb-pack/               ← the Facebook research pack (not published, see Source)
```

## Brand

The look is a calm retro cake shop: a pale pink hero with the name set big in Shrikhand, a light scatter of sprinkles and a piped icing edge, three of her cakes laid out underneath, and outlined "sticker" buttons and cards with a small hard shadow.

| Name | Hex | Used for |
| --- | --- | --- |
| Cocoa | `#3A2414` | Text, outlines, hard shadows, the Recent cakes section, footer |
| Cream | `#FFF5E6` | Page background, sign lettering, icing drips |
| Strawberry | `#EE7A98` | Heading shadow, ticket header, footer sign |
| Strawberry light / pale | `#FFD3DE` / `#FFE9EE` | Hero and contact backgrounds, beads, tape |
| Strawberry dark | `#C1446A` | Pink text on cream (passes contrast) |
| Buttercup | `#FFCB45` | Ordering section, badge, call button, tape |
| Pistachio | `#9FD08A` | Small accents only (beads, step 3, insurance chip) |
| Muted | `#6E5444` | Body copy |

Colours come from her photos: the chocolate boards and ganache, the cream boxes, her blush-pink cupcake boxes, the cheese/DeWalt yellow and the piped golf-green grass.

- **Fonts:** Shrikhand (display, retro bakery-sign lettering), Schibsted Grotesk (body), Gochi Hand (handwritten notes and polaroid captions only). All self-hosted from @fontsource.
- **Logo:** the Facebook page has no logo (its profile picture is a cake photo), so the site uses "The Cake Lady" set in Shrikhand with a small cupcake mark drawn as SVG. **This is a placeholder: check with Bryony whether she has a logo she'd like used instead.**

## Editing

- **Text:** everything is in `index.html`. Search for the section banner (`HERO`, `WHAT I MAKE`, `RECENT CAKES`, `HOW ORDERING WORKS`, `ABOUT`, `GET A QUOTE`).
- **Colours / fonts:** change them in `tailwind.config.js`, then run `npm run build`.
- **Hero photos:** the three `<figure>` blocks under the heading. Swap the `<img>` to change a photo; the shape comes from `cut-arch`, `cut-round` or `cut-tile`.
- **What I make:** four coloured `<article class="svc">` cards in a mixed grid (Celebration cakes is the tall feature card on desktop). Swap the `<img>` to change a photo. The "Ask about…" link's `data-service` must match an `<option>` in the form.
- **Recent cakes (polaroid stack):** each `<figure class="card">` is one photo. Set `data-full` to the large image, the `<img>` to the `-sm` version, and the caption in `<figcaption>`. Update the "/ 10" count if you add or remove one.
- **Adding a work photo:** export `images/work/my-cake.webp` (up to ~1600px) and `images/work/my-cake-sm.webp` (640px), then add a card as above.
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
