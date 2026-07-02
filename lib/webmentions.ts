import "server-only";
import { SITE_URL } from "./site";

export interface WebmentionAuthor {
	name: string;
	photo: string | null;
	url: string | null;
}

export interface Webmention {
	id: string;
	property: "in-reply-to" | "like-of" | "repost-of" | string;
	author: WebmentionAuthor;
	url: string;
	published: string | null;
	text: string | null;
}

interface Jf2Entry {
	"wm-id": number;
	"wm-property": string;
	author?: { name?: string; photo?: string; url?: string };
	url?: string;
	published?: string;
	"wm-received"?: string;
	content?: { text?: string };
}

// Mentions may target the old root URLs or the /blog-prefixed ones, with or
// without trailing slashes — fetch every variant and dedupe by wm-id.
export async function getWebmentions(slugs: string[]): Promise<Webmention[]> {
	const targets = new Set<string>();
	for (const slug of slugs) {
		const p = `/${slug.replace(/^\/|\/$/g, "")}/`;
		for (const prefix of ["", "/blog"]) {
			targets.add(`${SITE_URL}${prefix}${p}`);
			targets.add(`${SITE_URL}${prefix}${p.replace(/\/$/, "")}`);
		}
	}

	const results = await Promise.all(
		[...targets].map(async target => {
			try {
				const res = await fetch(
					`https://webmention.io/api/mentions.jf2?per-page=1000&target=${encodeURIComponent(target)}`,
					{ next: { revalidate: 3600 } }
				);
				if (!res.ok) return [];
				const data = (await res.json()) as { children?: Jf2Entry[] };
				return data.children ?? [];
			} catch {
				return [];
			}
		})
	);

	const seen = new Set<number>();
	const mentions: Webmention[] = [];
	for (const entry of results.flat()) {
		if (seen.has(entry["wm-id"])) continue;
		seen.add(entry["wm-id"]);
		mentions.push({
			id: String(entry["wm-id"]),
			property: entry["wm-property"],
			author: {
				name: entry.author?.name || "Anonymous",
				photo: entry.author?.photo || null,
				url: entry.author?.url || null
			},
			url: entry.url ?? "",
			published: entry.published ?? entry["wm-received"] ?? null,
			text: entry.content?.text ?? null
		});
	}
	return mentions;
}
