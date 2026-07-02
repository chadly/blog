import type { CSSProperties, ReactNode } from "react";
import { InfoCircleIcon, ExclamationCircleIcon } from "./icons";

const palettes: Record<string, CSSProperties> = {
	success: { color: "#3c763d", backgroundColor: "#dff0d8", borderColor: "#d6e9c6" },
	info: { color: "#31708f", backgroundColor: "#d9edf7", borderColor: "#bce8f1" },
	warning: { color: "#8a6d3b", backgroundColor: "#fcf8e3", borderColor: "#faebcc" },
	danger: { color: "#a94442", backgroundColor: "#f2dede", borderColor: "#ebccd1" }
};

const Alert = ({
	type = "info",
	title,
	children,
	className = ""
}: {
	type?: keyof typeof palettes;
	title?: string;
	children: ReactNode;
	className?: string;
}) => (
	<div
		className={`my-6 flex items-start rounded border p-6 ${className}`}
		style={palettes[type] ?? palettes.info}
	>
		{type === "info" ? (
			<InfoCircleIcon className="mr-3 h-8 w-8 shrink-0 fill-current opacity-20" />
		) : type === "warning" ? (
			<ExclamationCircleIcon className="mr-3 h-8 w-8 shrink-0 fill-current opacity-20" />
		) : null}
		<div className="[&_a]:font-bold [&_a]:text-inherit [&>p]:my-0 [&>ul]:mb-0">
			{title ? <strong>{title}</strong> : null}
			{children}
		</div>
	</div>
);

export default Alert;
