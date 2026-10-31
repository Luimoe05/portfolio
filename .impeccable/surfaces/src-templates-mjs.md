---
version: 1
slug: "src-templates-mjs"
primary_target: "src/templates.ts"
related_targets: ["src/styles.css","src/app.ts","src/projects.ts"]
---

# Personal Portfolio Design Brief

Status: Approved by Luis. Subsequent user-requested polish changes the homepage to a stacked layout, with work below the introduction and horizontal project tabs above the preview.

## 1. Feature summary

A production-ready personal portfolio for Luis-Angel Moreno, a computer science student at FIU with two Salesforce software engineering internships. Present projects, experience, education, and leadership through an expressive but readable dark interface. Visitors should understand the work, explore individual project pages, and contact Luis.

Product truth: PRODUCT.md. Resume-derived content and project links: CONTENT.md.

## 2. Primary user action

Explore a featured project and open its case study. Contact remains directly accessible from the navigation, introduction, and closing section.

## 3. Selected design direction

Direction B, revised at Luis’s request: a vertically stacked project explorer. The personal introduction comes first; horizontal project tabs and one shared project preview sit underneath at every width. The neutral visual identity and restrained motion remain.

- Theme: dark, explicitly selected by Luis.
- Scene: a curious visitor explores Luis's projects on a laptop in a softly lit evening workspace; dark graphite surfaces and readable warm-white text keep the work comfortable to inspect. This is an art-direction scenario, not a claim about all visitors.
- Color strategy: Restrained and neutral. Tinted graphite backgrounds, warm-white text, soft silver selected states, and warm-gray secondary details. Keep interface accents neutral, replacing the probe's teal and coral. Genuine project visuals supply the broader color. Selected states also use weight, shape, and clear focus treatment, rather than color alone. No neon or decorative glow.
- Typography: confident sans-serif headings and readable body text with clear scale and weight contrast. Choose and verify font files during implementation; the generated preview does not establish an exact font.
- User-supplied anchors: https://hasque.com/, https://williamle.design/, https://www.joannecho.me/. These are inspiration references, not layouts to duplicate. Only their readable content was inspected; their motion and rendered visual details were not verified.
- Selected probe: `/Users/luis/.codex/generated_images/01a18962-7691-77b1-a32c-c35f9f0b6d8a/exec-4e14eceb-2c2d-43d3-9965-ba9573576c73.png`.

The probe establishes topology and mood. Luis subsequently requested a more neutral palette: its teal and coral are superseded by silver and warm gray. Its laptop, surrounding room, imagined product interfaces, and decorative illustration are presentation material, not required website assets or verified product screenshots. Final copy must come from the content source.

## 4. Scope

- Production-ready responsive website, polished for desktop and mobile.
- Homepage plus three project pages: RepoAI, Codifica, and CreatorsFIU.
- Proposed routes: `/`, `/projects/repo-ai`, `/projects/codifica`, `/projects/creators-fiu`.
- Homepage sections: introduction and selected work, Salesforce experience, education and leadership, contact.
- English initially. No CMS, authentication, project filtering, or contact-form backend is needed for this version.
- Finish interactive behavior and visual verification before publication. Hosting and publication remain a later step.

## 5. Layout strategy

The homepage follows one centered column: introduction, selected work, experience, and about. Project choices form a horizontal row above the selected preview. The introduction is static, not a sticky sidebar. Desktop previews use a wide frame capped at 480px tall, with a more portrait-friendly ratio on small screens.

RepoAI is initially selected. Every project has a concise description, a representative visual, and an explicit case-study link. Below the explorer, experience has more reading space, education is concise, and leadership adds personal depth. End with visible email, GitHub, and LinkedIn links.

On mobile, place the introduction first, then an accessible project selector and shared preview. Let the page scroll naturally. No horizontal page overflow, tiny desktop replica, or content available only on hover. Case studies use a consistent, readable single-column narrative with larger visuals where useful.

## 6. Key states and content ranges

