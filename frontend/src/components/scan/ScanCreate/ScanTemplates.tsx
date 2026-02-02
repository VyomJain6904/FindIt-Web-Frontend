"use client";

import { Zap, Shield, Settings } from "lucide-react";
import type { ScanModule } from "@/types/subscription";

export type ScanTemplate = "quick" | "full" | "custom";

interface ScanTemplatesProps {
	selected: ScanTemplate;
	onChange: (template: ScanTemplate) => void;
}

interface TemplateConfig {
	id: ScanTemplate;
	name: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	modules: ScanModule[];
}

export const TEMPLATE_CONFIGS: TemplateConfig[] = [
	{
		id: "quick",
		name: "Quick Scan",
		description: "Fast reconnaissance - Subdomains & DNS only",
		icon: Zap,
		modules: ["subdomain_enum", "dns_records", "whois"],
	},
	{
		id: "full",
		name: "Full Scan",
		description: "Comprehensive scan - All available modules",
		icon: Shield,
		modules: [
			"subdomain_enum",
			"port_scan",
			"dns_records",
			"tech_detect",
			"whois",
			"certificate",
			"vulnerability_scan",
			"directory_bruteforce",
			"cloud_enum",
		],
	},
	{
		id: "custom",
		name: "Custom Scan",
		description: "Choose specific modules to run",
		icon: Settings,
		modules: [],
	},
];

export function ScanTemplates({ selected, onChange }: ScanTemplatesProps) {
	return (
		<div className="space-y-3">
			<label className="block text-sm font-medium text-zinc-300">
				Scan Template
			</label>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{TEMPLATE_CONFIGS.map((template) => {
					const Icon = template.icon;
					const isSelected = selected === template.id;

					return (
						<button
							key={template.id}
							type="button"
							onClick={() => onChange(template.id)}
							className={`relative p-4 rounded-xl border-2 text-left transition-all ${
								isSelected
									? "border-[#FF79C6] bg-[#FF79C6]/10"
									: "border-zinc-700 bg-zinc-900 hover:border-zinc-600"
							}`}
						>
							<div className="flex items-center gap-3 mb-2">
								<div
									className={`p-2 rounded-lg ${
										isSelected
											? "bg-[#FF79C6]/20"
											: "bg-zinc-800"
									}`}
								>
									<Icon
										className={`h-5 w-5 ${
											isSelected
												? "text-[#FF79C6]"
												: "text-zinc-400"
										}`}
									/>
								</div>
								<span
									className={`font-medium ${
										isSelected
											? "text-[#FF79C6]"
											: "text-zinc-200"
									}`}
								>
									{template.name}
								</span>
							</div>
							<p className="text-sm text-zinc-500">
								{template.description}
							</p>
							{isSelected && (
								<div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#FF79C6]" />
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export function getTemplateModules(template: ScanTemplate): ScanModule[] {
	const config = TEMPLATE_CONFIGS.find((t) => t.id === template);
	return config?.modules || [];
}
