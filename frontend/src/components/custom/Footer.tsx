"use client";
import React from "react";
import Link from "next/link";

import { IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";

const footerLinks = {
	pages: [
		{ label: "Pricing", href: "/pricing" },
		{ label: "Blog", href: "/blog" },
	],
	socials: [
		{
			label: "Twitter",
			href: "https://x.com/VyomJain6904",
			icon: IconBrandX,
		},
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/vyom-jain/",
			icon: IconBrandLinkedin,
		},
	],
	register: [
		{ label: "Sign Up", href: "/register" },
		{ label: "Login", href: "/login" },
	],
};

export function Footer() {
	return (
		<footer className="relative w-full bg-[#000000] overflow-hidden">
			{/* Main Footer Content */}
			<div className="max-w-6xl mx-auto px-8 pt-16 pb-8">
				<div className="flex flex-col md:flex-row justify-between gap-8">
					{/* Logo and Copyright - Left Side */}
					<div className="flex-shrink-0">
						<div className="flex items-center gap-2 mb-2">
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
							<span className="text-white font-medium text-base">
								FindIt
							</span>
						</div>
						<p className="text-[#555555] text-xs">
							© copyright FindIt 2026. All rights reserved.
						</p>
					</div>

					{/* Link Columns - Right Side */}
					<div className="flex flex-wrap gap-16 md:gap-20">
						{/* Pages Column */}
						<div>
							<h4 className="text-white font-medium text-sm mb-4">
								Pages
							</h4>
							<ul className="space-y-2">
								{footerLinks.pages.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-[#555555] hover:text-white text-xs transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Socials Column */}
						<div>
							<h4 className="text-white font-medium text-sm mb-4">
								Socials
							</h4>
							<ul className="flex items-center gap-4">
								{footerLinks.socials.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-[#555555] hover:text-white transition-colors block"
										>
											<link.icon className="w-5 h-5" />
											<span className="sr-only">
												{link.label}
											</span>
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Register Column */}
						<div>
							<h4 className="text-white font-medium text-sm mb-4">
								Register
							</h4>
							<ul className="space-y-2">
								{footerLinks.register.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-[#555555] hover:text-white text-xs transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Large Watermark Text */}
			<div className="relative w-full overflow-hidden pb-4">
				<div
					className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-bold leading-none text-center select-none whitespace-nowrap"
					style={{
						letterSpacing: "-0.02em",
						background:
							"linear-gradient(to top, #ff79c6 0%, #ff79c640 40%, transparent 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}
				>
					FindIt
				</div>
			</div>
		</footer>
	);
}

export default Footer;
