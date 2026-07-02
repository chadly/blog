import type { ElementType, ReactNode } from "react";

const Container = ({
	component: Component = "div",
	children
}: {
	component?: ElementType;
	children: ReactNode;
}) => (
	<Component className="mx-auto max-w-3xl px-4 py-10">{children}</Component>
);

export default Container;
