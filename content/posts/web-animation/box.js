import React from "react";

export const Box = ({ children, bg }) => (
	<div
		className={`my-6 flex flex-wrap justify-around [&_.lottie]:w-3/4 max-sm:[&_.lottie]:w-full ${
			bg ? "[&_.lottie_svg]:bg-black" : ""
		}`}
	>
		{children}
	</div>
);

export const FlexBox = ({ children, bg }) => (
	<div
		className={`my-6 flex flex-wrap items-center justify-between [&_.lottie]:w-[45%] [&_p]:w-[45%] max-sm:[&_p]:w-full ${
			bg ? "[&_.lottie_svg]:bg-black" : ""
		}`}
	>
		{children}
	</div>
);
