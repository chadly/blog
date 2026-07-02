import type { Metadata } from "next";
import Container from "@/components/container";
import Trogdor from "@/components/trogdor";
import cover from "./trogdor.jpg";

const description =
	"Trogdor was a man. He was a dragon…man. Uh, then he was just a dragon. But he was still Trogdor! Burninating the country side. Burninating the peasants. Burninating all da' peoples and their thatched-roof cottages! And then Trogdor comes in the NIGHT!";

export const metadata: Metadata = {
	title: "Trogdor the Burninator",
	description,
	openGraph: { images: [{ url: cover.src }] },
	twitter: { card: "summary_large_image", images: [cover.src] }
};

export default function TrogdorPage() {
	return (
		<main role="main">
			<Trogdor />

			<Container component="article">
				<div className="prose max-w-none">
					<h1>Ode to Trogdor</h1>

					<p>
						Trogdor was a man. He was a dragon...man. Uh, then he was just a
						dragon. But he was still TROGDOR! TROGDOR! Burninating the country
						side. Burninating the peasants. Burninating all da&apos; peoples and
						their thatched-roof cottages! Thatched-roof cottages! And then
						Trogdor comes in the NIIIIIIIIIIIIIIGHT!
					</p>

					<hr />

					<p>
						Give me a{" "}
						<a href="https://twitter.com/wchadly">follow on Twitter</a> if you
						like content like this. It helps when I can show my wife how many
						internet points I got after spending all day animating Trogdor. 😉
					</p>

					<hr />

					<h3>How It Works</h3>

					<p>
						I made this using After Effects with{" "}
						<a href="http://airbnb.io/lottie/">Bodymovin and Lottie</a>.
					</p>

					<p>
						Check out the{" "}
						<a href="https://github.com/chadly/trogdor">After Effects project</a>{" "}
						on GitHub and see how the{" "}
						<a href="https://github.com/chadly/chadly.net">
							lottie animation files are integrated via React
						</a>{" "}
						onto this page.
					</p>

					<h3>Credits</h3>

					<p>
						Made by <a href="/">Chad Lee</a>.
					</p>

					<p>
						Illustration{" "}
						<a href="https://twitter.com/shortxstack/status/1294449843658731520">
							credit to Whitney Champion
						</a>
						.
					</p>

					<p>
						And of course the{" "}
						<a href="https://youtu.be/90X5NJleYJQ">
							OG Trogdor by Homestar Runner
						</a>
						.
					</p>
				</div>
			</Container>
		</main>
	);
}
