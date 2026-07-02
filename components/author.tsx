import type { ReactNode } from "react";
import AvatarRow from "./avatar-row";
import AuthorSocial from "./social";
import { author } from "@/lib/author";
import { SITE_URL } from "@/lib/site";
import Bio from "@/content/author/chad.mdx";

const Author = ({
	small,
	children,
	className = ""
}: {
	small?: boolean;
	children?: ReactNode;
	className?: string;
}) => {
	const H = small ? "p" : "h1";

	return (
		<AvatarRow
			component="section"
			className={`p-author h-card ${small ? "text-[0.9rem]" : ""} ${className}`}
			src={author.avatar}
			size={small ? 130 : 175}
			imgClassName="u-photo"
			alt={author.name}
		>
			<H
				className={`my-1 border-none font-bold ${small ? "text-[1.1rem]" : "text-3xl"}`}
			>
				{children}
				<a
					href={SITE_URL}
					className="u-url p-name text-[color:var(--textNormal)] no-underline"
				>
					{author.name}
				</a>
			</H>
			<div className="p-note [&_p]:mb-0 [&_a]:text-[color:var(--textLink)]">
				<Bio />
			</div>
			<AuthorSocial className="mt-3" />
		</AvatarRow>
	);
};

export default Author;
