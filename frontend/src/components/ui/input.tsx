"use client";

import AnimatedPlaceholderText from "@/components/custom/AnimatedPlaceholderText";
import { cn } from "@/lib/utils";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	useAnimatedPlaceholder?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, useAnimatedPlaceholder, ...props }, ref) => {
		const [inputValue, setInputValue] = React.useState("");
		const radius = 100;
		const [visible, setVisible] = React.useState(false);
		const mouseX = useMotionValue(0);
		const mouseY = useMotionValue(0);

		function handleMouseMove({ currentTarget, clientX, clientY }: any) {
			const { left, top } = currentTarget.getBoundingClientRect();
			mouseX.set(clientX - left);
			mouseY.set(clientY - top);
		}

		return (
			<motion.div
				style={{
					background: useMotionTemplate`
						radial-gradient(
							${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
							#FF79C6,
							transparent 80%
						)
					`,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className="group/input relative rounded-xl p-[2px] transition duration-300"
			>
				{useAnimatedPlaceholder && !inputValue && (
					<span className="pointer-events-none absolute left-3 top-1 text-lg text-neutral-600">
						<AnimatedPlaceholderText />
					</span>
				)}

				<input
					type={type}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						props.onChange?.(e);
					}}
					className={cn(
						`shadow-input placeholder:text-zinc-400
                        flex h-10 w-full rounded-xl border-none
                        px-3 py-2 text-lg transition duration-400
                        group-hover/input:shadow-none
                        file:border-0 file:bg-transparent file:text-lg file:font-medium
                        focus-visible:ring-[2px] focus-visible:outline-none
                        disabled:cursor-not-allowed disabled:opacity-50
                        bg-zinc-900 text-gray-100
                        dark:shadow-[0px_0px_2px_1px_rgba(255,121,198,0.25)]
                        focus-visible:ring-[#FF79C6]`,
						className,
					)}
					ref={ref}
					placeholder="" // keep empty
					{...props}
				/>
			</motion.div>
		);
	},
);
