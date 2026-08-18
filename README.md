# The Next Generation of State — Signal Forms talk (Angular v22)

A 40-minute session on **mastering stable Angular Signal Forms**: a Slidev deck
plus a runnable Angular demo whose code the slides are copied from — so every
snippet on screen actually compiles.

> Requires Node ≥ 24.15 (Angular 22). This repo was verified on Node 26.

## The deck (Slidev)

```bash
npm install
npm run dev        # http://localhost:3030
npm run export     # -> signal-forms.pdf (needs playwright-chromium, already a devDep)
```

`slides.md` is the whole deck. Angular brand styling lives in `style.css` +
`uno.config.ts` (pink→purple gradient `#E23DAE → #8F2CD8`, red accent `#DD0031`).

## The demo (Angular 22)

Every example in the deck is a real, compiling component under `demo/`.

```bash
cd demo
npm install
npm start                    # http://localhost:4200 — navigable demo app
npm run build                # compile gate: zero errors
npm test                     # signal-forms unit tests (Vitest)
```

### What's inside `demo/src/app/examples/`

| Route          | File                    | Shows |
|----------------|-------------------------|-------|
| `/basic`       | `basic-form`            | `signal()` model + `form()` + `[formField]` |
| `/field-state` | `field-state`           | `value/valid/touched/errors` signals |
| `/validation`  | `validation`            | built-in + custom + cross-field + `applyWhen` |
| `/schemas`     | `schemas`               | `schema()`, `apply()`, `applyEach()` |
| `/zod`         | `zod-validation`        | `validateStandardSchema()` with Zod |
| `/async`       | `async-validation`      | `validateAsync()` + `resource()` |
| `/submit`      | `submit-form`           | `submit()`, `submitting()`, server errors |

## Slide ↔ demo map

The API-focused slides mirror the demo examples one-to-one. If you edit a snippet on a slide,
change the matching `demo/` component and re-run `npm run build` in `demo/` to
keep the code honest.

## Key API notes (v22 stable)

- Everything imports from `@angular/forms/signals`.
- Template directive is **`[formField]`** (not the old experimental `[control]`).
- Read field state by calling the field: `f.email().errors()`, `f().valid()`, `f().submitting()`.
- The schema function is **not reactive** — branch with `applyWhen()`, use non-null model defaults.
