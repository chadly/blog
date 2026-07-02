"use client";

import { useEffect, useRef } from "react";

// renders lottie JSON referenced from markdown image syntax (replaces gatsby-remark-lottie)
const Lottie = ({
	animationData,
	label
}: {
	animationData: object;
	label?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let anim: { destroy: () => void } | undefined;
		let cancelled = false;

		import("lottie-web").then(({ default: lottie }) => {
			if (cancelled || !ref.current) return;
			anim = lottie.loadAnimation({
				container: ref.current,
				renderer: "svg",
				loop: true,
				autoplay: true,
				animationData
			});
		});

		return () => {
			cancelled = true;
			anim?.destroy();
		};
	}, [animationData]);

	return <div ref={ref} className="lottie mx-auto" role="img" aria-label={label} />;
};

export default Lottie;
