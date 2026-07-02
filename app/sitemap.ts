import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: `${SITE_URL}/` },
		{ url: `${SITE_URL}/trogdor/` },
		...getPosts().map(p => ({
			url: `${SITE_URL}/${p.slug}/`,
			lastModified: p.date
		}))
	];
}
