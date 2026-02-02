"use client";

import { useState } from "react";
import { Filter, X, Calendar, Search } from "lucide-react";
import type { AssetType } from "@/types/asset";

interface AssetFiltersProps {
	onFilterChange: (filters: AssetFilters) => void;
	filters: AssetFilters;
}

export interface AssetFilters {
	type: AssetType | null;
	source: string | null;
	scanId: string;
	dateRange: "all" | "today" | "week" | "month";
}

const ASSET_TYPES: { value: AssetType; label: string }[] = [
	{ value: "domain", label: "Domain" },
	{ value: "subdomain", label: "Subdomain" },
	{ value: "ip", label: "IP Address" },
	{ value: "cloud", label: "Cloud Asset" },
	{ value: "service", label: "Service" },
	{ value: "certificate", label: "Certificate" },
];

const SOURCES = [
	{ value: "subdomain-worker", label: "Subdomain" },
	{ value: "port-worker", label: "Port Scanner" },
	{ value: "cloud-worker", label: "Cloud Enum" },
	{ value: "tls-worker", label: "TLS Analysis" },
];

const DATE_RANGES = [
	{ value: "all", label: "All Time" },
	{ value: "today", label: "Today" },
	{ value: "week", label: "This Week" },
	{ value: "month", label: "This Month" },
];

export function AssetFilters({ onFilterChange, filters }: AssetFiltersProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const hasActiveFilters =
		filters.type ||
		filters.source ||
		filters.scanId ||
		filters.dateRange !== "all";

	const clearFilters = () => {
		onFilterChange({
			type: null,
			source: null,
			scanId: "",
			dateRange: "all",
		});
	};

	return (
		<div className="space-y-3">
			{/* Filter Toggle */}
			<div className="flex items-center justify-between">
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
				>
					<Filter className="h-4 w-4" />
					Filters
					{hasActiveFilters && (
						<span className="px-1.5 py-0.5 text-xs bg-violet-500/20 text-violet-400 rounded">
							Active
						</span>
					)}
				</button>
				{hasActiveFilters && (
					<button
						onClick={clearFilters}
						className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
					>
						<X className="h-3 w-3" />
						Clear
					</button>
				)}
			</div>

			{/* Filter Panel */}
			{isExpanded && (
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
					{/* Asset Type */}
					<div className="space-y-1.5">
						<label className="text-xs text-zinc-500">
							Asset Type
						</label>
						<select
							value={filters.type || ""}
							onChange={(e) =>
								onFilterChange({
									...filters,
									type: (e.target.value as AssetType) || null,
								})
							}
							className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
						>
							<option value="">All Types</option>
							{ASSET_TYPES.map((t) => (
								<option key={t.value} value={t.value}>
									{t.label}
								</option>
							))}
						</select>
					</div>

					{/* Source */}
					<div className="space-y-1.5">
						<label className="text-xs text-zinc-500">Source</label>
						<select
							value={filters.source || ""}
							onChange={(e) =>
								onFilterChange({
									...filters,
									source: e.target.value || null,
								})
							}
							className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
						>
							<option value="">All Sources</option>
							{SOURCES.map((s) => (
								<option key={s.value} value={s.value}>
									{s.label}
								</option>
							))}
						</select>
					</div>

					{/* Date Range */}
					<div className="space-y-1.5">
						<label className="text-xs text-zinc-500 flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							Last Seen
						</label>
						<select
							value={filters.dateRange}
							onChange={(e) =>
								onFilterChange({
									...filters,
									dateRange: e.target
										.value as AssetFilters["dateRange"],
								})
							}
							className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
						>
							{DATE_RANGES.map((d) => (
								<option key={d.value} value={d.value}>
									{d.label}
								</option>
							))}
						</select>
					</div>

					{/* Scan ID */}
					<div className="space-y-1.5">
						<label className="text-xs text-zinc-500 flex items-center gap-1">
							<Search className="h-3 w-3" />
							Scan ID
						</label>
						<input
							type="text"
							value={filters.scanId}
							onChange={(e) =>
								onFilterChange({
									...filters,
									scanId: e.target.value,
								})
							}
							placeholder="Search by scan ID..."
							className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export const DEFAULT_FILTERS: AssetFilters = {
	type: null,
	source: null,
	scanId: "",
	dateRange: "all",
};
