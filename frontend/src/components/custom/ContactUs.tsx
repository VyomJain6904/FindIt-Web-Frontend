"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import WorldMap from "@/components/custom/map";

export function ContactUs() {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Contact form submitted");
	};

	return (
		<section id="contact" className="w-full bg-black py-16 px-4 md:px-8">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
					{/* Left Side - Contact Info */}
					<div className="flex flex-col">
						{/* Email Icon */}
						<div className="w-12 h-12 bg-[#1a1a2e] rounded-xl flex items-center justify-center mb-8">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="text-[#ff79c6]"
							>
								<path
									d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M22 6L12 13L2 6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>

						{/* Heading */}
						<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Contact me
						</h2>

						{/* Description */}
						<p className="text-[#888888] text-base mb-6 max-w-md">
							I am always looking for ways to improve my skills
							and knowledge. Contact me and let me know how we can
							help you.
						</p>

						{/* Contact Info Row */}
						<div className="flex flex-wrap items-center gap-2 text-[#888888] text-sm mb-10">
							<span>contact@findit.ai</span>
							<span className="text-[#444444]">•</span>
							<span>+1 (OOO) ZZZ XXYY</span>
							<span className="text-[#444444]">•</span>
							<span>support@findit.ai</span>
						</div>

						{/* World Map with Marker */}
						<div className="relative w-full max-w-md mt-4">
							{/* World Map */}
							<WorldMap />

							{/* "I am here" Marker - positioned over India */}
							<div
								className="absolute"
								style={{ left: "62%", top: "12%" }}
							>
								<div className="flex flex-col items-center">
									{/* Label */}
									<div className="bg-[#1a1a2e] px-3 py-1.5 rounded-md mb-1 shadow-lg">
										<span className="text-white text-xs font-medium whitespace-nowrap">
											I am here
										</span>
									</div>
									{/* Pointer Line */}
									<div className="w-0.5 h-10 bg-gradient-to-b from-[#ff79c6] to-transparent" />
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Contact Form */}
					<div className="bg-[#111115] rounded-2xl p-6 md:p-8">
						<form onSubmit={handleSubmit} className="space-y-5">
							{/* Full Name */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Full name
								</label>
								<Input type="text" placeholder="Vyom Jain" />
							</div>

							{/* Email Address */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Email Address
								</label>
								<Input
									type="email"
									placeholder="support@findit.com"
								/>
							</div>

							{/* Company */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Company
								</label>
								<Input type="text" placeholder="FindIt" />
							</div>

							{/* Message */}
							<div>
								<label className="block text-white text-sm font-medium mb-2">
									Message
								</label>
								<textarea
									placeholder="Type your message here"
									rows={4}
									className="w-full bg-[#1a1a1f] border border-[#2a2a35] rounded-lg px-4 py-3 text-white placeholder-[#555555] text-sm focus:outline-none focus:border-[#3a3a45] transition-colors resize-none"
								/>
							</div>

							{/* Submit Button */}
							<button
								className="group/btn relative block h-10 w-full rounded-xl font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
								type="submit"
							>
								Submit &rarr;
								<BottomGradient />
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#ff79c6] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#ff79c6] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

export default ContactUs;
