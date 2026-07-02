import Link from "next/link";
import { author } from "@/lib/author";

const SiteHeader = () => (
	<header className="text-center">
		<p className="p-title mb-0 text-4xl font-bold">
			<Link href="/" className="text-inherit no-underline">
				{author.name}
			</Link>
		</p>
		<p className="p-subtitle m-0 text-[0.9rem] text-[color:var(--textMuted)]">
			{author.description}
		</p>
	</header>
);

export default SiteHeader;
