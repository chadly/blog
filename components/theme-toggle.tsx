"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<label className="float-right block cursor-pointer px-5 py-2">
			<input
				type="checkbox"
				className="hidden"
				onChange={e => setTheme(e.target.checked ? "dark" : "light")}
				checked={mounted && resolvedTheme === "dark"}
			/>{" "}
			{!mounted || resolvedTheme === "light" ? (
				<span title="Turn to the dark side">☀️</span>
			) : (
				<span title="Turn to the light">🌙</span>
			)}
		</label>
	);
};

export default ThemeToggle;
