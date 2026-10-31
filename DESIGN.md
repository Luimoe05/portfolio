---
name: Luis-Angel Moreno Portfolio
description: A playful midnight portfolio with electric blue and cantaloupe orange accents.
colors:
  bg: "oklch(17% .018 264)"
  surface: "oklch(23% .026 264)"
  hover: "oklch(29% .035 264)"
  line: "oklch(35% .028 264)"
  text: "oklch(94% .009 85)"
  secondary: "oklch(78% .018 264)"
  muted: "oklch(69% .024 264)"
  silver: "oklch(85% .008 85)"
  blue: "oklch(56% .23 264)"
  blue-light: "oklch(77% .115 260)"
  orange: "oklch(81% .12 56)"
  artwork: "oklch(25% .008 85)"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px,6vw,80px)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px,6vw,80px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "-.02em"
  text-link:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 550
    lineHeight: 1.6
rounded:
  focus: "3px"
  copy: "4px"
  overlay: "7px"
  control: "8px"
  company: "10px"
  image: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  section: "100px"
components:
  navigation:
    textColor: "{colors.secondary}"
    padding: "8px 0"
  navigation-active:
    textColor: "{colors.text}"
  text-link:
    textColor: "{colors.text}"
    typography: "{typography.text-link}"
    padding: "6px 0"
  project-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  project-tab-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
  project-tab-active:
    textColor: "{colors.text}"
  image-tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.image}"
  copy-button:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    rounded: "{rounded.copy}"
    padding: "7px"
  copy-button-hover:
    backgroundColor: "{colors.hover}"
  primary-link:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "13px 20px"
  project-facts:
    padding: "25px 0 0"
---
# Design System: Luis-Angel Moreno Portfolio

## Overview

**Creative North Star: "The Project Explorer"**

The Project Explorer places a personal introduction above a selectable index of real engineering work. Midnight black, warm-white lettering, blue-tinted secondary details, electric blue, and cantaloupe orange make the surrounding interface comfortable to inspect. Original project imagery supplies the broader color.

The approved layout revision favors a single-column reading sequence and restrained professional motion. Personality comes from the work, Manrope’s confident forms, and deliberate interaction, with neutral layers keeping long-form case studies readable.

**Key Characteristics:**
- Midnight layers, electric-blue selections, and cantaloupe-orange contact accents.
- Personal introduction above a generous project preview.
- Manrope throughout, with weight and scale providing hierarchy.
- Subtle transform and opacity feedback, with reduced-motion support.

## Colors

The user selected midnight black, electric blue, and cantaloupe orange. This palette supersedes the earlier neutral-only direction. Color is concentrated in the hero navigation and functional accents; the reading canvas remains dark and calm.

- **Midnight black** (`bg`, `oklch(17% .018 264)`): page canvas. Raised surfaces, hover tones, and dividers use progressively lighter blue-tinted neutrals.
- **Electric blue** (`blue`, `oklch(56% .23 264)`): Projects key, selected project tabs, and primary recovery action. White-blue text provides contrast. The Projects key's material shading ranges from lightness 60% to 51%; its large monogram has at least 3.9:1 contrast, and its small lower label has 5.74:1 at the darker end.
- **Light blue** (`blue-light`, `oklch(77% .115 260)`): inline links, active navigation, supporting key icons, and list markers. It gives small text sufficient contrast on the midnight canvas.
- **Cantaloupe orange** (`orange`, `oklch(81% .12 56)`): Contact key, contact actions, monogram dots, heading punctuation, focus outlines, and selected text. Orange key text uses a deep warm ink rather than white.
- **Reading colors**: warm-white primary text; cool secondary and muted text. Source screenshots, artwork, and Salesforce's logo keep their original colors.

The color family of each physical key continues through its shaded sides and highlights. There are no decorative neon glows or colored background washes.

## Typography

**Display Font:** Manrope, sans-serif. **Body Font:** Manrope, sans-serif. The locally served variable font supports weights 200–800; no separate display or mono face is implemented.

**Character:** Confident and compact headings sit above quiet, generously led descriptive text. Tracking tightens headings without turning metadata into ornamental labels.

### Hierarchy

