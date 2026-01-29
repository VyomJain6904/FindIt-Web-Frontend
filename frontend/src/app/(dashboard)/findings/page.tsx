"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { FindingsTable, FindingFilters } from "@/components/findings";
import { LocalErrorBoundary } from "@/components/error";
import { DemoBanner } from "@/components/demo";
import { isDemoMode, DEMO_FINDINGS_LIST } from "@/lib/demo";
import type {
	FindingListItem,
	FindingSeverity,
	FindingCategory,
} from "@/types";

export default function FindingsPage() {
	const [severity, setSeverity] = useState<FindingSeverity | null>(null);
	const [category, setCategory] = useState<FindingCategory | null>(null);
	const [scanId, setScanId] = useState<string | null>(null);

	const isDemo = isDemoMode();
	const [findings] = useState<FindingListItem[]>(
		isDemo ? DEMO_FINDINGS_LIST : [],
	);
	const [loading] = useState(false);
	const [error] = useState<string | undefined>(undefined);

	// Filter findings based on selected filters
	const filteredFindings = findings.filter((f) => {
		if (severity && f.severity !== severity) return false;
		if (category && f.category !== category) return false;
		if (scanId && !f.scanId.includes(scanId)) return false;
		return true;
	});

	const clearFilters = () => {
		setSeverity(null);
		setCategory(null);
		setScanId(null);
	};

	return (
		<div
			className={`p-3 sm:p-6 space-y-4 sm:space-y-6 min-h-screen bg-black ${isDemo ? "pt-16" : ""}`}
		>
			{/* Demo Banner */}
			<DemoBanner />

			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
						<BarChart3 className="w-5 h-5 text-violet-400" />
					</div>
					<div>
						<h1 className="text-lg sm:text-xl font-bold text-zinc-100">
							Findings
						</h1>
						<p className="text-xs sm:text-sm text-zinc-500">
							Security findings across all scans
							{isDemo && (
								<span className="ml-2 text-violet-400">
									(Demo Data)
								</span>
							)}
						</p>
					</div>
				</div>
			</div>

			{/* Filters */}
			<LocalErrorBoundary sectionName="Filters">
				<FindingFilters
					severity={severity}
					category={category}
					scanId={scanId}
					onSeverityChange={setSeverity}
					onCategoryChange={setCategory}
					onScanIdChange={setScanId}
					onClear={clearFilters}
				/>
			</LocalErrorBoundary>

			{/* Table */}
			<LocalErrorBoundary sectionName="Findings Table">
				<FindingsTable
					findings={filteredFindings}
					loading={loading}
					error={error}
				/>
			</LocalErrorBoundary>
		</div>
	);
}
