"use client";

import { Play, Loader2 } from "lucide-react";
import { isDemoMode } from "@/lib/demo";
import { GradientButton } from "@/components/ui/GradientButton";

interface StartScanButtonProps {
	disabled: boolean;
	loading?: boolean;
	onClick: () => void;
}

export function StartScanButton({
	disabled,
	loading,
	onClick,
}: StartScanButtonProps) {
	const isDemo = isDemoMode();

	return (
		<GradientButton
			onClick={onClick}
			disabled={disabled || loading}
			className="h-12"
		>
			<span className="flex items-center justify-center gap-2">
				{loading ? (
					<>
						<Loader2 className="h-5 w-5 animate-spin" />
						<span>Starting Scan...</span>
					</>
				) : (
					<>
						<Play className="h-5 w-5" />
						<span>
							{isDemo ? "Start Scan (Demo)" : "Start Scan"}
						</span>
					</>
				)}
			</span>
		</GradientButton>
	);
}
