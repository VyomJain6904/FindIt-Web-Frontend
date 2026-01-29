"use client";

import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchButton } from "@/components/aceternity/searchButton";

export function SearchDomainBox() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
	};
	return (
		<div className="shadow-input mx-auto w-full max-w-md rounded-full p-2 md:rounded-full bg-black">
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
				<SearchButton />
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
