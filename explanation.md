# Nido Hackathon Website – Build Notes

## Overview
- Static single-page layout powered by Tailwind CSS (via the CDN import at the top of `index.html`) plus bespoke gradients, glass cards, and sticky notes defined with inline `<style>` rules.
- Countdown, modals, and form handling all live inside the `<script>` block at the bottom of `index.html`, while the rotating hero headline comes from `Hack 26/js/frontpage-messages.js`.
- Forms post to a Google Apps Script endpoint (`endpoint` constant near the top of the script) using `fetch` with `mode: "no-cors"` to avoid CORS failures in the lightweight front-end.

## File layout
- `index.html` – entire page markup (navigation, hero, mission, stats grid, sponsors, footer, modals). 
- `images/` – logos, hero photos, event gallery assets, etc.
- `Hack 26/js/frontpage-messages.js` – array of rotating hero splash lines pulled in with a `<script>` tag.
- `explanation.md` – this guide.

## Page sections (top to bottom)
1. **Navigation** – fixed header with Nido logo, uppercase nav links, a Hacker Hub pill, and an archive link; the mobile menu button currently logs nothing (`toggleMenu()` placeholder).
2. **Hero** – gradient “Innovate the Future.” headline, mission label, animated countdown (days/hours/minutes/seconds wrapped in sticky‑note cards), and CTA buttons that open the two modals via `openModal('participant-modal')` and `openModal('sponsor-modal')`.
3. **Mission / About** – split layout explaining what a hackathon is, the theme (“For Students By Students: Leveraging AI Innovation”), and the polaroid-style image block pulled from `images/Event photos/IMG_0205.JPG`.
4. **Impact stats** – a custom “bento” grid of glass cards showing attendees/projects/internships along with a CTA card linking to the previous hackathon archive (`OLD/previous-hackathon.html`). The stat values are hard-coded into the markup (40, 11, 4) but can be edited directly.
5. **Sponsors** – cards with sponsor logos (currently UDD plus a “More Soon” placeholder) inside glass panels.
6. **Footer** – navigation links plus copyright text and partner acknowledgement.

## Interaction & behavior
- **Rotating hero message** – `Hack 26/js/frontpage-messages.js` exports `window.FRONTPAGE_MESSAGES`. When the page loads it picks a random entry and stores the last exposed index in `localStorage` to avoid repeats.
- **Countdown timer** – `hackathonDate` is set to `new Date("April 10, 2026 15:30:00")`. Every second the script recalculates the remaining time and updates the DOM elements with IDs `days`, `hours`, `minutes`, and `seconds`.
- **Forms & modals** – two modal backdrops (`participant-modal` and `sponsor-modal`) contain forms that call `handleSubmission(...)`. That helper disables the button, swaps its text with the spinner, posts the form data plus metadata to the Apps Script endpoint, then restores the button and surfaces success/error banners.

## Customization checklist
1. **Update hero copy/date** – edit the `<h1>` for new messaging and change `hackathonDate` inside the `<script>` block near the bottom of `index.html` whenever your event date/time changes.
2. **Rotate slogans** – add or swap entries in `Hack 26/js/frontpage-messages.js` to keep the hero tagline fresh; the script automatically reads that array.
3. **Stats grid** – adjust the numbers/text inside the glass cards in the “Impact_Report_v2.0” section (search for `text-8xl`/`text-5xl` spans) if you want new attendee/project/internship counts.
4. **Sponsor logos** – drop PNG/JPG/SVG files into `images/Sponsors/` and add new `<div class="glass-card">` blocks inside the sponsors section to surface them; match the height/spacing classes already used.
5. **Forms** – expand either form in the modal bodies (`participant-modal` uses `signupForm`, `sponsor-modal` uses `sponsorForm`). You can rename fields, add inputs, or change placeholder text. If your backend changes, update the `endpoint` constant right above the helper functions.
6. **Copy updates** – sections such as the mission description, sponsor blurb, and footer copy are all editable inline in `index.html`; follow the tailwind utility classes to keep spacing consistent.

## Tips
- Keep new images under 2MB and use `loading="lazy"` where possible (already applied in the polaroid image).
- When adding sponsor cards, reuse the `.glass-card` class so the hover/gradient effect stays uniform.
- Test both modals after any change; the success/error messages rely on the `hidden` class being toggled for `formMessage` and `sponsorMessage`.
