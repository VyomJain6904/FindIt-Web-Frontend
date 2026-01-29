"use client";

import React from "react";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { WavyBackground } from "@/components/aceternity/WavyBackground";
const people = [
	{
		id: 1,
		name: "Vyom Jain",
		designation: "Security Engineer",
		image: "/images/me.jpg",
	},
];

export function Tooltip() {
	return (
		<div className="relative h-[40rem] overflow-hidden flex items-center justify-center w-full -mt-48">
			<WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
				<h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">
					Meet Our Developers
				</h2>
				<div className="flex flex-row items-center justify-center mb-10 w-full">
					<AnimatedTooltip items={people} />
				</div>
			</WavyBackground>
		</div>
	);
}
