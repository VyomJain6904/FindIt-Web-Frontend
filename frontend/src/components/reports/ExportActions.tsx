"use client";

import { Download, FileJson, Lock } from "lucide-react";
import { FeatureFlags } from "@/types";

interface ExportActionsProps {
	reportId: string;
	downloadUrl?: string;
	features: FeatureFlags;
}

export function ExportActions({
	reportId,
	downloadUrl,
	features,
}: ExportActionsProps) {
	const canExport = features["report_export"] !== false;
	const hasBrandingRemoval = features["branding_removal"] === true;

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
			<h2 className="text-lg font-semibold text-zinc-100 mb-4">
				Export Options
			</h2>

			<div className="flex flex-wrap gap-3">
				{/* PDF Export */}
				<button
					disabled={!canExport}
					className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
						canExport
							? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
							: "bg-zinc-800 text-zinc-500 cursor-not-allowed"
					}`}
					title={
						canExport ? "Download PDF" : "Upgrade to export reports"
					}
				>
					<Download className="w-4 h-4" />
					Download PDF
					{!canExport && <Lock className="w-3 h-3 ml-1" />}
				</button>

				{/* JSON Export */}
				<button
					disabled={!canExport}
					className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
						canExport
							? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
							: "bg-zinc-800 text-zinc-500 cursor-not-allowed"
					}`}
					title={
						canExport
							? "Download JSON"
							: "Upgrade to export reports"
					}
				>
					<FileJson className="w-4 h-4" />
					Download JSON
					{!canExport && <Lock className="w-3 h-3 ml-1" />}
				</button>
			</div>

			{/* Branding Note */}
			<div className="mt-4 pt-4 border-t border-zinc-800">
				{hasBrandingRemoval ? (
					<p className="text-xs text-emerald-400">
						✓ Branding removal enabled
					</p>
				) : (
					<p className="text-xs text-zinc-500">
						<Lock className="w-3 h-3 inline mr-1" />
						Upgrade to Pro to remove branding from reports
					</p>
				)}
			</div>
		</div>
	);
}
