"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	NavbarButton,
} from "@/components/ui/resizable-navbar";

export function ResizableNavbar({
	hasBanner = false,
}: {
	hasBanner?: boolean;
}) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navItems = [
		{ name: "Home", link: "/" },
		{ name: "Pricing", link: "/pricing" },
		{ name: "Features", link: "/#features" },
		{ name: "Contact", link: "/#contact" },
	];

	return (
		<Navbar hasBanner={hasBanner}>
			{/* Desktop Navigation */}
			<NavBody>
				{/* Logo */}
				<Link
					href="/"
					className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-white"
					>
						<path
							d="M12 2L2 7L12 12L22 7L12 2Z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2 17L12 22L22 17"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M2 12L12 17L22 12"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="font-medium text-white">FindIt</span>
				</Link>

				{/* Nav Items */}
				<NavItems items={navItems} />

				{/* Desktop Buttons */}
				<div className="flex items-center gap-4">
					<NavbarButton href="/login" variant="secondary">
						Login
					</NavbarButton>
					<NavbarButton href="/register" variant="gradient">
						Get Started
					</NavbarButton>
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					{/* Mobile Logo */}
					<Link
						href="/"
						className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="text-white"
						>
							<path
								d="M12 2L2 7L12 12L22 7L12 2Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M2 17L12 22L22 17"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M2 12L12 17L22 12"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span className="font-medium text-white">FindIt</span>
					</Link>

					{/* Mobile Menu Toggle */}
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				{/* Mobile Menu */}
				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					{navItems.map((item, idx) => (
						<Link
							key={`mobile-link-${idx}`}
							href={item.link}
							className="relative text-neutral-600 dark:text-neutral-300"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
					<div className="flex w-full flex-col gap-4 mt-4">
						<NavbarButton
							href="/login"
							variant="secondary"
							className="w-full"
						>
							Login
						</NavbarButton>
						<NavbarButton
							href="/register"
							variant="gradient"
							className="w-full"
						>
							Get Started
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}
