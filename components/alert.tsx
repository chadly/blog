import type { ReactNode } from "react";
import { InfoCircleIcon, ExclamationCircleIcon } from "./icons";

// Terminal-log severity styles instead of the old bootstrap pastels.
const palettes: Record<string, { label: string; className: string }> = {
	success: { label: "ok", className: "border-l-[color:var(--textLink)]" },
	info: { label: "info", className: "border-l-[color:var(--textLink)]" },
	warning: { label: "warn", className: "border-l-[color:var(--amber)]" },
	danger: { label: "err", className: "border-l-[#ff5a52]" }
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
}) => {
	const palette = palettes[type] ?? palettes.info;

	return (
		<div
			className={`my-6 flex items-start rounded-r border border-l-4 border-[color:var(--grid)] bg-[color:var(--panel)] p-5 ${palette.className} ${className}`}
		>
			{type === "warning" || type === "danger" ? (
				<ExclamationCircleIcon className="mt-1 mr-3 h-6 w-6 shrink-0 fill-current opacity-30" />
			) : (
				<InfoCircleIcon className="mt-1 mr-3 h-6 w-6 shrink-0 fill-current opacity-30" />
			)}
			<div className="[&_a]:font-bold [&>p]:my-0 [&>ul]:mb-0">
				{title ? <strong>{title}</strong> : null}
				{children}
			</div>
		</div>
	);
};

export default Alert;
