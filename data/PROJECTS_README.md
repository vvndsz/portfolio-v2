PROJECTS data

This file contains the `projects` dataset used by the portfolio site.

Location: `data/projects.ts`

How to edit:
- Open `data/projects.ts`.
- Each item is a `Project` with fields: `title`, `value` (short description), `howItWorks` (optional), `stack` (array), `href` (optional), `linkLabel` (optional).
- Add, remove, or reorder entries. The UI will reflect changes on next dev server reload.

Tips:
- Use valid TypeScript strings/arrays. Keep `href` empty if you don't have a link yet.
- To add thumbnails later, add a `thumbnail` property and update `app/page.tsx` to render it.
