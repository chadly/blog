# chadly.net

> Personal blog powered by [Next.js](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/) + TypeScript

## Running Locally

```
npm install
npm run dev
```

This starts the dev server at `localhost:8080`. A prestep generates
`content/generated/` (the post/project import map) from the MDX files in
`content/` — re-run `node scripts/generate-content-map.mjs` if you add or
rename content while the server is running.

## Content

- `content/posts/` — blog posts in MDX (single file or folder with `index.mdx` + colocated assets/components)
- `content/projects/` — "Things I've Built" entries
- `content/author/` — bio + avatar
- `content/external/posts.json` — posts published elsewhere, merged into the list + RSS
- `content/disqus.xml` — archived Disqus comments, rendered statically

Comments are Disqus-archive + live [webmentions](https://indieweb.org/Webmention)
(webmention.io), refreshed hourly via ISR.

## Webmentions

If you want to load webmentions while running locally, be sure to set the environment variable `WEBMENTIONS_TOKEN`. You can do that by creating a `.env` file with the contents:

```
WEBMENTIONS_TOKEN=my_token
```

## Deploying

Deployed on [Vercel](https://vercel.com/).
