"use client";

import React, { useEffect } from "react";

function ViewModel() {
	this.doit = function () {
		setTimeout(function () {
			alert("the thing is done!");
		}, 1000);
	};
}

const KnockoutInlineConfirmDemo = () => {
	useEffect(() => {
		// knockout-inline-confirm needs window/jQuery, so only load in the browser
		let bound = false;
		Promise.all([import("knockout"), import("knockout-inline-confirm")]).then(
			([{ default: ko }]) => {
				const el = document.getElementById("knockout-confirm-demo");
				if (el && !el.dataset.bound) {
					el.dataset.bound = "true";
					bound = true;
					ko.applyBindings(new ViewModel(), el);
				}
			}
		);
		return () => {
			if (bound) delete document.getElementById("knockout-confirm-demo")?.dataset.bound;
		};
	}, []);

	return (
		<div id="knockout-confirm-demo" style={{ textAlign: "center" }}>
			<button
				data-bind="inlineConfirm: ['Do the thing', 'Are you sure you want to do the thing?', 'Doing the thing…'], submitFunction: doit"
				className="btn btn-primary"
			></button>
		</div>
	);
};

export default KnockoutInlineConfirmDemo;
