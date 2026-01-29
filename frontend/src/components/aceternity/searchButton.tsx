"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/aceternity/MovingBorder";

export function SearchButton() {
	return (
		<div className="w-full flex items-center justify-center ">
			{/* TODO: To Add the Backend API */}
			<Link href="/scan">
				<Button
					onClick={() => console.log("Search button clicked")}
					borderRadius="20rem"
					className="bg-black text-white text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-2 hover:bg-[#FF79C6]/20 transition-colors duration-200 cursor-pointer"
				>
					Search Domain
				</Button>
			</Link>
		</div>
	);
}
