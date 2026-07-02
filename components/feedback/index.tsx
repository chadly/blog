import Comments from "./comments";
import FaceWall from "./facewall";
import {
	TwitterIcon,
	ReplyIcon,
	RetweetIcon,
	HeartIcon
} from "@/components/icons";
import type { Feedback as FeedbackData } from "@/lib/feedback";

const TwitterIntents = ({ twitterId }: { twitterId: string | null }) => {
	if (!twitterId) return null;

	const intents = [
		{ label: "Reply", href: `https://twitter.com/intent/tweet?in_reply_to=${twitterId}`, Icon: ReplyIcon },
		{ label: "Repost", href: `https://twitter.com/intent/retweet?tweet_id=${twitterId}`, Icon: RetweetIcon },
		{ label: "Like", href: `https://twitter.com/intent/favorite?tweet_id=${twitterId}`, Icon: HeartIcon }
	];

	return (
		<ul className="m-0 list-none p-0 text-right text-sm">
			<li className="mx-1 inline-block text-[#1c9ceb]" title="Twitter">
				<TwitterIcon />
			</li>
			{intents.map(({ label, href, Icon }) => (
				<li key={label} className="mx-1 inline-block">
					<a href={href} target="_blank" rel="noopener noreferrer">
						<Icon /> {label}
					</a>
				</li>
			))}
		</ul>
	);
};

const Faces = ({
	faces,
	noun,
	className = ""
}: {
	faces: FeedbackData["likes"];
	noun: string;
	className?: string;
}) => {
	if (!faces.length) return null;

	return (
		<div className={className}>
			<p className="mb-4">
				<strong>
					{faces.length} {noun}
					{faces.length !== 1 ? "s" : ""}
				</strong>
			</p>
			<FaceWall faces={faces} />
		</div>
	);
};

const Feedback = ({
	feedback,
	twitterId
}: {
	feedback: FeedbackData;
	twitterId: string | null;
}) => {
	const { comments, totalCount, likes, reposts } = feedback;
	const any = likes.length || comments.length || reposts.length;

	return (
		<section className="border-b border-[color:var(--hr)] pb-6">
			<div className="mb-6">
				<p className="m-0 text-center text-2xl font-bold">
					{!any ? "Send me a Webmention" : "Webmentions"}
				</p>
				<p className="m-0 text-center">
					<a
						href="https://indieweb.org/Webmention"
						className="text-sm text-[color:var(--textMuted)] underline"
					>
						What is this?
					</a>
				</p>
			</div>

			<TwitterIntents twitterId={twitterId} />

			<Faces faces={likes} noun="Like" className="mt-6" />
			<Faces faces={reposts} noun="Repost" className="mt-6" />
			<Comments comments={comments} totalCount={totalCount} className="mt-6" />
		</section>
	);
};

export default Feedback;
