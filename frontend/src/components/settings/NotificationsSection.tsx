"use client";

import { useState } from "react";
import { Bell, Save } from "lucide-react";

interface NotificationsSectionProps {
	emailEnabled: boolean;
	isDemo: boolean;
	onSave?: (enabled: boolean) => void;
}

export function NotificationsSection({
	emailEnabled,
	isDemo,
	onSave,
}: NotificationsSectionProps) {
	const [enabled, setEnabled] = useState(emailEnabled);
	const [hasChanges, setHasChanges] = useState(false);

	const handleToggle = () => {
		if (isDemo) return;
		setEnabled(!enabled);
		setHasChanges(true);
	};

	const handleSave = () => {
		if (isDemo || !onSave) return;
		onSave(enabled);
		setHasChanges(false);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-zinc-800">
					<Bell className="h-5 w-5 text-zinc-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-zinc-100">
						Notifications
					</h2>
					<p className="text-sm text-zinc-500">
						Manage email notifications
					</p>
				</div>
			</div>

			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
				{/* Email Notifications Toggle */}
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-zinc-200">
							Email Notifications
						</p>
						<p className="text-xs text-zinc-500">
							Receive scan results and alerts via email
						</p>
					</div>
					<button
						type="button"
						onClick={handleToggle}
						disabled={isDemo}
						title={isDemo ? "Disabled in Demo Mode" : undefined}
						className={`relative w-12 h-6 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
							enabled ? "bg-[#FF79C6]" : "bg-zinc-700"
						}`}
					>
						<span
							className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
								enabled ? "left-7" : "left-1"
							}`}
						/>
					</button>
				</div>

				{/* Save Button */}
				<div className="pt-2">
					<button
						type="button"
						onClick={handleSave}
						disabled={isDemo || !hasChanges}
						title={isDemo ? "Disabled in Demo Mode" : undefined}
						className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
							hasChanges && !isDemo
								? "bg-[#FF79C6] text-white hover:bg-[#ff99cc]"
								: "bg-zinc-800 text-zinc-500"
						}`}
					>
						<Save className="h-4 w-4" />
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
