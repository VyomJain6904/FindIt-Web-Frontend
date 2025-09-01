"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function SearchDomainBox() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
	};
	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-xl p-2 md:rounded-2xl bg-black">
			<form className="my-4" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4 text-xl text-white">
					<Label htmlFor="domain" className="text-center text-xl">
						Search Domain
					</Label>
					<Input
						id="domain"
						useAnimatedPlaceholder={true}
						type="domain"
					/>
				</LabelInputContainer>
			</form>
		</div>
	);
}

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex w-full flex-col space-y-2", className)}>
			{children}
		</div>
	);
};
