import { getAllPosts } from "@/lib/posts";
import { author } from "@/lib/author";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (s: string) =>
	s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

export function GET() {
	const items = getAllPosts()
		.map(post => {
			const url = post.isExternal ? post.url : `${SITE_URL}${post.url}`;
			return `		<item>
			<title>${escapeXml(post.title)}</title>
			<description>${escapeXml(post.description)}</description>
			<link>${url}</link>
			<guid isPermaLink="false">${post.id}</guid>
			<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
		</item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(author.name)}</title>
		<description>${escapeXml(author.description)}</description>
		<link>${SITE_URL}</link>
		<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
		<language>en</language>
${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" }
	});
}
