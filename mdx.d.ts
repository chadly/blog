declare module "*.mdx" {
	import type { MDXProps } from "mdx/types";
	export default function MDXContent(props: MDXProps): JSX.Element;
}

declare module "*.svg" {
	import type { FC, SVGProps } from "react";
	const content: FC<SVGProps<SVGSVGElement>>;
	export default content;
}
