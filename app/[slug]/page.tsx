import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/container";
import SiteHeader from "@/components/site-header";
import Author from "@/components/author";
import Feedback from "@/components/feedback";
import { getPost, getPosts } from "@/lib/posts";
import { getFeedback } from "@/lib/feedback";
import { formatDate } from "@/lib/dates";
import { author } from "@/lib/author";
import { SITE_URL } from "@/lib/site";

// webmentions refresh hourly via ISR (replaces the daily cron rebuild)
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
	return getPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
	params
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};

	const image = post.cover ?? author.avatar;

	return {
		title: `${post.title} | ${author.name}`,
		description: post.description,
		alternates: { canonical: `/${post.slug}/` },
		openGraph: {
			type: "article",
			url: `/${post.slug}/`,
			title: `${post.title} | ${author.name}`,
			description: post.description,
			publishedTime: post.date,
			section: "Software Development",
			authors: [`${SITE_URL}/`],
			images: [{ url: image.src }]
		},
		twitter: {
			card: post.cover ? "summary_large_image" : "summary",
			creator: `@${author.twitter}`,
			title: `${post.title} | ${author.name}`,
			description: post.description,
			images: [image.src]
		}
	};
}

export default async function PostPage({
	params
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	const [{ default: MDXContent }, feedback] = await Promise.all([
		post.load(),
		getFeedback(post)
	]);

	return (
		<Container>
			<SiteHeader />

			<main role="main">
				<article className="h-entry">
					<header className="my-6">
						<h1 className="p-name mb-1 text-4xl font-bold text-[color:var(--textTitle)]">
							{post.title}
						</h1>
						<div className="text-[color:var(--textMuted)]">
							<a
								href={`${SITE_URL}/${post.slug}/`}
								className="u-url text-[color:var(--textMuted)] no-underline"
							>
								<time dateTime={post.date} className="dt-published text-sm">
									{formatDate(post.date)}
								</time>
							</a>
							<span className="float-right text-sm">
								{post.readingTime} min read
							</span>
						</div>
					</header>

					<div className="e-content prose max-w-none">
						<MDXContent />
					</div>

					<footer className="mt-6">
						<Author small className="my-6 border-y border-[color:var(--hr)] py-6">
							Written by{" "}
						</Author>
						<Feedback feedback={feedback} twitterId={post.twitterId} />
					</footer>
				</article>
			</main>
		</Container>
	);
}
