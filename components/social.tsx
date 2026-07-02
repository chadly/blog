import type { ReactNode } from "react";
import {
	TwitterIcon,
	GitHubIcon,
	StackOverflowIcon,
	KeybaseIcon,
	LinkedInIcon,
	RssIcon
} from "./icons";
import { author } from "@/lib/author";

const SocialLink = ({
	name,
	href,
	className = "",
	children
}: {
	name: string;
	href: string;
	className?: string;
	children: ReactNode;
}) => (
	<li className="inline">
		<a title={name} href={href} rel="me" className={`no-underline ${className}`}>
			{children}
		</a>
	</li>
);

const AuthorSocial = ({ className = "" }: { className?: string }) => (
	<ul className={`m-0 list-none space-x-3 p-0 ${className}`}>
		<SocialLink name="Twitter" href={`https://twitter.com/${author.twitter}`}>
			<TwitterIcon />
		</SocialLink>
		<SocialLink name="GitHub" href={`https://github.com/${author.github}`}>
			<GitHubIcon />
		</SocialLink>
		<SocialLink
			name="Stack Overflow"
			href={`https://stackoverflow.com/users/${author.stackOverflow}`}
		>
			<StackOverflowIcon />
		</SocialLink>
		<SocialLink name="Keybase" href={`https://keybase.io/${author.keybase}`}>
			<KeybaseIcon />
		</SocialLink>
		<SocialLink
			name="LinkedIn"
			href={`https://www.linkedin.com/in/${author.linkedin}/`}
		>
			<LinkedInIcon />
		</SocialLink>
		<SocialLink name="RSS" href="/rss.xml" className="text-[rgb(247,131,34)]">
			<RssIcon />
		</SocialLink>
	</ul>
);

export default AuthorSocial;