- **Display:** identity heading, 650, `clamp(48px,6vw,80px)`, 1.08 line-height, `-.04em` tracking. At 760px and below it becomes `clamp(44px,9vw,62px)`.
- **Headline:** case title, 600, `clamp(48px,6vw,80px)`, 1.2 line-height. At 760px and below: `clamp(34px,10.5vw,54px)` with `overflow-wrap:anywhere`.
- **Title:** project preview heading, 600, 36px/1.2; responsive overrides are 34px, 32px, and 31px. Section titles are 26px, becoming 21px on mobile; case narrative headings are 28px.
- **Body:** base 400, 15px/1.7. Intro role is 22px/1.6; description is 15px/1.85 and 64ch, becoming 14px/1.85 and 44ch at 760px; case narrative is 15px/1.95 and 70ch. Mobile paragraphs and experience bullets use a shared 14px reading floor; metadata remains 12px.
- **Label:** project names are 600, 15px/1.5, `-.02em`; detail labels generally use 12px. Text links use 550, 13px/1.6.

**The Readable Detail Rule.** Functional text has a 12px minimum in the implemented responsive styles; small metadata never replaces the primary reading hierarchy.

## Layout

The page shell has a 1456px maximum width and `0 clamp(24px,4.4vw,72px)` padding; the homepage and project pages narrow that shell to 1184px. The site uses separate Home, Projects, Experience, About, and Contact pages. Home contains only the animated introduction and interactive monogram key. The shell has a minimum height of 100svh, with flexible main content placing the footer at the bottom of short pages. Projects uses the horizontal project selector and a compact preview; Experience and About show their source-backed content directly below a primary heading. Contact centers its email and social actions. Navigation uses real page URLs with one aria-current="page" item, including Projects on individual case studies. Section pages use 24px top and 32px bottom content padding; Projects uses 16px and 24px. Full case studies retain their natural reading length.

The Projects page preview reserves a 2.4:1 aspect ratio, capped at the smaller of 300px or 32svh. On mobile it uses 1.6:1, capped at the smaller of 260px or 32svh. The case-study visual independently uses 1.8:1 with 660px maximum height. The shared image-well base is 1.22:1, overridden by these surface-specific rules.

- At 1150px and narrower, shell padding is 40px; project facts become two columns.
- At 900px and narrower, shell padding is 32px, home top padding is 32px, and tab gap is 24px. The homepage preview ratio becomes 1.65:1.
- At 760px and narrower, shell padding is 24px, home top padding is 34px, and introduction bottom padding is 52px. Heading and role line breaks return; section spacing becomes 70px. Tabs share the row with 4px gaps and at least 44px height. The homepage preview ratio becomes 1.3:1 without a maximum height. Contact and case introduction stack; case visuals use 1.25:1. Case narrative is centered at `min(800px,70ch)` so the reading column sits evenly beneath the image.
- At 380px and narrower, shell padding is 20px; project metadata and education rows stack.

Case facts use four columns (`1fr 1fr 1.5fr 1fr`) on desktop. Print switches to a light neutral palette, removes navigation and contact controls, and exposes every project panel.

## Elevation & Depth

The dark canvas uses the original flat graphite background. Depth comes from tonal layering and one-pixel dividers. Interface surfaces have no box shadows or decorative glows. The hero key uses a directional cast shadow and a small inset highlight to describe its physical depth. Images sit in rounded, clipped wells; hover feedback changes tone, reveals an overlay, or moves an icon a few pixels.

**The Tonal Layer Rule.** Use surface tone, spacing, and thin dividers to establish depth; the implemented interface has no box shadows.

## Shapes

Project visuals and workflow panels use the 14px radius. Project tabs and the recovery link use 8px; company marks use 10px; copy controls use 4px; preview overlays use 7px. Focus outlines have 3px rounding, 2px orange stroke, and 6px offset. Project selection uses a silver filled tab with dark text. Icons are inline SVG strokes rather than font glyphs.

## Components

### Navigation

Explicit Home, Projects, Experience, About, and Contact page links sit beside the wordmark and résumé link. Desktop header height is 116px with 32px navigation gaps. At 760px and below, the wordmark and résumé form the first row; the five navigation links share a second row. The header has a 118px minimum height, and navigation links use 13px text and 44px touch targets.

### Text links

A text-first action with an inline SVG and 12px gap, 6px vertical padding, and no filled container. Hover shifts the arrow by `3px,-2px` over 260ms; keyboard focus uses the common orange outline. The explicit case-study link remains available on touch layouts.

### Project tab

