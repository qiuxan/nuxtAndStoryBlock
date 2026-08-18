# Storyblock + Nuxt Starter Blog — Design Doc

Date: 2026-08-18

## Goal

A small local project to get hands-on with the standard Storyblock + Nuxt.js development workflow. The user is new to both Vue/Nuxt and Storyblock. The goal is to walk through the full loop — content modeling → fetching content → rendering → live preview via the Visual Editor — not to produce a polished or feature-rich product.

## Tech choices

- **Nuxt 3 + TypeScript**
- **`@storyblok/nuxt`** (official module) — instead of hand-rolled REST calls. Reason: the official module bundles the Storyblock Bridge, giving live page refresh while editing content in the Storyblock UI. That real-time preview loop is the thing that sets Storyblock apart from a plain headless CMS, and it's the main thing this exercise is meant to build intuition for.
- **`@nuxtjs/tailwindcss`** for styling — not aiming for visual polish, just a usable layout.

Alternatives considered:
- Hand-written CDN API calls via `useFetch`: exposes the raw HTTP request shape, but loses the Visual Editor live-preview loop.
- Storyblock + Nuxt Content as a hybrid content source: over-engineered for a starter project — skipped.

## Content model

| Storyblock Content Type | Fields | Notes |
|---|---|---|
| `page` | `body` (bloks array) | Container type, used for the homepage; kept minimal — no drag-and-drop modular blocks in this pass |
| `blog_post` | `title`, `intro`, `image`, `content` (richtext), `date` | Post content, stored under the `blog/` folder |

## Component mapping

| Content Type | Vue component |
|---|---|
| `page` | `components/Page.vue` |
| `blog_post` | `components/BlogPost.vue` |

`<StoryblokComponent :blok="..." />` maps content to the matching Vue component by the Storyblock `component` field — no manual if/else branching needed.

## Pages & data flow

1. **Homepage** `pages/index.vue`
   - `useStoryblokApi().get('cdn/stories', { starts_with: 'blog/', version: 'draft' })` fetches all post summaries under `blog/`
   - Renders a card list, each card linking to `/blog/{slug}`
   - Shows an empty-state message when there are no posts yet

2. **Post detail page** `pages/blog/[slug].vue`
   - `useAsyncStoryblok('blog/' + slug, { version: 'draft' })` fetches the full post
   - `<StoryblokComponent :blok="story.content" />` renders it via `BlogPost.vue`
   - A missing slug triggers `createError({ statusCode: 404 })` — Nuxt's built-in error page

Local dev always uses `version: 'draft'` so edits made in the Storyblock backend (even unpublished) show up live via the Bridge. Switch to `version: 'published'` for production.

## Error handling

- Missing slug → 404 via Nuxt's built-in error page, no custom handling needed
- Empty post list → placeholder text instead of a blank page

## Verification

No automated tests — this is a local learning project, not where the value is. Manual verification:

1. `npm run dev`, visit the homepage, confirm the post list renders
2. Open a post detail page, confirm rich text and image render correctly
3. Open the Visual Editor in the Storyblock backend, point it at `localhost:3000`, edit a post title, confirm the page live-updates via the Bridge
4. Visit a nonexistent slug, confirm it renders the 404 page

## Out of scope

- Visual design polish
- Automated tests
- Modular drag-and-drop page blocks (`page.body` as a flexible bloks array) — save that for a follow-up project once the blog flow works end to end
