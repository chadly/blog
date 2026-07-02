import { formatDateTime, timeAgo } from "@/lib/dates";
import type { Comment } from "@/lib/feedback";

const CommentList = ({ comments }: { comments: Comment[] }) => (
	<ol className="m-0 list-none p-0">
		{comments.map(c => (
			<li key={c.id} className="mb-9 block">
				{c.author.photo ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={c.author.photo}
						alt={c.author.name}
						className="float-left h-12 w-12 rounded-full bg-[#e3e9ed] object-cover shadow-[0_0_0_6px_hsla(0,0%,100%,.1)]"
					/>
				) : (
					<div className="float-left h-12 w-12 rounded-full bg-[#e3e9ed]" />
				)}
				<div className="ml-18">
					<span className="mr-2 inline-block">
						<strong>
							{c.url ? (
								<a href={c.url}>{c.author.name}</a>
							) : c.author.url ? (
								<a href={c.author.url}>{c.author.name}</a>
							) : (
								c.author.name
							)}
						</strong>
					</span>
					<time
						dateTime={c.date}
						title={formatDateTime(c.date)}
						className="text-sm text-[color:var(--textMuted)]"
					>
						{timeAgo(c.date)}
					</time>
					<div
						className="[&_a]:text-[color:var(--textLink)] [&_p]:my-2"
						dangerouslySetInnerHTML={{ __html: c.message }}
					/>
					{c.comments?.length ? <CommentList comments={c.comments} /> : null}
				</div>
			</li>
		))}
	</ol>
);

const Comments = ({
	comments,
	totalCount,
	className = ""
}: {
	comments: Comment[];
	totalCount: number;
	className?: string;
}) => {
	if (!comments.length) return null;

	return (
		<div className={className}>
			<p className="mb-4">
				<strong>
					{totalCount} Comment{totalCount !== 1 ? "s" : ""}
				</strong>
			</p>
			<CommentList comments={comments} />
		</div>
	);
};

export default Comments;
