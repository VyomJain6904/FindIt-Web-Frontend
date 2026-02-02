"use client";

import { useState } from "react";
import {
	Network,
	Server,
	Code,
	FileText,
	Lock,
	Shield,
	Folder,
	Cloud,
} from "lucide-react";

type TabId =
	| "subdomains"
	| "ports"
	| "technologies"
	| "headers"
	| "tls"
	| "directories"
	| "cloud"
	| "vulnerabilities";

interface ScanTabsProps {
	activeTab: TabId;
	onTabChange: (tab: TabId) => void;
	counts?: Partial<Record<TabId, number>>;
	disabledTabs?: TabId[];
}

const TABS: Array<{
	id: TabId;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}> = [
	{ id: "subdomains", label: "Subdomains", icon: Network },
	{ id: "ports", label: "Ports", icon: Server },
	{ id: "technologies", label: "Technologies", icon: Code },
	{ id: "headers", label: "Headers", icon: FileText },
	{ id: "tls", label: "TLS", icon: Lock },
	{ id: "directories", label: "Directories", icon: Folder },
	{ id: "cloud", label: "Cloud Assets", icon: Cloud },
	{ id: "vulnerabilities", label: "Vulnerabilities", icon: Shield },
];

export function ScanTabs({
	activeTab,
	onTabChange,
	counts = {},
	disabledTabs = [],
}: ScanTabsProps) {
	return (
		<div className="flex items-center gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto scrollbar-hide">
			{TABS.map((tab) => {
				const Icon = tab.icon;
				const isActive = activeTab === tab.id;
				const count = counts[tab.id];
				const isDisabled = disabledTabs.includes(tab.id);

				return (
					<button
						key={tab.id}
						onClick={() => !isDisabled && onTabChange(tab.id)}
						disabled={isDisabled}
						title={
							isDisabled
								? ["ports", "technologies", "tls"].includes(
										tab.id,
									)
									? "Upgrade to Pro to access this feature"
									: "Upgrade to Enterprise to access this feature"
								: undefined
						}
						className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
							isDisabled
								? "text-zinc-600 cursor-not-allowed opacity-50"
								: isActive
									? "bg-zinc-800 text-zinc-100"
									: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
						}`}
					>
						<Icon className="w-4 h-4 flex-shrink-0" />
						<span className="hidden sm:inline">{tab.label}</span>
						{typeof count === "number" && (
							<span
								className={`px-1 sm:px-1.5 py-0.5 rounded text-xs ${
									isActive
										? "bg-zinc-700 text-zinc-300"
										: "bg-zinc-800 text-zinc-500"
								}`}
							>
								{count}
							</span>
						)}
					</button>
				);
			})}
		</div>
	);
}

export type { TabId };
