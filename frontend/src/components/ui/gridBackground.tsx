import { cn } from "@/lib/utils";
import React from "react";
import { MovingCards } from "@/components/movingCards";

export function GridBackground() {
	return (
		<div className="relative flex h-full w-full items-center justify-center bg-black mt-40">
			<div
				className={cn(
					"absolute inset-0",
					"[background-size:40px_40px]",
					"[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
				)}
			/>
			{/* Radial gradient for the container to give a faded look */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-black"></div>

			{/* Content layer with heading and moving cards */}
			<div className="relative z-10 flex flex-col items-center justify-center w-full">
				<h2 className="text-3xl font-bold text-center mb-4 text-white">
					Hear our Work: Voices of Success
				</h2>
				<MovingCards />
			</div>
		</div>
	);
}
