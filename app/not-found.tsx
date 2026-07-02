import Link from "next/link";
import Image from "next/image";
import Container from "@/components/container";
import SiteHeader from "@/components/site-header";
import img404 from "./oatmeal-tumbeast-404.png";

export default function NotFound() {
	return (
		<Container>
			<SiteHeader />
			<main role="main">
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
