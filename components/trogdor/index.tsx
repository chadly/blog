"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import lottie, { type AnimationItem } from "lottie-web";

import BurninateData from "./burninate.json";
import RestingData from "./resting.json";

const track = (event: string) => {
	const w = window as { plausible?: (e: string) => void };
	w.plausible?.(event);
};

const Animation = ({
	data,
	loop,
	play,
	onComplete
}: {
	data: object;
	loop: boolean;
	play: boolean;
	onComplete?: () => void;
}) => {
	const container = useRef<HTMLDivElement>(null);
	const anim = useRef<AnimationItem | null>(null);

	useEffect(() => {
		anim.current = lottie.loadAnimation({
			container: container.current!,
			renderer: "svg",
			loop,
			autoplay: false,
			animationData: data
		});

		if (onComplete) {
			anim.current.addEventListener("complete", onComplete);
		}

		return () => anim.current?.destroy();
	}, [data, loop, onComplete]);

	useEffect(() => {
		if (play) {
			anim.current?.play();
		} else {
			anim.current?.stop();
		}
	}, [play]);

	return <div style={{ display: play ? "block" : "none" }} ref={container} />;
};

const Trogdor = () => {
	const [isBurninating, setIsBurninating] = useState(false);
	const yell = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (isBurninating) {
			yell.current?.play();
		}
	}, [isBurninating]);

	const burninate = useCallback(() => {
		setIsBurninating(true);
		track("Burninate");
	}, []);

	const onComplete = useCallback(() => setIsBurninating(false), []);

	return (
		<section>
			<audio preload="auto" src="/trogdor.mp3" ref={yell} />
			<Animation data={RestingData} loop play={!isBurninating} />
			<Animation
				data={BurninateData}
				loop={false}
				play={isBurninating}
				onComplete={onComplete}
			/>
			<div className="my-12 text-center">
				<button
					onClick={burninate}
					disabled={isBurninating}
					className="inline-block cursor-pointer rounded-md border border-[#d02718] bg-[#f24537] bg-linear-to-b from-[#f24537] to-[#c62d1f] px-3 py-6 text-3xl font-bold text-white shadow-[inset_0px_1px_0px_0px_#f5978e] [text-shadow:0px_1px_0px_#810e05] hover:from-[#c62d1f] hover:to-[#f24537]"
				>
					{!isBurninating ? <>🔥 Burninate 🔥</> : <>🔥🔥🔥🔥🔥🔥</>}
				</button>
			</div>
		</section>
	);
};

export default Trogdor;
