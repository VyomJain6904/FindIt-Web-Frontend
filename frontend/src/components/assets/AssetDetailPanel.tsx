"use client";

import { X, ExternalLink, Clock, History } from "lucide-react";
import Link from "next/link";
import type { Asset, AssetDetail } from "@/types/asset";

interface AssetDetailPanelProps {
	asset: Asset;
	detail?: AssetDetail;
	onClose: () => void;
}

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function AssetDetailPanel({
	asset,
	detail,
	onClose,
}: AssetDetailPanelProps) {
	return (
		<div className="border-t border-zinc-800 bg-zinc-900/80 p-4 space-y-4">
			{/* Header */}
			<div className="flex items-start justify-between">
				<div>
					<h3 className="font-mono text-sm font-medium text-zinc-200">
						{asset.identifier}
					</h3>
					<p className="text-xs text-zinc-500 mt-0.5">
						{asset.type} • {asset.source}
					</p>
				</div>
				<button
					onClick={onClose}
					className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Timeline */}
				<div className="space-y-2">
					<h4 className="text-xs font-medium text-zinc-400 flex items-center gap-1">
						<Clock className="h-3 w-3" />
						Timeline
					</h4>
					<div className="space-y-1 text-sm">
						<div className="flex justify-between">
							<span className="text-zinc-500">Last Seen</span>
							<span className="text-zinc-300">
								{formatDate(asset.lastSeen)}
							</span>
						</div>
						{detail?.firstSeen && (
							<div className="flex justify-between">
								<span className="text-zinc-500">
									First Seen
								</span>
								<span className="text-zinc-300">
									{formatDate(detail.firstSeen)}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Metadata */}
				{asset.metadata && Object.keys(asset.metadata).length > 0 && (
					<div className="space-y-2">
						<h4 className="text-xs font-medium text-zinc-400">
							Metadata
						</h4>
						<div className="space-y-1 text-sm">
							{Object.entries(asset.metadata).map(
								([key, value]) => (
									<div
										key={key}
										className="flex justify-between"
									>
										<span className="text-zinc-500 capitalize">
											{key}
										</span>
										<span className="text-zinc-300 font-mono text-xs">
											{String(value)}
										</span>
									</div>
								),
							)}
						</div>
					</div>
				)}
			</div>

			{/* Scan History */}
			{detail?.scanHistory && detail.scanHistory.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-xs font-medium text-zinc-400 flex items-center gap-1">
						<History className="h-3 w-3" />
						Scan History
					</h4>
					<div className="space-y-2">
						{detail.scanHistory.map((scan, idx) => (
							<div
								key={idx}
								className="flex items-center justify-between p-2 rounded-lg bg-zinc-800/50"
							>
								<div className="flex items-center gap-3">
									<Link
										href={`/scan/${scan.scanId}`}
										className="text-sm text-violet-400 hover:text-violet-300 hover:underline font-mono flex items-center gap-1"
									>
										{scan.scanId.slice(0, 12)}...
										<ExternalLink className="h-3 w-3" />
									</Link>
									<span className="text-xs text-zinc-500">
										{scan.scanType}
									</span>
								</div>
								<span className="text-xs text-zinc-400">
									{formatDate(scan.timestamp)}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Quick Link */}
			<div className="flex justify-end">
				<Link
					href={`/scan/${asset.scanId}`}
					className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300"
				>
					View Latest Scan
					<ExternalLink className="h-3.5 w-3.5" />
				</Link>
			</div>
		</div>
	);
}
