"use client";

import { Lock } from "lucide-react";
import type { FeatureFlags } from "@/types";

export type FindingTabId = "overview" | "red-team" | "blue-team" | "executive";

interface FindingDetailTabsProps {
	activeTab: FindingTabId;
	onTabChange: (tab: FindingTabId) => void;
	hasAIData: boolean;
	features: FeatureFlags;
}

export function FindingDetailTabs({
	activeTab,
	onTabChange,
	hasAIData,
	features,
}: FindingDetailTabsProps) {
	const aiEnabled = features.ai_analysis === true;

	const tabs: Array<{
		id: FindingTabId;
		label: string;
		aiOnly: boolean;
	}> = [
		{ id: "overview", label: "Overview", aiOnly: false },
		{ id: "red-team", label: "Red Team", aiOnly: true },
		{ id: "blue-team", label: "Blue Team", aiOnly: true },
		{ id: "executive", label: "Executive Summary", aiOnly: true },
	];

	return (
		<div className="flex gap-1 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
			{tabs.map((tab) => {
				const isDisabled = tab.aiOnly && (!aiEnabled || !hasAIData);
				const isActive = activeTab === tab.id;

				return (
					<button
						key={tab.id}
						onClick={() => !isDisabled && onTabChange(tab.id)}
						disabled={isDisabled}
						title={
							isDisabled && !aiEnabled
								? "Upgrade to Pro to access AI-driven insights"
								: isDisabled && !hasAIData
									? "No AI analysis available for this finding"
									: undefined
						}
						className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
							isActive
								? "bg-zinc-800 text-zinc-100"
								: isDisabled
									? "text-zinc-600 cursor-not-allowed"
									: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
						}`}
					>
						{tab.label}
						{isDisabled && <Lock className="w-3 h-3" />}
					</button>
				);
			})}
		</div>
	);
}