Projects uses quiet text tabs above a single thin divider. The active project has warm-white text and a light-blue underline; inactive labels are muted. Tabs retain 44px minimum touch targets, visible focus outlines, keyboard arrows, Home/End, and tab/tabpanel semantics. They share the available width on mobile.

The selected project's role, context, and technology stack sit in a 180px metadata column to the left of its title, summary, expanded bullets, and source/live/case-study links. The desktop gap scales from 32px to 80px. Below 760px, metadata stacks above the reading column, with role/context side by side and technologies on their own row. No project imagery is displayed.

### Image tile

A clipped 14px image well uses original project imagery and a reserved ratio. Home images cover the wide well, positioned at `center 42%`; case-study images use contain and explicit centering within a full-width well. Images do not scale on hover. The preview links to the case study, and one visible “View project” link follows it. Technology stacks remain on the project detail pages. Missing imagery receives a clear textual fallback.

### Copy button

A transparent inline control with 7px padding, 4px radius, 14px SVG, and 12px label. Hover uses the hover surface. Clipboard success reads “Copied”; failure reads “Select to copy”; a live status announces the result. The label resets after 3500ms.

### Primary recovery link

The not-found page uses a electric-blue link with pale text, 8px radius, `13px 20px` padding, and 13px/650 type. Hover translates it upward 2px over 160ms.

### Project facts

A semantic definition list uses a top divider, 25px top padding, four desktop columns, and 30px gap. Labels are muted 12px, values secondary 12px/1.9; link values use the text-link treatment. Below 1150px it uses two columns; below 760px gaps become `22px 18px` and top-label spacing becomes 7px.

### Motion

State transitions use `cubic-bezier(.22,1,.36,1)` with 160ms for fast feedback and 260ms for general state changes. Project swaps animate opacity and a 7px vertical offset over 260ms. Initial entry takes inspiration from Hasque’s blur-to-focus fade, inspected in the browser. Hero copy resolves from a bounded 10px blur over 1100ms, staggered at 40/130/210/280ms. The key arrives with a smaller blur, an 8-degree rotation, and a 30px settle over 1400ms after a 120ms delay. The projects entrance lasts 1100ms after a 300ms delay. Case-study introductions use the same effect over 1400ms; facts and imagery retain their lighter stagger. The reveal uses CSS, leaves content in normal flow, never locks scrolling or input, and needs no loading-state JavaScript. With reduced motion, content is immediately visible. Images have no scale animation. One-time section reveals use 620ms, 14px, and `cubic-bezier(.16,1,.3,1)`. Supported cross-document image transitions use 380ms; root outgoing/incoming transitions use 160ms/340ms. Reduced motion removes animations and transitions, disables smooth scrolling, and skips scripted reveals and swaps.

## Do's and Don'ts

### Do:
- **Do** use the canonical OKLCH colors and Manrope font from src/styles.css.
- **Do** preserve visible orange focus outlines and selected states as well as text contrast.
- **Do** reserve image space, provide meaningful alternative text, and preserve explicit case-study links.
- **Do** restructure the explorer and case-study layout at the implemented breakpoints.
- **Do** honor reduced motion and preserve native scrolling and browser navigation.

### Don't:
- **Don't** add colors outside the selected midnight, electric blue, and cantaloupe palette to interface decoration, or introduce decorative glows.
- **Don't** invent project screenshots or turn fallback content into decorative product UI.
- **Don't** truncate essential project titles or make essential content available only on hover.
- **Don't** add bounce, scroll hijacking, continuous decorative motion, or forced viewing delays.

## Implementation

Page templates, content, browser interactions, build scripts, and tests use strict TypeScript. Tailwind CSS 4 compiles shared layout utilities and component `@apply` rules from `src/styles.css`; custom typography and motion retain the established design. The build emits static HTML, CSS, and bundled JavaScript without a client framework.

### Polish details

Mobile reading copy uses `--text-reading-mobile:14px`; interactive links and copy controls use `--touch-target:44px` for minimum height. Education details stack on mobile to preserve breathing room. Project headings and metadata wrap naturally. Dates use tabular numerals, case facts allow long technology names to wrap, and unavailable image states suppress artwork captions. Preview hover overlays only react on fine pointers with hover support.

### Homepage clarity refinement

