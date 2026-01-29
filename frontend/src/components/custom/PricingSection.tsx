"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/aceternity/MovingBorder";

import { type BillingPeriod, plans } from "@/lib/data/pricing";

export function PricingSection() {
	const [billingPeriod, setBillingPeriod] =
		useState<BillingPeriod>("monthly");

	return (
		<section className="w-full py-20 bg-black">
			{/* Header */}
			<div className="text-center mb-12">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-3xl md:text-4xl font-bold text-white mb-4"
				>
					Choose the plan that suits your needs
				</motion.h2>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className="text-sm text-gray-400 max-w-2xl mx-auto px-4"
				>
					Pick a plan that suits your needs and get started instantly.
				</motion.p>

				{/* Billing Toggle */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="mt-8 flex items-center justify-center"
				>
					<div className="relative inline-flex items-center bg-[#1a1a1a] rounded-full p-1">
						{/* Animated background indicator */}
						<motion.div
							className="absolute top-1 bottom-1 bg-[#ff79c6] rounded-full"
							initial={false}
							animate={{
								left: billingPeriod === "monthly" ? 4 : "50%",
								right: billingPeriod === "monthly" ? "50%" : 4,
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 30,
							}}
						/>
						<button
							onClick={() => setBillingPeriod("monthly")}
							className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
								billingPeriod === "monthly"
									? "text-white"
									: "text-gray-400 hover:text-white"
							}`}
						>
							Monthly
						</button>
						<button
							onClick={() => setBillingPeriod("yearly")}
							className={`relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
								billingPeriod === "yearly"
									? "text-white"
									: "text-gray-400 hover:text-white"
							}`}
						>
							Yearly
						</button>
					</div>
				</motion.div>
			</div>

			{/* Divider */}
			<div className="max-w-6xl mx-auto px-4">
				<div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-16" />
			</div>

			{/* Pricing Cards */}
			<div className="max-w-6xl mx-auto px-4">
				<div className="grid md:grid-cols-3 gap-0">
					{plans.map((plan, index) => {
						const price =
							billingPeriod === "monthly"
								? plan.monthlyPrice
								: plan.yearlyPrice;

						return (
							<motion.div
								key={plan.name}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0.1 * index }}
								className={`relative p-8 ${
									plan.highlighted
										? "bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#0d0d1a] border-x border-t border-b border-pink-900/30"
										: "bg-[#0a0a0a] border-t border-b border-gray-800/50"
								} ${index === 0 ? "md:rounded-l-xl border-l" : ""} ${
									index === 2
										? "md:rounded-r-xl border-r"
										: ""
								}`}
							>
								{/* Pink glow effect for highlighted card */}
								{plan.highlighted && (
									<div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-purple-200/5 to-transparent rounded-xl pointer-events-none" />
								)}

								<div className="relative z-10 flex flex-col h-full">
									<h3 className="text-lg font-semibold text-white mb-2">
										{plan.name}
									</h3>

									<div className="mb-2 h-12 flex items-center">
										<AnimatePresence mode="wait">
											{price !== null ? (
												<motion.div
													key={`${plan.name}-${billingPeriod}`}
													initial={{
														opacity: 0,
														y: -10,
													}}
													animate={{
														opacity: 1,
														y: 0,
													}}
													exit={{ opacity: 0, y: 10 }}
													transition={{
														duration: 0.2,
													}}
													className="flex items-baseline"
												>
													<span className="text-4xl font-bold text-white">
														${price}
													</span>
													<span className="text-gray-400 text-lg ml-1">
														/
														{billingPeriod ===
														"monthly"
															? "mo"
															: "yr"}
													</span>
												</motion.div>
											) : (
												<motion.span
													key="contact"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="text-3xl font-bold text-white"
												>
													Contact Us
												</motion.span>
											)}
										</AnimatePresence>
									</div>

									<p className="text-gray-500 text-sm mb-8">
										{plan.description}
									</p>

									<div className="space-y-4 mb-8 flex-1">
										{plan.features.map((feature) => (
											<div
												key={feature}
												className="flex items-start gap-3"
											>
												<div
													className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
														plan.highlighted
															? "bg-blue-500/20"
															: "bg-gray-700/50"
													}`}
												>
													<Check
														className={`w-3 h-3 ${
															plan.highlighted
																? "text-blue-400"
																: "text-gray-400"
														}`}
													/>
												</div>
												<span className="text-gray-300 text-sm">
													{feature}
												</span>
											</div>
										))}
									</div>

									<Button
										variant={
											plan.highlighted
												? "default"
												: "secondary"
										}
										size="lg"
										className="bg-black text-white text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-2 hover:bg-[#FF79C6]/20 transition-colors duration-200 cursor-pointer mt-auto"
									>
										{plan.cta}
									</Button>
								</div>
							</motion.div>
						);
					})}
				</div>
			</div>

			{/* View all plans link */}
			<div className="text-center mt-12">
				<Link
					href="/pricing"
					className="text-[#ff79c6] hover:text-[#ff9bd4] text-sm font-medium transition-colors"
				>
					View all pricing details →
				</Link>
			</div>
		</section>
	);
}
