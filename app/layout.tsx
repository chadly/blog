import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import { author } from "@/lib/author";
import { SITE_URL } from "@/lib/site";
import ThemeToggle from "@/components/theme-toggle";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: `${author.name} | ${author.description}`,
	description: author.description,
	alternates: {
		types: { "application/rss+xml": "/rss.xml" }
	}
};

const easterEgg = `
<!-----------------------------------------------------------------------
					Oh, well hello, fellow developer

You have found the super secret source code to this site. Venture deeper
if you dare. Beware the 🐉 though. He lives deep within the nested divs.

Honestly, if you really want to see the source for this site, check it out
on GitHub: https://github.com/chadly/chadly.net. It's OSS and all this HTML/JS
is optimized and not that readable.
------------------------------------------------------------------------>`;

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<div hidden dangerouslySetInnerHTML={{ __html: easterEgg }} />
				<ThemeProvider attribute="class" defaultTheme="light">
					<ThemeToggle />
					{children}
					<Footer name={author.name} />
				</ThemeProvider>
				{process.env.VERCEL_ENV === "production" ? (
					<Script
						defer
						data-domain="chadly.net"
						src="https://stats.chadly.net/js/script.js"
					/>
				) : null}
			</body>
		</html>
	);
}
