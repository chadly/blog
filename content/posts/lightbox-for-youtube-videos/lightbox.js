"use client";

import React, { useEffect } from "react";
import "./fancy.css";

const Lightbox = ({ href, children }) => {
	useEffect(() => {
		import("./fancy.js");
	}, []);

	return (
		<a href={href} rel="fancyvideo">
			{children}
		</a>
	);
};

export default Lightbox;
