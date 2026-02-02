"use client";

import {
	Network,
	Server,
	Code,
	FileText,
	Lock,
	Folder,
	Cloud,
	Shield,
	Sparkles,
	LockKeyhole,
	Bug,
} from "lucide-react";
import type { ScanModule } from "@/types/subscription";
import { usePermissions } from "@/hooks/usePermissions";

interface ScanModulesProps {
	selectedModules: ScanModule[];
	onChange: (modules: ScanModule[]) => void;
	disabled?: boolean;
}

interface ModuleConfig {
	id: ScanModule;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	tier?: "pro" | "enterprise";
	aiEnhanced?: boolean;
}

const MODULES: ModuleConfig[] = [
	{
		id: "subdomain_enum",
		name: "Subdomain Enumeration",
		description: "Discover subdomains via DNS and OSINT",
		icon: Network,
	},
	{
		id: "port_scan",
		name: "Port Scanning",
		description: "Identify open ports and services",
		icon: Server,
		tier: "pro",
	},
	{
		id: "tech_detect",
		name: "Technology Detection",
		description: "Identify web technologies in use",
		icon: Code,
		tier: "pro",
	},
	{
		id: "dns_records",
		name: "Headers Analysis",
		description: "Analyze HTTP security headers",
		icon: FileText,
	},
	{
		id: "certificate",
		name: "TLS Analysis",
		description: "Validate SSL/TLS configuration",
		icon: Lock,
		tier: "pro",
	},
	{
		id: "directory_bruteforce",
		name: "Directory Bruteforce",
		description: "Discover hidden paths and files",
		icon: Folder,
		tier: "enterprise",
	},
	{
		id: "cloud_enum",
		name: "Cloud Enumeration",
		description: "Find exposed cloud assets",
		icon: Cloud,
		tier: "enterprise",
	},
	{
		id: "vulnerability_scan",
		name: "Vulnerability Scan",
		description: "AI-powered vulnerability detection",
		icon: Shield,
		tier: "enterprise",
		aiEnhanced: true,
	},
];

export function ScanModules({
	selectedModules,
	onChange,
	disabled,
}: ScanModulesProps) {
	const { canUseModule, getUpgradeMessage } = usePermissions();

	const handleToggle = (moduleId: ScanModule) => {
		if (selectedModules.includes(moduleId)) {
			onChange(selectedModules.filter((m) => m !== moduleId));
		} else {
			onChange([...selectedModules, moduleId]);
		}
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<label className="block text-sm font-medium text-zinc-300">
					Scan Modules
				</label>
				<span className="text-xs text-zinc-500">
					{selectedModules.length} selected
				</span>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{MODULES.map((module) => {
					const Icon = module.icon;
					const isSelected = selectedModules.includes(module.id);
					const canUse = canUseModule(module.id);
					const isLocked = !canUse;

					return (
						<button
							key={module.id}
							type="button"
							onClick={() =>
								canUse && !disabled && handleToggle(module.id)
							}
							disabled={disabled || isLocked}
							title={
								isLocked
									? getUpgradeMessage(module.id)
									: undefined
							}
							className={`p-4 rounded-xl border text-left transition-all ${
								isLocked
									? "border-zinc-800 bg-zinc-900/50 opacity-60 cursor-not-allowed"
									: isSelected
										? "border-[#FF79C6] bg-[#FF79C6]/10"
										: "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
							}`}
						>
							{/* Row 1: Badge */}
							{module.tier && (
								<div className="flex justify-end mb-2">
									<span
										className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
											module.tier === "enterprise"
												? "bg-amber-500/10 text-amber-400"
												: "bg-blue-500/10 text-blue-400"
										}`}
									>
										{module.tier === "enterprise"
											? "Enterprise"
											: "Pro"}
									</span>
								</div>
							)}

							{/* Row 2: Icon + Content + Checkbox */}
							<div className="flex items-start gap-3">
								<div
									className={`p-2 rounded-lg shrink-0 ${
										isLocked
											? "bg-zinc-800"
											: isSelected
												? "bg-[#FF79C6]/20"
												: "bg-zinc-800"
									}`}
								>
									<Icon
										className={`h-4 w-4 ${
											isLocked
												? "text-zinc-600"
												: isSelected
													? "text-[#FF79C6]"
													: "text-zinc-400"
										}`}
									/>
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2">
										<span
											className={`font-medium text-sm ${
												isLocked
													? "text-zinc-500"
													: isSelected
														? "text-[#FF79C6]"
														: "text-zinc-200"
											}`}
										>
											{module.name}
										</span>
										{isLocked && (
											<LockKeyhole className="h-3.5 w-3.5 text-amber-500 shrink-0" />
										)}
										{module.aiEnhanced && !isLocked && (
											<Sparkles className="h-3.5 w-3.5 text-[#FF79C6] shrink-0" />
										)}
									</div>
									<p className="text-xs text-zinc-500 mt-0.5">
										{module.description}
									</p>
								</div>
								{!isLocked && (
									<div
										className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center mt-0.5 ${
											isSelected
												? "border-[#FF79C6] bg-[#FF79C6]"
												: "border-zinc-600"
										}`}
									>
										{isSelected && (
											<svg
												className="w-3 h-3 text-white"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												strokeWidth={3}
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M5 13l4 4L19 7"
												/>
											</svg>
										)}
									</div>
								)}
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
