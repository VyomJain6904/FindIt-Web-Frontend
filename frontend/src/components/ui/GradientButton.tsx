"use client";

interface GradientButtonProps {
	children: React.ReactNode;
	type?: "button" | "submit";
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	title?: string;
}

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-[#ff79c6] to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-[#ff79c6] to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

export function GradientButton({
	children,
	type = "button",
	disabled = false,
	onClick,
	className = "",
	title,
}: GradientButtonProps) {
	return (
		<button
			className={`group/btn relative block h-10 w-full rounded-xl font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer transition-opacity disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			type={type}
			disabled={disabled}
			onClick={onClick}
			title={title}
		>
			{children}
			{!disabled && <BottomGradient />}
		</button>
	);
}

export { BottomGradient };