The homepage now leads with the owner's name, FIU role, and a brief description of developer tools and web applications. Projects, Experience, and Education & community name their content directly. Decorative section taglines, the location footnote, generic about lead, duplicate experience introduction, project category labels, and homepage technology lists were removed to reduce competing information. Miami remains in the footer, and full technology stacks remain on the case studies. Experience bullets use 15px secondary text on desktop and 14px on mobile. Salesforce logos and the user-confirmed January–December 2026 leadership dates remain. Contact copy is brief, with email, copy, and social actions preserved.

### Personal hero and interactive key

A friendly “Hey, I’m” leads into the two-line name. A sculpted electric-blue keyboard key carries the lm. monogram and an enter legend. It is a native anchor named “Explore my projects”, linking to /projects/; it works with keyboard, touch, and JavaScript disabled. Desktop pointer position tilts the key by at most eight degrees per axis, scheduled once per animation frame; leaving, blurring, or changing motion preferences resets it. Pointer tracking runs only with a fine pointer and hover. Press feedback moves the key face by 7px. Reduced motion removes entrance effects and key rotation/tilt. There is no autonomous animation loop. The small-screen key is 116 × 122px and sits beside its caption beneath the introduction. The object is authored in CSS with a small return-arrow SVG and adds no image asset or animation dependency.

### Separate-page navigation

Routes: /, /projects/, /experience/, /about/, and /contact/, plus /projects/{slug}/ case studies. The hero links to About for FIU, Experience for Salesforce, and Projects through its key. Case studies link back to /projects/ and no longer repeat the full contact section. The footer links to Contact, or back home on the Contact page. All navigation works without JavaScript and each route has its own title, description, and single primary heading. Long content remains scrollable within its page so smaller screens never lose content.

### Hero navigation pad

The hero now contains five native navigation links styled as physical keyboard keys: Projects, Experience, About, Contact, and Résumé. Projects retains the lm. monogram and spans two rows; four supporting keys carry stroke icons and explicit destination labels. The pad is a semantic nav named “Explore my portfolio”. Desktop uses a 420px object column and a three-column, two-row pad with 14px gaps. At 1150px the object column becomes 360px. Below 760px it follows the copy, centered at up to 360px wide. At 380px and below the pad uses two columns and three rows so labels remain readable. Each key receives bounded pointer tilt, resets on leave/blur/preference changes, and presses independently. Reduced motion removes tilt and entrance effects. Résumé opens a PDF in a new tab and announces this in its accessible name. All destinations remain available without JavaScript. The header navigation remains available on every page.

### Palette refinement

Projects uses an electric-blue face with an orange monogram dot. Experience uses a deeper blue face; About and Résumé use midnight faces with light-blue icons. Contact uses cantaloupe orange with warm dark text. The same blue/orange roles extend to active navigation, project tabs, links, contact actions, selection, and keyboard focus across individual pages. Layout, animation, copy, and routes are preserved.

### Keyboard assembly animation demo

The circuit background has been removed at Luis's request. The current local demo centers motion on the five existing navigation keys: each arrives from a distinct position and 3D angle, then settles into the pad with exponential easing. The sequence begins when the pad enters the viewport, lasts approximately 1.56 seconds including stagger, and runs once. The replay control was removed at Luis’s request.

The Web Animations API animates transform, opacity, and a bounded 3px blur without dependencies or layout animation. Mobile travel distances are reduced. Native links remain usable; keyboard focus cancels the assembly immediately. Reduced motion disables assembly and pointer tilt . Hiding the document cancels active assembly. The original key hover tilt and press feedback remain.

### Persistent background particles

A sparse field of 24 blue and occasional orange dots drifts behind the homepage navigation keys. Each moves over an 8–14 second alternating cycle with staggered negative delays. The field is decorative, masked at its edges, non-interactive, and static with reduced motion. Mobile uses a smaller field. It adds gentle continuous movement after the finite key assembly, as requested by Luis.

### On-site contact form

Contact now pairs the introduction, copyable email, and social links with labeled Name, Email, and Message fields. The form uses existing dark surfaces, orange focus outlines, and an orange Send message button. It stacks on mobile. Homepage contact links open this page instead of a mail client. AJAX submission uses FormSubmit with inline status, validation, a honeypot, a sending state, timeout handling, and retained text on failure. Email delivery requires recipient activation.

### Embedded résumé viewer

