import Container from "@/components/container";
import Author from "@/components/author";
import AvatarRow from "@/components/avatar-row";
import PostStub from "@/components/post-stub";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/content/generated/projects";
import { author } from "@/lib/author";

// Section chrome: a real command as the eyebrow — the homepage literally
// lists the operator's work.
const SectionHeading = ({
	command,
	title
}: {
	command: string;
	title: string;
}) => (
	<div className="mb-8 border-b border-[color:var(--grid)] pb-2 font-mono">
		<p className="m-0 text-[0.7rem] tracking-[0.2em] text-[color:var(--textMuted)] uppercase">
			$ {command}
		</p>
		<h2 className="m-0 text-2xl font-bold tracking-tight text-[color:var(--textTitle)]">
			{title}
		</h2>
	</div>
);

export default async function HomePage() {
	const posts = getAllPosts();

	const loadedProjects = await Promise.all(
		projects.map(async p => ({ ...p, Body: (await p.load()).default }))
	);

	return (
		<Container>
			<section className="rounded-md border border-[color:var(--grid)] bg-[color:var(--panel)]">
				<div className="flex items-center justify-between border-b border-[color:var(--grid)] px-4 py-2 font-mono text-[0.7rem] tracking-[0.2em] text-[color:var(--textMuted)] uppercase">
					<span>&gt; whoami</span>
					<span className="flex items-center gap-2">
						<span className="inline-block h-2 w-2 rounded-full bg-[color:var(--textLink)] shadow-[0_0_8px_var(--glow)]" />
						online
					</span>
				</div>
				<div className="p-6 sm:p-8">
					<Author />
				</div>
			</section>

			<main role="main">
				<section className="mt-16">
					<SectionHeading command="ls ~/projects" title="Things I've Built" />

					{loadedProjects.map(({ slug, headline, href, logo, Body }) => (
						<AvatarRow
							key={slug}
							component="article"
							src={logo ?? undefined}
							size={100}
							align="items-start"
							className="my-10"
						>
							<h4 className="mt-0 mb-2 font-mono text-lg font-bold">
								<a href={href} className="no-underline hover:underline">
									{headline}
								</a>
							</h4>
							<div className="[&_a]:text-[color:var(--textLink)]">
								<Body />
							</div>
						</AvatarRow>
					))}

					<p className="text-center font-mono text-[0.75rem] text-[color:var(--textMuted)]">
						see{" "}
						<a
							href={`https://github.com/${author.github}`}
							className="text-inherit underline"
						>
							more on github
						</a>{" "}
						→
					</p>
				</section>

				<section className="h-feed mt-16">
					<SectionHeading command="ls -t ~/posts" title="Things I've Written" />

					{posts.map(post => (
						<PostStub key={post.id} {...post} />
					))}
				</section>
			</main>
		</Container>
	);
}
