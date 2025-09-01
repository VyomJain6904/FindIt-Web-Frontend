"use client";

import React from "react";

const placeholders = [
	"google.com",
	"example.com",
	"github.com",
	"netflix.com",
	"youtube.com",
];

export default function AnimatedPlaceholderText() {
	const [index, setIndex] = React.useState(0);
	const [visible, setVisible] = React.useState(true);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setVisible(false);
			setTimeout(() => {
				setIndex((prev) => (prev + 1) % placeholders.length);
				setVisible(true);
			}, 300);
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<span
			className={`pointer-events-none absolute left-3 top-0.5 text-lg text-neutral-600 transition-opacity duration-300 ${
				visible ? "opacity-100" : "opacity-0"
			}`}
		>
			{placeholders[index]}
		</span>
	);
}
