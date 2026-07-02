import Link from "next/link";
import { author } from "@/lib/author";

// The site masthead as a live terminal prompt — the signature element.
const SiteHeader = () => (
	<header className="font-mono">
		<p className="p-title m-0 text-[0.7rem] tracking-[0.2em] text-[color:var(--textMuted)] uppercase">
			chad@chadly.net:~$
		</p>
		<p className="m-0 text-3xl font-bold tracking-tight text-[color:var(--textTitle)] text-glow sm:text-4xl">
			<Link href="/" className="text-inherit no-underline">
				{author.name.toLowerCase().replace(" ", "_")}
			</Link>
			<span
				aria-hidden="true"
				className="animate-crt-cursor ml-1 inline-block h-[0.8em] w-[0.5ch] translate-y-[0.08em] bg-[color:var(--textLink)] align-baseline"
			/>
		</p>
		<p className="p-subtitle m-0 mt-1 text-[0.8rem] text-[color:var(--textMuted)]">
			{author.description.toLowerCase()}
		</p>
	</header>
);

export default SiteHeader;
