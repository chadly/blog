import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { author } from "@/lib/author";
import { SITE_URL } from "@/lib/site";
import ThemeToggle from "@/components/theme-toggle";
import Footer from "@/components/footer";
import "./globals.css";

const plexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-plex-mono"
});

const plexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-plex-sans"
});

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
		<html
			lang="en"
			suppressHydrationWarning
			className={`${plexMono.variable} ${plexSans.variable}`}
		>
			<body className="relative">
				<div hidden dangerouslySetInnerHTML={{ __html: easterEgg }} />
				{/* scanline veil — the CRT glass (dark mode only via --veil) */}
				<div
					aria-hidden="true"
					className="pointer-events-none fixed inset-0 z-50"
					style={{ backgroundImage: "var(--veil)" }}
				/>
				{/* tractor-feed sprocket holes — printout margins, wide screens only */}
				<div
					aria-hidden="true"
					className="sprocket-rail pointer-events-none fixed inset-y-0 left-0 hidden w-10 border-r border-dashed border-[color:var(--grid)] xl:block dark:hidden"
				/>
				<div
					aria-hidden="true"
					className="sprocket-rail pointer-events-none fixed inset-y-0 right-0 hidden w-10 border-l border-dashed border-[color:var(--grid)] xl:block dark:hidden"
				/>
				<ThemeProvider attribute="class" defaultTheme="dark">
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
