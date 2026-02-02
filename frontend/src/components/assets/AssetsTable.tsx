"use client";

import { useCallback } from "react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import { AssetRow } from "./AssetRow";
import type { Asset, AssetDetail } from "@/types/asset";
import { Package } from "lucide-react";

interface AssetsTableProps {
	assets: Asset[];
	selectedAssetId: string | null;
	onSelectAsset: (asset: Asset | null) => void;
}

function TableHeader() {
	return (
		<div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
			<div className="col-span-4">Asset Identifier</div>
			<div className="col-span-2">Type</div>
			<div className="col-span-2">Source</div>
			<div className="col-span-2">Last Seen</div>
			<div className="col-span-1">Scan</div>
			<div className="col-span-1 text-right">Status</div>
		</div>
	);
}

function EmptyState() {
	return (
		<div className="flex flex-col items-center justify-center py-16 text-center">
			<div className="p-4 rounded-full bg-zinc-800 mb-4">
				<Package className="h-8 w-8 text-zinc-500" />
			</div>
			<h3 className="text-lg font-medium text-zinc-300 mb-2">
				No Assets Found
			</h3>
			<p className="text-sm text-zinc-500 max-w-sm">
				Assets will appear here after running scans. Start a new scan to
				discover assets.
			</p>
		</div>
	);
}

export function AssetsTable({
	assets,
	selectedAssetId,
	onSelectAsset,
}: AssetsTableProps) {
	const renderRow = useCallback(
		(asset: Asset) => (
			<AssetRow
				asset={asset}
				isSelected={selectedAssetId === asset.id}
				onClick={() =>
					onSelectAsset(selectedAssetId === asset.id ? null : asset)
				}
			/>
		),
		[selectedAssetId, onSelectAsset],
	);

	return (
		<VirtualizedTable
			items={assets}
			height={500}
			rowHeight={56}
			header={<TableHeader />}
			renderRow={renderRow}
			emptyState={<EmptyState />}
		/>
	);
}
