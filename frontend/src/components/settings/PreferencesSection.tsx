"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import type { UserPreferences } from "@/types/settings";

interface PreferencesSectionProps {
	preferences: UserPreferences;
	isDemo: boolean;
	onSave?: (preferences: UserPreferences) => void;
}

export function PreferencesSection({
	preferences,
	isDemo,
	onSave,
}: PreferencesSectionProps) {
	const [localPrefs, setLocalPrefs] = useState<UserPreferences>(preferences);
	const [hasChanges, setHasChanges] = useState(false);

	const updatePref = <K extends keyof UserPreferences>(
		key: K,
		value: UserPreferences[K],
	) => {
		setLocalPrefs((prev) => ({ ...prev, [key]: value }));
		setHasChanges(true);
	};

	const handleSave = () => {
		if (isDemo || !onSave) return;
		onSave(localPrefs);
		setHasChanges(false);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-zinc-800">
					<Settings className="h-5 w-5 text-zinc-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-zinc-100">
						Preferences
					</h2>
					<p className="text-sm text-zinc-500">
						Customize your experience
					</p>
				</div>
			</div>

			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
				{/* Default Scan Template */}
				<div className="space-y-2">
					<label className="text-sm text-zinc-400">
						Default Scan Template
					</label>
					<select
						value={localPrefs.defaultScanTemplate}
						onChange={(e) =>
							updatePref(
								"defaultScanTemplate",
								e.target
									.value as UserPreferences["defaultScanTemplate"],
							)
						}
						disabled={isDemo}
						className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#FF79C6]/50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<option value="quick">Quick Scan</option>
						<option value="full">Full Scan</option>
						<option value="custom">Custom</option>
					</select>
				</div>

				{/* Results View Mode */}
				<div className="space-y-2">
					<label className="text-sm text-zinc-400">
						Results View
					</label>
					<div className="flex gap-2">
						<button
							type="button"
							onClick={() =>
								updatePref("resultsViewMode", "table")
							}
							disabled={isDemo}
							className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
								localPrefs.resultsViewMode === "table"
									? "bg-[#FF79C6]/20 text-[#FF79C6] border border-[#FF79C6]/50"
									: "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
							}`}
						>
							Table
						</button>
						<button
							type="button"
							onClick={() =>
								updatePref("resultsViewMode", "compact")
							}
							disabled={isDemo}
							className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
								localPrefs.resultsViewMode === "compact"
									? "bg-[#FF79C6]/20 text-[#FF79C6] border border-[#FF79C6]/50"
									: "bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600"
							}`}
						>
							Compact
						</button>
					</div>
				</div>

				{/* Save Button */}
				<div className="pt-2">
					<GradientButton
						onClick={handleSave}
						disabled={isDemo || !hasChanges}
						title={isDemo ? "Disabled in Demo Mode" : undefined}
					>
						<span className="flex items-center justify-center gap-2">
							<Save className="h-4 w-4" />
							Save Preferences
						</span>
					</GradientButton>
				</div>
			</div>
		</div>
	);
}
