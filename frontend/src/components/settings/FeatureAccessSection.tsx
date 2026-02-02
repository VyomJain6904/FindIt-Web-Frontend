"use client";

import { Sparkles, Check, X, Lock } from "lucide-react";
import type { FeatureFlag } from "@/types/settings";

interface FeatureAccessSectionProps {
	features: FeatureFlag[];
}

const TIER_COLORS: Record<string, string> = {
	free: "bg-zinc-700/50 text-zinc-400",
	pro: "bg-blue-500/10 text-blue-400",
	enterprise: "bg-amber-500/10 text-amber-400",
};

export function FeatureAccessSection({ features }: FeatureAccessSectionProps) {
	const enabledFeatures = features.filter((f) => f.enabled);
	const disabledFeatures = features.filter((f) => !f.enabled);

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-zinc-800">
					<Sparkles className="h-5 w-5 text-zinc-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-zinc-100">
						Feature Access
					</h2>
					<p className="text-sm text-zinc-500">
						Your plan includes {enabledFeatures.length} features
					</p>
				</div>
			</div>

			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
				{/* Enabled Features */}
				<div className="space-y-2">
					<p className="text-xs text-zinc-500 uppercase tracking-wide">
						Enabled
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						{enabledFeatures.map((feature) => (
							<div
								key={feature.id}
								className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50"
							>
								<div className="p-1.5 rounded-md bg-emerald-500/10">
									<Check className="h-3.5 w-3.5 text-emerald-400" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm text-zinc-200">
										{feature.name}
									</p>
									<p className="text-xs text-zinc-500 truncate">
										{feature.description}
									</p>
								</div>
								{feature.tier && (
									<span
										className={`text-[10px] font-medium px-1.5 py-0.5 rounded capitalize ${
											TIER_COLORS[feature.tier] ||
											TIER_COLORS.free
										}`}
									>
										{feature.tier}
									</span>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Disabled Features */}
				{disabledFeatures.length > 0 && (
					<div className="space-y-2 pt-4 border-t border-zinc-800">
						<p className="text-xs text-zinc-500 uppercase tracking-wide">
							Not Available
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{disabledFeatures.map((feature) => (
								<div
									key={feature.id}
									className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 opacity-60"
								>
									<div className="p-1.5 rounded-md bg-zinc-700/50">
										<Lock className="h-3.5 w-3.5 text-zinc-500" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm text-zinc-400">
											{feature.name}
										</p>
										<p className="text-xs text-zinc-600 truncate">
											{feature.description}
										</p>
									</div>
									{feature.tier && (
										<span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-700/50 text-zinc-500 capitalize">
											{feature.tier}
										</span>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
