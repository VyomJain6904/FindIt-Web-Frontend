"use client";

import { useState, useMemo } from "react";
import { Package } from "lucide-react";
import {
	AssetsTable,
	AssetFilters,
	AssetDetailPanel,
	DEFAULT_FILTERS,
} from "@/components/assets";
import type { AssetFiltersType } from "@/components/assets";
import { LocalErrorBoundary } from "@/components/error";
import { DemoBanner } from "@/components/demo";
import { isDemoMode } from "@/lib/demo";
import { DEMO_ASSETS, DEMO_ASSET_DETAIL } from "@/lib/demo/data";
import type { Asset } from "@/types/asset";

export default function AssetsPage() {
	const isDemo = isDemoMode();

	// State
	const [filters, setFilters] = useState<AssetFiltersType>(DEFAULT_FILTERS);
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

	// Use demo data if in demo mode
	const assets = isDemo ? DEMO_ASSETS : [];

	// Apply filters (UI only)
	const filteredAssets = useMemo(() => {
		return assets.filter((asset) => {
			// Type filter
			if (filters.type && asset.type !== filters.type) {
				return false;
			}

			// Source filter
			if (filters.source && asset.source !== filters.source) {
				return false;
			}

			// Scan ID filter
			if (
				filters.scanId &&
				!asset.scanId
					.toLowerCase()
					.includes(filters.scanId.toLowerCase())
			) {
				return false;
			}

			// Date range filter
			if (filters.dateRange !== "all") {
				const lastSeen = new Date(asset.lastSeen);
				const now = new Date();

				switch (filters.dateRange) {
					case "today":
						if (lastSeen.toDateString() !== now.toDateString()) {
							return false;
						}
						break;
					case "week": {
						const weekAgo = new Date(
							now.getTime() - 7 * 24 * 60 * 60 * 1000,
						);
						if (lastSeen < weekAgo) {
							return false;
						}
						break;
					}
					case "month": {
						const monthAgo = new Date(
							now.getTime() - 30 * 24 * 60 * 60 * 1000,
						);
						if (lastSeen < monthAgo) {
							return false;
						}
						break;
					}
				}
			}

			return true;
		});
	}, [assets, filters]);

	// Get detail for selected asset (demo mode provides mock detail)
	const selectedDetail =
		isDemo && selectedAsset?.id === DEMO_ASSET_DETAIL.id
			? DEMO_ASSET_DETAIL
			: undefined;

	return (
		<div
			className={`p-4 sm:p-6 space-y-6 min-h-screen bg-black ${isDemo ? "pt-16" : ""}`}
		>
			{/* Demo Banner */}
			<DemoBanner />

			{/* Header */}
			<div className="flex items-center gap-4">
				<div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/30">
					<Package className="h-6 w-6 text-violet-400" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-zinc-100">Assets</h1>
					<p className="text-sm text-zinc-500">
						Discovered inventory from scans
					</p>
				</div>
				<div className="ml-auto">
					<span className="text-sm text-zinc-400">
						{filteredAssets.length} assets
					</span>
				</div>
			</div>

			{/* Filters */}
			<LocalErrorBoundary sectionName="Asset Filters">
				<AssetFilters filters={filters} onFilterChange={setFilters} />
			</LocalErrorBoundary>

			{/* Table */}
			<LocalErrorBoundary sectionName="Assets Table">
				<AssetsTable
					assets={filteredAssets}
					selectedAssetId={selectedAsset?.id || null}
					onSelectAsset={setSelectedAsset}
				/>
			</LocalErrorBoundary>

			{/* Detail Panel */}
			{selectedAsset && (
				<LocalErrorBoundary sectionName="Asset Detail">
					<div className="rounded-xl border border-zinc-800 overflow-hidden">
						<AssetDetailPanel
							asset={selectedAsset}
							detail={selectedDetail}
							onClose={() => setSelectedAsset(null)}
						/>
					</div>
				</LocalErrorBoundary>
			)}
		</div>
	);
}
