import Image from "next/image";
import Container from "@/components/container";
import Author from "@/components/author";
import AvatarRow from "@/components/avatar-row";
import PostStub from "@/components/post-stub";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/content/generated/projects";
import { author } from "@/lib/author";

export default async function HomePage() {
	const posts = getAllPosts();

	const loadedProjects = await Promise.all(
		projects.map(async p => ({ ...p, Body: (await p.load()).default }))
	);

	return (
		<Container>
			<Author />

			<main role="main">
				<section className="mt-20">
					<h2 className="mb-8 border-b border-[color:var(--hr)] pb-2 text-3xl font-bold text-[color:var(--textTitle)]">
						Things I&apos;ve Built
					</h2>

					{loadedProjects.map(({ slug, headline, href, logo, Body }) => (
						<AvatarRow
							key={slug}
							component="article"
							src={logo ?? undefined}
							size={100}
							align="items-start"
							className="my-12"
						>
							<h4 className="mt-0 mb-2 text-xl font-bold">
								<a href={href}>{headline}</a>
							</h4>
							<div className="[&_a]:text-[color:var(--textLink)]">
								<Body />
							</div>
						</AvatarRow>
					))}

					<p className="text-center text-sm text-[color:var(--textMuted)]">
						See{" "}
						<a
							href={`https://github.com/${author.github}`}
							className="text-inherit underline"
						>
							more on GitHub
						</a>
						.
					</p>
				</section>

				<section className="h-feed mt-20">
					<h2 className="mb-8 border-b border-[color:var(--hr)] pb-2 text-3xl font-bold text-[color:var(--textTitle)]">
						Things I&apos;ve Written
					</h2>

					{posts.map(post => (
						<PostStub key={post.id} {...post} />
					))}
				</section>
			</main>
		</Container>
	);
}
