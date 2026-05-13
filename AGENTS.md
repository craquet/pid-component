# AGENTS.md

## Repo map

- This is an npm workspaces monorepo managed by Lerna (`lerna.json` uses independent versioning and `npmClient: npm`).
- `packages/stencil-library` is the source of truth for the web component and all identifier renderers.
- `packages/react-library`, `packages/vue-library`, and `packages/angular-library` are thin wrapper packages generated
  from Stencil output targets; do not hand-edit generated `dist/` or `lib/stencil-generated/` files.
- `packages/nextjs-app` is a private demo/Storybook host, not a published package.

## Core architecture

- The main public component is `packages/stencil-library/src/components/pid-component/pid-component.tsx`.
- Identifier-specific logic lives in `packages/stencil-library/src/rendererModules/*` and extends
  `GenericIdentifierType`.
- The renderer registry and priority order are centralized in `packages/stencil-library/src/utils/utils.ts`.
- Auto-detection is implemented in `packages/stencil-library/src/auto-detect/initPidDetection.ts`: it scans DOM text
  nodes, chooses a renderer with `detectBestFit`, and replaces matches while preserving original text for recovery.
- The public entrypoint is `packages/stencil-library/src/index.ts`; export additions should start there.

## Project conventions

- Renderer class names follow the `*Type` pattern: e.g. `HandleType`, `ORCIDType`, `DataCiteDOIType`, `CrossRefDOIType`.
- New renderer behavior usually needs three edits: implement the renderer, register it in `src/utils/utils.ts`, and
  export it from `src/index.ts`.
- Many props are designed for both HTML and TSX usage; remember hyphenated attributes in plain HTML and camelCase in
  Stencil/JSX code.
- `settings` and some options are passed as stringified JSON, not typed objects, so preserve that contract when editing
  props or docs.
- Example/demo data lives in `examples/` and is re-exported from `examples/index.ts`; keep stories and demos aligned
  when adding new sample identifiers.

## Development workflow

- Use npm only; the README explicitly says not to use yarn or pnpm.
- Common commands: `npm run build`, `npm run lint`, `npm test`, `npm run storybook`, `npm run storybook:all`, and
  `npm run build-storybook`.
- Package-level Stencil workflows live in `packages/stencil-library`: `npm run buildWatch`, `npm run test:spec`,
  `npm run test:e2e`, `npm run test:watch`.
- Browser-based tests and Storybook tests require Chromium: `npx playwright install --with-deps chromium`.
- CI also checks formatting via `npx lerna run format:check`.
- Before giving any result to the user, please run `lerna run build && npm run build-storybook` as well as
  `npm run lint` and `npm test` to ensure the code is in good shape.

## What to be careful with

- The Stencil library drives wrapper generation and public API shape; changes here can affect every framework package.
- `packages/stencil-library/src/utils/utils.ts` controls auto-detection defaults via `autoDiscoverableByDefault`;
  `LocaleType` and `FallbackType` are intentionally not auto-discovered by default.
- `pid-component` recursively renders subcomponents and uses props like `levelOfSubcomponents`,
  `currentLevelOfSubcomponents`, `showTopLevelCopy`, and `fallbackToAll` to control nested behavior.
- Prefer changing source files over generated outputs; Storybook static assets and compiled bundle directories are build
  artifacts.

