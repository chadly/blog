"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Switches medium, not mood: green-phosphor screen ↔ paper printout.
const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const dark = !mounted || resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(dark ? "light" : "dark")}
			title={dark ? "Print it out" : "Back to the terminal"}
			className="float-right cursor-pointer px-5 py-3 font-mono text-[0.7rem] tracking-[0.15em] text-[color:var(--textMuted)] uppercase hover:text-[color:var(--textLink)]"
		>
			display: [{dark ? "crt" : "paper"}]
		</button>
	);
};

export default ThemeToggle;
