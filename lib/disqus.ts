import "server-only";
import fs from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

export interface DisqusComment {
	id: string;
	parentId: string | null;
	author: { name: string; photo: string | null; url?: string };
	date: string;
	message: string;
	comments?: DisqusComment[];
}

// threadId (frontmatter uuid) -> flat comment list
let byThread: Map<string, DisqusComment[]> | null = null;

function parse(): Map<string, DisqusComment[]> {
	const xml = fs.readFileSync(
		path.join(process.cwd(), "content", "disqus.xml"),
		"utf8"
	);
	const doc = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "@"
	}).parse(xml);

	// dsq internal thread id -> frontmatter uuid
	const threadIds = new Map<string, string>(
		(doc.disqus.thread ?? []).map((t: Record<string, unknown>) => [
			t["@dsq:id"],
			t.id
		])
	);

	const map = new Map<string, DisqusComment[]>();
	for (const p of doc.disqus.post ?? []) {
		if (String(p.isDeleted) === "true" || String(p.isSpam) === "true") continue;
		const uuid = threadIds.get(p.thread?.["@dsq:id"]);
		if (!uuid) continue;

		const username = p.author?.username;
		const comment: DisqusComment = {
			id: String(p["@dsq:id"]),
			parentId: p.parent ? String(p.parent["@dsq:id"]) : null,
			author: {
				name: String(p.author?.name ?? "Anonymous"),
				photo: username
					? `https://disqus.com/api/users/avatars/${username}.jpg`
					: null
			},
			date: String(p.createdAt),
			message: String(p.message ?? "")
		};

		const list = map.get(uuid) ?? [];
		list.push(comment);
		map.set(uuid, list);
	}
	return map;
}

export function getDisqusComments(threadId: string): DisqusComment[] {
	byThread ??= parse();
	return byThread.get(threadId) ?? [];
}
