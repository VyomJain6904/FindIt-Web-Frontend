"use client";

import { AlertTriangle, Eye } from "lucide-react";
import { isDemoMode, getDemoTooltip } from "@/lib/demo/mode";

/**
 * Demo Banner
 * Non-dismissible banner shown when demo mode is active
 */
export function DemoBanner() {
	if (!isDemoMode()) return null;

	return (
		<div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2">
			<div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
				<Eye className="w-4 h-4" />
				<span className="text-sm font-medium">
					Demo Mode — Viewing sample data. All actions are read-only.
				</span>
				<span className="px-2 py-0.5 bg-white/20 rounded text-xs font-medium">
					Investor Preview
				</span>
			</div>
		</div>
	);
}

/**
 * Demo Action Wrapper
 * Disables actions and shows tooltip in demo mode
 */
export function DemoActionWrapper({
	children,
	action,
	className = "",
}: {
	children: React.ReactNode;
	action: string;
	className?: string;
}) {
	const isDemo = isDemoMode();

	if (!isDemo) {
		return <>{children}</>;
	}

	return (
		<div className={`relative ${className}`} title={getDemoTooltip()}>
			<div className="opacity-50 pointer-events-none">{children}</div>
			<div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 rounded cursor-not-allowed">
				<AlertTriangle className="w-4 h-4 text-zinc-400" />
			</div>
		</div>
	);
}

/**
 * Demo Badge
 * Small indicator for demo mode
 */
export function DemoBadge() {
	if (!isDemoMode()) return null;

	return (
		<span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-500/10 text-violet-400 rounded text-xs font-medium">
			<Eye className="w-3 h-3" />
			Demo
		</span>
	);
}
