"use client";

import { Settings, AlertTriangle } from "lucide-react";
import {
	ProfileSection,
	FeatureAccessSection,
	PreferencesSection,
	ApiAccessSection,
} from "@/components/settings";
import { LocalErrorBoundary } from "@/components/error";
import { DemoBanner } from "@/components/demo";
import { isDemoMode } from "@/lib/demo";
import {
	DEMO_USER_PROFILE,
	DEMO_USER_PREFERENCES,
	DEMO_SETTINGS_FEATURES,
} from "@/lib/demo/data";

export default function SettingsPage() {
	const isDemo = isDemoMode();

	// Use demo data
	const profile = DEMO_USER_PROFILE;
	const preferences = DEMO_USER_PREFERENCES;
	const features = DEMO_SETTINGS_FEATURES;

	return (
		<div
			className={`p-4 sm:p-6 space-y-6 min-h-screen bg-black ${isDemo ? "pt-16" : ""}`}
		>
			{/* Demo Banner */}
			<DemoBanner />

			{/* Header */}
			<div className="flex items-center gap-4">
				<div className="p-3 rounded-xl bg-gradient-to-br from-[#FF79C6]/20 to-[#ff99cc]/20 border border-[#FF79C6]/30">
					<Settings className="h-6 w-6 text-[#FF79C6]" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-zinc-100">
						Settings
					</h1>
					<p className="text-sm text-zinc-500">
						Manage your account and preferences
					</p>
				</div>
			</div>

			{/* Demo Mode Warning */}
			{isDemo && (
				<div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
					<AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
					<div>
						<p className="text-sm font-medium text-amber-400">
							Demo Mode Active
						</p>
						<p className="text-xs text-amber-400/70">
							Settings are read-only. Changes will not be saved.
						</p>
					</div>
				</div>
			)}

			{/* Settings Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Profile Section */}
				<LocalErrorBoundary sectionName="Profile">
					<ProfileSection profile={profile} />
				</LocalErrorBoundary>

				{/* Preferences Section */}
				<LocalErrorBoundary sectionName="Preferences">
					<PreferencesSection
						preferences={preferences}
						isDemo={isDemo}
					/>
				</LocalErrorBoundary>

				{/* Feature Access Section - Full Width */}
				<div className="lg:col-span-2">
					<LocalErrorBoundary sectionName="Feature Access">
						<FeatureAccessSection features={features} />
					</LocalErrorBoundary>
				</div>

				{/* API Access Section */}
				<LocalErrorBoundary sectionName="API Access">
					<ApiAccessSection />
				</LocalErrorBoundary>
			</div>
		</div>
	);
}
