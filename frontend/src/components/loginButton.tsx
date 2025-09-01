"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/moving-border";

export function LoginButton() {
	return (
		<div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6 flex items-center space-x-2">
			{/* TODO: API for Authentication and Authorization */}
			<Link href="/">
				<Button
					onClick={() => console.log("Login button clicked")}
					borderRadius="10rem"
					className="bg-black text-white text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-2 hover:bg-yellow-500/50 transition-colors duration-200 cursor-pointer"
				>
					Login
				</Button>
			</Link>
		</div>
	);
}
