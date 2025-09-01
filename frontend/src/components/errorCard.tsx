import React from "react";
import { CustomErrorCard, Icon } from "@/components/ui/customError";

export function ErrorCard() {
	return (
		<div className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
			<Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

			<CustomErrorCard text="Error" />
		</div>
	);
}
