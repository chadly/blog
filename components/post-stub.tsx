import Link from "next/link";
import { formatDate } from "@/lib/dates";
import type { PostListItem } from "@/lib/posts";

const PostStub = ({
	title,
	description,
	date,
	url,
	readingTime,
	isExternal
}: PostListItem) => (
	<article className="h-entry mb-9">
		<h4 className="mb-0 font-mono text-lg font-bold tracking-tight">
			{isExternal ? (
				<a href={url} className="u-url p-name no-underline hover:underline">
					{title} <span className="text-[color:var(--textMuted)]">↗</span>
				</a>
			) : (
				<Link href={url} className="u-url p-name no-underline hover:underline">
					{title}
				</Link>
			)}
		</h4>
		<div className="font-mono text-[0.75rem] text-[color:var(--textMuted)]">
			<time dateTime={date} className="dt-published mr-4 inline-block">
				{formatDate(date)}
			</time>
			{readingTime ? (
				<span className="text-[color:var(--amber)]">{readingTime} min read</span>
			) : null}
		</div>
		{description ? <p className="my-1">{description}</p> : null}
	</article>
);

export default PostStub;
