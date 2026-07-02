import type { ElementType, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";

const AvatarRow = ({
	component: Component = "div",
	src,
	alt = "",
	size = 100,
	align = "items-center",
	className = "",
	imgClassName = "",
	children
}: {
	component?: ElementType;
	src?: StaticImageData | string;
	alt?: string;
	size?: number;
	align?: string;
	className?: string;
	imgClassName?: string;
	children: ReactNode;
}) => (
	<Component
		className={`flex max-sm:block max-sm:text-center ${align} ${className}`}
	>
		{src ? (
			<div className="mr-6 shrink-0 max-sm:mx-auto max-sm:my-3 max-sm:w-fit">
				<Image
					src={src}
					alt={alt}
					width={size}
					height={size}
					className={`rounded-full object-cover shadow-[0_0_0_6px_var(--glow)] ${imgClassName}`}
				/>
			</div>
		) : null}
		<div className="min-w-0 flex-1">{children}</div>
	</Component>
);

export default AvatarRow;
