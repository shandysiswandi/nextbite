# NextBite Agent Guide

This repository is a Next.js App Router project with Biome/Ultracite formatting and Playwright tests. Follow the commands and style rules below when working here.

## Commands

- Install dependencies: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start production server: `pnpm start`
- Typecheck: `pnpm typecheck`
- Lint (auto-fixes): `pnpm lint`
- Format (auto-fixes): `pnpm format`
- Ultracite fix: `pnpm dlx ultracite fix`
- Ultracite check: `pnpm dlx ultracite check`
- Ultracite doctor: `pnpm dlx ultracite doctor`

### Tests (Playwright)

- Run all tests: `pnpm test`
- Run single test file: `pnpm test -- tests/auth/login.spec.ts`
- Run single test by title: `pnpm test -- --grep "login"`
- Open Playwright UI: `pnpm test:ui`

## Repo Conventions

- App Router lives in `src/app`; locale-aware routes live under `src/app/[lang]`.
- Use `@/` alias for `src` imports (see `tsconfig.json`).
- Utility helpers live in `src/libraries`; feature-level code lives in `src/features`.
- `src/components/ui` is excluded from Biome checks; treat it as vendor-style UI code and avoid large refactors unless needed.

## Localization & Routing

- Keep locale definitions in `src/libraries/i18n` and dictionaries in `src/libraries/i18n/locales`.
- Prefer language-aware navigation helpers like `LocalizedLink`.
- Ensure locale routes provide static params when required.

## Formatting & Linting (Ultracite/Biome)

- Biome config extends Ultracite presets (`biome.jsonc`).
- `pnpm lint` and `pnpm format` both write changes; run them before committing.
- Keep files ASCII unless existing content already uses Unicode.

## Code Style Guidelines

### Imports

- Prefer explicit named imports over namespace imports.
- Group imports with blank lines: external, then local aliases.
- Use type-only imports (`import type`) for types.

### TypeScript

- Keep `strict`-safe code; prefer narrowing over type assertions.
- Use `unknown` instead of `any` when the type is unclear.
- Use `as const` for literal types and immutable values.
- Extract magic numbers into well-named constants.
- Use `const` by default, `let` only when reassignment is needed.

### Modern JavaScript

- Prefer template literals over string concatenation.
- Use optional chaining (`?.`) and nullish coalescing (`??`).
- Use object/array destructuring for clarity.
- Prefer `for...of` over `.forEach()` when `await` is needed.

### Naming

- `PascalCase` for components/types, `camelCase` for variables/functions.
- Boolean names read clearly (e.g., `isLoading`, `hasAccess`).
- Prefer descriptive names for API params and response models.

### React / Next.js

- Use function components and React hooks at the top level only.
- Keep Server Components for async data fetching; use `"use client"` only when needed.
- Use Next.js `<Image>` for images and App Router metadata APIs for head tags.
- Add `key` props for list items (use stable IDs).
- Use semantic HTML and accessible labels/alt text.

### State & Hooks

- Avoid defining components inside other components.
- Keep hook dependencies accurate; avoid disabling lint rules.
- Prefer derived state over mirrored state.

### Styling

- Tailwind is used; prefer `cn` helper from `src/libraries/utils/tailwind.ts` to merge classes.
- Keep class strings readable and avoid repeated utility patterns.

### Async & Error Handling

- Use `async/await` and always await promises.
- Throw `Error` objects or domain-specific error classes.
- Prefer early returns over nested branches.
- Avoid `console.log`/`debugger` in production code.

### Code Organization

- Keep functions focused and avoid deep nesting.
- Extract complex conditions into named booleans.
- Keep module responsibilities small and cohesive.

### API/Server Utilities

- Keep `"server-only"` imports in server modules.
- Use shared API helpers in `src/libraries/api` (Axios wrappers + ApiError).
- Normalize errors using helpers like `catchError` from `src/libraries/utils/error.ts`.

### Security & Performance

- Add `rel="noopener"` to `target="_blank"` links.
- Avoid `dangerouslySetInnerHTML` unless necessary.
- Prefer top-level regex literals and avoid heavy work in render.

### Performance

- Avoid unnecessary re-renders by memoizing expensive work.
- Prefer shared helpers in `src/libraries` over ad-hoc utilities.
- Use `cn` + `tailwind-merge` to reduce class churn.

## Testing Guidelines

- Write assertions inside `test()`/`it()` blocks only.
- Avoid `.only`/`.skip` in committed code.
- Prefer async tests with `await` over callback-based APIs.
- Keep test suites flat; avoid deep `describe` nesting.
- Use Playwright locators instead of brittle selectors.

## When Biome Can't Help

- Validate business logic correctness and edge cases manually.
- Confirm meaningful naming for exported modules and props.
- Review architecture decisions (data flow, component boundaries).
- Add comments only when logic is non-obvious.

## Notes

- Most formatting and common issues are auto-fixable; run `pnpm lint` or `pnpm format` before committing.

## Cursor/Copilot Rules

- No additional Cursor or Copilot rules found in `.cursor/rules`, `.cursorrules`, or `.github/copilot-instructions.md`.