Both résumé links now open `/resume/` in the same tab. This page retains the site navigation and embeds the existing local PDF in a titled iframe with a Download PDF action and a persistent fallback download link. The frame uses viewport-relative height with mobile sizing. Vercel allows same-origin embedding for this PDF while retaining the frame restriction on other routes.

### Personal introduction and About narrative

The homepage introduction connects the projects through their purpose: helping people understand code, learn programming, and solve problems. The About page leads with two short paragraphs grounded in Luis's existing engineering, tutoring, and digital media experience, followed by Education & community. The story uses a 68ch reading measure, 16px desktop text, and 14px mobile text. No unprovided origin story or future plans are asserted.

### Homepage profiles and personal About refinement

GitHub and LinkedIn are visible text links beside Get in touch in the homepage introduction. They wrap naturally on small screens and announce their external new-tab behavior. The About narrative now uses a more conversational first-person voice and connects software, photography/video, tutoring, and campus involvement. The photography gallery remains pending Luis's supplied images; no placeholder artwork ships.

### Photography section

About includes all nine user-supplied photographs after the personal narrative. The gallery uses original image proportions in three staggered columns, two below 1000px, and one below 600px. Quiet 4px corners, 20px spacing, and a single section divider let the photographs supply the color. Responsive 800/1800px JPEGs are lazy-loaded with explicit dimensions and descriptive alt text. There are no cropping effects, hover zooms, or invented dates and location captions.

### Homepage regression correction

Restored the homepage hero, physical keyboard, particle field, introduction typography, and shared text-link styling removed accidentally during the project-tabs refinement. The Projects control now has its own separate selector. The keyboard's existing Web Animations assembly and pointer tilt remain intact.

### Social link marks

Homepage and Contact GitHub/LinkedIn links pair inline, current-color SVG logos with visible names. The marks are decorative to assistive technology; the names remain the accessible labels. Brand marks stay still on hover while the external-link arrow retains its existing feedback.

### Static link arrows

Text links, email links, back links, and next-project arrows remain still on hover at Luis’s request. Color and keyboard focus feedback remain. The homepage keyboard animation is preserved.

Orange text actions now lighten and gain a 2px underline on hover/focus. The Send message button lightens without movement. These use `--color-orange-hover` and preserve the keyboard’s separate physical feedback.

### Dedicated Photography page and keycap

The full nine-image gallery now lives at `/photography/`, with a primary heading and Back to About link. About has a compact View photography action inside its personal introduction. The homepage adds a camera-marked, full-width Photography key in a third row beneath the existing keys, following the spacebar idea. All six keys retain the assembly animation and hover/press behavior; the sixth key has its own starting pose. The narrowest layout adds a fourth row for this key.

### Photograph entrances

Gallery photos now fade from a bounded 4px blur with an 18px upward settle over 850ms and a short stagger. Each entrance waits for image decoding and viewport visibility, then runs once. JavaScript opts into pending visibility; no-JavaScript, reduced-motion, image-error, and print paths keep content visible. Changing to reduced motion cancels animations and reveals pending images immediately. The gallery heading uses the site's existing focus-arrive entrance.

### Enlarged photograph viewer and sage key

Gallery images are native links to their 1800px versions, enhanced to open a native modal dialog. The page behind it is dimmed and blurred by 8px. The dialog is moved outside the page shell so the photograph stays sharp while the underlying page blurs. Images use contain to preserve framing, with a count, descriptive caption, close/previous/next controls, Escape dismissal, arrow-key navigation, background-click dismissal, scroll locking, and focus returned to the opening image. The gallery preview appears immediately while the larger image loads; failed loads retain the preview. Native links remain available without JavaScript. Reduced motion skips the brief opening fade. Photography now has a distinct sage-green physical keycap, with matching darker green sides and dark readable icon/text.

Visible photo captions were removed from the enlarged viewer at Luis’s request. Image alt text remains for accessibility; navigation stays at the lower right.

The Photography key now uses a muted light blue in the established blue/orange palette, replacing sage green. Dark blue text and icon preserve readable contrast.

### Aligned photography rows

The gallery now uses justified rows rather than staggered columns. Each desktop row contains up to three photographs, with widths proportional to original aspect ratios so the photos share a row height. Rows fill the available width, including the final two-image row, creating a straight bottom edge without cropping. At 600px and below, photographs stack in a single column. Enlarged viewing and entrances are preserved.
