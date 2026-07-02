import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import avatar from "@/content/author/chad.jpg";

const { data } = matter(
	fs.readFileSync(
		path.join(process.cwd(), "content", "author", "chad.mdx"),
		"utf8"
	)
);

export const author = {
	name: data.name as string,
	description: data.description as string,
	gender: data.gender as string,
	github: data.github as string,
	twitter: data.twitter as string,
	keybase: data.keybase as string,
	stackOverflow: data.stackOverflow as string,
	linkedin: data.linkedin as string,
	avatar
};
