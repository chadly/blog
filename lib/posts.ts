import { posts, type Post } from "@/content/generated/posts";
import externalPosts from "@/content/external/posts.json";

export type { Post };

export interface PostListItem {
	id: string;
	title: string;
	description: string;
	date: string;
	url: string;
	readingTime?: number;
	isExternal?: boolean;
}

// merged local + external post list, newest first (port of massageList)
export function getAllPosts(): PostListItem[] {
	return [
		...posts.map(p => ({
			id: p.id,
			title: p.title,
			description: p.description,
			date: p.date,
			url: `/${p.slug}/`,
			readingTime: p.readingTime
		})),
		...externalPosts.map(({ postId, timeToRead, ...p }) => ({
			id: postId,
			readingTime: timeToRead,
			isExternal: true,
			...p
		}))
	].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => posts.find(p => p.slug === slug);

export const getPosts = () => posts;
