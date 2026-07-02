import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const nextConfig: NextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	trailingSlash: true,
	async redirects() {
		const staticRedirects = [
			{ source: "/feed.xml", destination: "/rss.xml", permanent: true },
			{ source: "/rss", destination: "/rss.xml", permanent: true },
			{
				source: "/2013/12/geocoding-v3",
				destination: "https://github.com/chadly/Geocoding.net",
				permanent: true
			},
			// the retired Quartz site served posts under /blog
			{ source: "/blog", destination: "/", permanent: true },
			{ source: "/blog/:slug*", destination: "/:slug*", permanent: true }
		];

		// redirect_from frontmatter -> permanent redirects (replaces Gatsby createRedirect)
		const postsDir = path.join(process.cwd(), "content", "posts");
		const fromFrontmatter: typeof staticRedirects = [];

		for (const entry of fs.readdirSync(postsDir, { withFileTypes: true })) {
			const file = entry.isDirectory()
				? path.join(postsDir, entry.name, "index.mdx")
				: path.join(postsDir, entry.name);
			if (!file.endsWith(".mdx") || !fs.existsSync(file)) continue;

			const slug = entry.isDirectory()
				? entry.name
				: entry.name.replace(/\.mdx$/, "");
			const { data } = matter(fs.readFileSync(file, "utf8"));

			for (const from of data.redirect_from ?? []) {
				fromFrontmatter.push({
					source: from.replace(/\/$/, ""),
					destination: `/${slug}`,
					permanent: true
				});
			}
		}

		return [...staticRedirects, ...fromFrontmatter];
	}
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [
			"remark-frontmatter",
			"remark-gfm",
			"remark-smartypants"
		],
		rehypePlugins: [
			"rehype-unwrap-images",
			"rehype-slug",
			["rehype-autolink-headings", { behavior: "wrap" }],
			[
				"rehype-pretty-code",
				{ theme: { light: "github-light", dark: "github-dark" } }
			],
			"rehype-mdx-import-media"
		]
	}
});

export default withMDX(nextConfig);
