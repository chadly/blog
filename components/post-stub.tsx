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
	<article className="h-entry mb-10">
		<h4 className="mb-0 text-xl font-bold">
			{isExternal ? (
				<a href={url} className="u-url p-name">
					{title}
				</a>
			) : (
				<Link href={url} className="u-url p-name">
					{title}
				</Link>
			)}
		</h4>
		<div className="text-sm text-[color:var(--textMuted)]">
			<time dateTime={date} className="dt-published mr-4 inline-block">
				{formatDate(date)}
			</time>
			{readingTime ? <span>{readingTime} min read</span> : null}
		</div>
		{description ? <p className="my-1">{description}</p> : null}
	</article>
);

export default PostStub;
