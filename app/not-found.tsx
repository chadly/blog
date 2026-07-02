import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import SiteHeader from "@/components/site-header";
import img404 from "./oatmeal-tumbeast-404.png";

export default function NotFound() {
	return (
		<Container>
			<SiteHeader />
			<main role="main" className="mt-10">
				<div className="rounded-md border border-[color:var(--grid)] bg-[color:var(--panel)] p-6 font-mono text-sm">
					<p className="m-0 text-[color:var(--textMuted)]">
						$ cat {"<that page>"}
					</p>
					<p className="m-0 mt-1 text-[color:var(--textTitle)]">
						cat: no such file or directory{" "}
						<span className="text-[#ff5a52]">[404]</span>
					</p>
					<p className="m-0 mt-4 text-[color:var(--textMuted)]">
						try:{" "}
						<Link href="/" className="underline">
							cd ~
						</Link>
					</p>
				</div>
				<Link href="/">
					<Image
						src={img404}
						alt="404 Page Not Found"
						title="Go to the front page →"
						className="mx-auto my-12 block"
					/>
				</Link>
			</main>
		</Container>
	);
}
