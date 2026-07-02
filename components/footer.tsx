"use client";

import { usePathname } from "next/navigation";

const Footer = ({ name }: { name: string }) => {
	// trogdor is CC-licensed; everything else is all-rights-reserved
	const cc = usePathname().replace(/\/$/, "") === "/trogdor";

	return (
		<footer className="mt-8 pb-8 text-center text-sm" title="Copyright">
			{cc ? (
				<>
					Licensed as{" "}
					<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
						Attribution-NonCommercial-ShareAlike 4.0 International
					</a>
				</>
			) : (
				<>
					© {name} {new Date().getFullYear()}. All rights reserved.
				</>
			)}
		</footer>
	);
};

export default Footer;
