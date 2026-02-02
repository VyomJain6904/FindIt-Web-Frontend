"use client";

import {
	Target,
	Layers,
	FileText,
	Sparkles,
	AlertTriangle,
} from "lucide-react";
import type { ScanModule } from "@/types/subscription";
import type { ScanTemplate } from "./ScanTemplates";
import type { WordlistFile } from "./WordlistUpload";
import { isDemoMode } from "@/lib/demo";

interface ScanPreviewProps {
	target: string;
	template: ScanTemplate;
	selectedModules: ScanModule[];
	wordlist: WordlistFile | null;
	aiEnabled: boolean;
}

const MODULE_LABELS: Record<ScanModule, string> = {
	subdomain_enum: "Subdomain Enumeration",
	port_scan: "Port Scanning",
	dns_records: "Headers Analysis",
	tech_detect: "Technology Detection",
	whois: "WHOIS Lookup",
	certificate: "TLS Analysis",
	vulnerability_scan: "Vulnerability Scan",
	directory_bruteforce: "Directory Bruteforce",
	cloud_enum: "Cloud Enumeration",
};

const TEMPLATE_LABELS: Record<ScanTemplate, string> = {
	quick: "Quick Scan",
	full: "Full Scan",
	custom: "Custom Scan",
};

export function ScanPreview({
	target,
	template,
	selectedModules,
	wordlist,
	aiEnabled,
}: ScanPreviewProps) {
	const isDemo = isDemoMode();

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<label className="block text-sm font-medium text-zinc-300">
					Scan Preview
				</label>
				{isDemo && (
					<span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">
						<AlertTriangle className="h-3 w-3" />
						Demo Mode
					</span>
				)}
			</div>

			<div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900 space-y-4">
				{/* Target */}
				<div className="flex items-start gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<Target className="h-4 w-4 text-zinc-400" />
					</div>
					<div>
						<p className="text-xs text-zinc-500 uppercase tracking-wide">
							Target
						</p>
						<p className="font-mono text-sm text-zinc-200 mt-0.5">
							{target || "—"}
						</p>
					</div>
				</div>

				{/* Template & Modules */}
				<div className="flex items-start gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<Layers className="h-4 w-4 text-zinc-400" />
					</div>
					<div className="flex-1">
						<p className="text-xs text-zinc-500 uppercase tracking-wide">
							Configuration
						</p>
						<p className="text-sm text-zinc-200 mt-0.5">
							{TEMPLATE_LABELS[template]}
						</p>
						{selectedModules.length > 0 && (
							<div className="flex flex-wrap gap-1.5 mt-2">
								{selectedModules.map((mod) => (
									<span
										key={mod}
										className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400"
									>
										{MODULE_LABELS[mod] || mod}
									</span>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Wordlist */}
				{wordlist && (
					<div className="flex items-start gap-3">
						<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
							<FileText className="h-4 w-4 text-zinc-400" />
						</div>
						<div>
							<p className="text-xs text-zinc-500 uppercase tracking-wide">
								Custom Wordlist
							</p>
							<p className="text-sm text-zinc-200 mt-0.5">
								{wordlist.name}
							</p>
							<p className="text-xs text-zinc-500">
								{wordlist.wordCount.toLocaleString()} words
							</p>
						</div>
					</div>
				)}

				{/* AI Features */}
				<div className="flex items-start gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<Sparkles className="h-4 w-4 text-zinc-400" />
					</div>
					<div>
						<p className="text-xs text-zinc-500 uppercase tracking-wide">
							AI Analysis
						</p>
						<p
							className={`text-sm mt-0.5 ${
								aiEnabled ? "text-[#FF79C6]" : "text-zinc-500"
							}`}
						>
							{aiEnabled ? "Enabled" : "Disabled"}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