- Three projects; short descriptions must wrap naturally. Accommodate longer titles without truncating essential information.
- Default, hover, keyboard focus, and selected project states must be visually distinct.
- Direct project-page loads and browser back/forward navigation must work.
- Images reserve their space while loading. Missing visuals receive a clearly labeled fallback, never an invented product screenshot.
- Unknown routes receive a useful not-found page with a home link.
- With reduced motion, preserve instant state feedback and all content while removing movement.
- Unverified or unavailable deployments must not receive an active live-demo link until checked. A project without a live site remains complete through its case study and source link.

## 7. Interaction and motion

- Use an accessible tab model for the project selector: click or keyboard activation changes the preview; arrow keys move between tabs. The selected preview includes an explicit link to its project page.
- Project swaps use a short crossfade with a small translation, approximately 180–280 ms, without moving the surrounding layout.
- Orchestrate one restrained introduction sequence and short section reveals. Essential content remains visible if animation fails.
- Links and controls receive subtle, consistent feedback, approximately 120–180 ms. Do not animate every surface.
- Where supported, project-page transitions preserve visual continuity between the preview and case-study hero, approximately 250–400 ms. Standard navigation remains the fallback.
- Use transform and opacity with ease-out quart/quint/expo curves. No bounce, scroll hijacking, pointer-following content, autoplay carousels, continuous decorative motion, or forced viewing delays.
- Respect reduced motion, visible focus, sufficient contrast, touch target sizes, and semantic navigation. Native document scrolling and browser history remain intact.
- Contact uses a direct email link; optional email-copy feedback must accurately announce success or failure.

## 8. Content requirements

Each case study includes a project overview, problem, Luis's role, implementation and technical decisions, supported outcomes, and source/demo links. Separate individual contributions from team accomplishments. Do not invent challenges, architecture decisions, measurements, testimonials, or project dates.

Use the supplied resume for education, internships, accomplishments, and skills. Prefer concise evidence over long technology lists. Quantitative claims need their original qualifiers; where methodology is missing, use supported non-quantitative wording or request context before expanding the claim.

Use actual screenshots or recordings from the supplied projects when available. RepoAI and Codifica have supplied or README-listed deployment URLs; CreatorsFIU currently has a repository and a README image reference. Show live links only after checking them. Public phone display is not part of this brief.

## 9. Implementation references

From `/Users/luis/.agents/skills/impeccable/reference/`:

- `brand.md`: individuality and portfolio presentation.
- `spatial-design.md`: asymmetric hierarchy and spacing.
- `interaction-design.md`: selection, navigation, feedback, and focus.
- `motion-design.md`: transition choreography and reduced motion.
- `responsive-design.md`: mobile restructuring.
- `typography.md`: hierarchy and readable text.

## 10. Open decisions and constraints

- Select a lightweight framework and hosting-compatible route strategy during build; no existing application stack has been established in this workspace.
- Retrieve and inspect genuine project assets and deployment availability before composing final project visuals.
- Missing case-study details may require short factual follow-ups. They must not be filled with invented claims.
- Confirm current education and role details before publication.
- Capture the implemented visual tokens and reusable patterns in DESIGN.md after the visual system is concrete.

## Approval

Direction B's structure and the neutral silver and warm-gray revision were explicitly approved. Luis subsequently requested implementation.

## Direction contract

THESIS: A personal introduction leads into an interactive index of three real projects underneath it. The homepage follows a vertical reading flow, as explicitly requested during polish.

OWN-WORLD: Warm graphite, warm-white lettering, silver selection indicators, quiet gray details, Manrope typography, and rounded project visuals. Original project imagery supplies color. The neutral revision supersedes the probe's teal and coral.

STORY: Understand Luis's background, choose a project, read the actual engineering contributions, then explore the source or start a conversation.

FIRST VIEWPORT: The introduction occupies the top of a centered column. Selected work follows underneath, with horizontal project tabs above one wide preview and a direct case-study link. Mobile keeps this sequence and adjusts type, spacing, and preview ratio. The signature interaction swaps projects with a short fade and translation.

FORM: User-pinned Direction B, code-led implementation with a user-authorized stacked homepage revision and the approved neutral palette. The probe is a critique reference, not a pixel specification, as established in section 3. The discovery roll ran without catalog challengers; the pinned brief supersedes its unchosen assignment. seed:daab866762d9facc.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
