"use client";

import { usePathname } from "next/navigation";

const Footer = ({ name }: { name: string }) => {
	// trogdor is CC-licensed; everything else is all-rights-reserved
	const cc = usePathname().replace(/\/$/, "") === "/trogdor";

	return (
		<footer
			className="mt-8 pb-8 text-center font-mono text-[0.7rem] text-[color:var(--textMuted)]"
			title="Copyright"
		>
			{cc ? (
				<>
					licensed as{" "}
					<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						attribution-noncommercial-sharealike 4.0
					</a>
				</>
			) : (
				<>
					© {name.toLowerCase()} {new Date().getFullYear()} — all rights
					reserved
				</>
			)}{" "}
			· eof
		</footer>
	);
};

export default Footer;
