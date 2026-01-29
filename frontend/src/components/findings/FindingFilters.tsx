"use client";

import { Filter, X } from "lucide-react";
import type { FindingSeverity, FindingCategory } from "@/types";

interface FindingFiltersProps {
	severity: FindingSeverity | null;
	category: FindingCategory | null;
	scanId: string | null;
	onSeverityChange: (severity: FindingSeverity | null) => void;
	onCategoryChange: (category: FindingCategory | null) => void;
	onScanIdChange: (scanId: string | null) => void;
	onClear: () => void;
}

const SEVERITIES: FindingSeverity[] = [
	"CRITICAL",
	"HIGH",
	"MEDIUM",
	"LOW",
	"INFO",
];

const CATEGORIES: FindingCategory[] = [
	"NETWORK",
	"WEB",
	"CLOUD",
	"CODE",
	"CONFIGURATION",
	"CRYPTO",
	"INJECTION",
	"XSS",
	"AUTHENTICATION",
	"AUTHORIZATION",
];

export function FindingFilters({
	severity,
	category,
	scanId,
	onSeverityChange,
	onCategoryChange,
	onScanIdChange,
	onClear,
}: FindingFiltersProps) {
	const hasFilters = severity || category || scanId;

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2 text-sm text-zinc-300">
					<Filter className="w-4 h-4" />
					Filters
				</div>
				{hasFilters && (
					<button
						onClick={onClear}
						className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						<X className="w-3 h-3" />
						Clear all
					</button>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Severity Filter */}
				<div>
					<label className="block text-xs text-zinc-500 mb-1.5">
						Severity
					</label>
					<select
						value={severity || ""}
						onChange={(e) =>
							onSeverityChange(
								e.target.value
									? (e.target.value as FindingSeverity)
									: null,
							)
						}
						className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
					>
						<option value="">All severities</option>
						{SEVERITIES.map((sev) => (
							<option key={sev} value={sev}>
								{sev}
							</option>
						))}
					</select>
				</div>

				{/* Category Filter */}
				<div>
					<label className="block text-xs text-zinc-500 mb-1.5">
						Category
					</label>
					<select
						value={category || ""}
						onChange={(e) =>
							onCategoryChange(
								e.target.value
									? (e.target.value as FindingCategory)
									: null,
							)
						}
						className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-violet-500"
					>
						<option value="">All categories</option>
						{CATEGORIES.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>

				{/* Scan ID Filter */}
				<div>
					<label className="block text-xs text-zinc-500 mb-1.5">
						Scan ID
					</label>
					<input
						type="text"
						value={scanId || ""}
						onChange={(e) => onScanIdChange(e.target.value || null)}
						placeholder="Filter by scan..."
						className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
					/>
				</div>
			</div>
		</div>
	);
}
