"use client";

import { Shield, Sword, Eye, Lock } from "lucide-react";
import { FeatureFlags } from "@/types";

export type Perspective = "neutral" | "attacker" | "defender";

interface PerspectiveToggleProps {
	value: Perspective;
	onChange: (perspective: Perspective) => void;
	features: FeatureFlags;
}

export function PerspectiveToggle({
	value,
	onChange,
	features,
}: PerspectiveToggleProps) {
	const isEnabled = features.ai_analysis === true;

	const perspectives: Array<{
		id: Perspective;
		label: string;
		icon: React.ElementType;
		color: string;
		activeColor: string;
	}> = [
		{
			id: "neutral",
			label: "Neutral",
			icon: Eye,
			color: "text-zinc-400",
			activeColor: "bg-zinc-700 text-zinc-100",
		},
		{
			id: "attacker",
			label: "Attacker",
			icon: Sword,
			color: "text-red-400",
			activeColor: "bg-red-500/20 text-red-400 border-red-500/30",
		},
		{
			id: "defender",
			label: "Defender",
			icon: Shield,
			color: "text-blue-400",
			activeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
		},
	];

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-sm font-medium text-zinc-300">
					Analysis Perspective
				</h3>
				{!isEnabled && (
					<span className="flex items-center gap-1 text-xs text-zinc-500">
						<Lock className="w-3 h-3" />
						Pro Feature
					</span>
				)}
			</div>

			<div className="flex gap-2">
				{perspectives.map((p) => {
					const Icon = p.icon;
					const isActive = value === p.id;
					const isDisabled = !isEnabled && p.id !== "neutral";

					return (
						<button
							key={p.id}
							onClick={() => !isDisabled && onChange(p.id)}
							disabled={isDisabled}
							title={
								isDisabled
									? "Upgrade to Pro to access AI-driven perspectives"
									: `Switch to ${p.label} view`
							}
							className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
								isActive
									? p.activeColor
									: isDisabled
										? "bg-zinc-800/50 text-zinc-600 border-zinc-800 cursor-not-allowed"
										: "bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200"
							}`}
						>
							<Icon className="w-4 h-4" />
							<span>{p.label}</span>
							{isDisabled && <Lock className="w-3 h-3 ml-1" />}
						</button>
					);
				})}
			</div>

			{/* Perspective description */}
			<p className="text-xs text-zinc-500 mt-3">
				{value === "neutral" &&
					"Standard view showing raw scan results"}
				{value === "attacker" &&
					"Red team perspective highlighting attack surface and exploitation opportunities"}
				{value === "defender" &&
					"Blue team perspective emphasizing remediation and hardening priorities"}
			</p>
		</div>
	);
}
