"use client";

import { Globe, Server, Cloud, Network, Shield, FileText } from "lucide-react";
import Link from "next/link";
import type { Asset, AssetType } from "@/types/asset";

interface AssetRowProps {
	asset: Asset;
	onClick: () => void;
	isSelected: boolean;
}

const ASSET_TYPE_ICONS: Record<
	AssetType,
	React.ComponentType<{ className?: string }>
> = {
	domain: Globe,
	subdomain: Network,
	ip: Server,
	cloud: Cloud,
	service: Shield,
	certificate: FileText,
};

const ASSET_TYPE_LABELS: Record<AssetType, string> = {
	domain: "Domain",
	subdomain: "Subdomain",
	ip: "IP Address",
	cloud: "Cloud Asset",
	service: "Service",
	certificate: "Certificate",
};

const ASSET_TYPE_COLORS: Record<AssetType, string> = {
	domain: "text-violet-400 bg-violet-500/10",
	subdomain: "text-blue-400 bg-blue-500/10",
	ip: "text-emerald-400 bg-emerald-500/10",
	cloud: "text-amber-400 bg-amber-500/10",
	service: "text-pink-400 bg-pink-500/10",
	certificate: "text-cyan-400 bg-cyan-500/10",
};

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function AssetRow({ asset, onClick, isSelected }: AssetRowProps) {
	const Icon = ASSET_TYPE_ICONS[asset.type] || Globe;

	return (
		<div
			onClick={onClick}
			className={`grid grid-cols-12 gap-4 px-4 py-3 items-center cursor-pointer transition-colors ${
				isSelected
					? "bg-violet-500/10 border-l-2 border-violet-500"
					: "hover:bg-zinc-800/50 border-l-2 border-transparent"
			}`}
		>
			{/* Asset Identifier */}
			<div className="col-span-4 flex items-center gap-3 min-w-0">
				<div
					className={`p-1.5 rounded-lg shrink-0 ${ASSET_TYPE_COLORS[asset.type]}`}
				>
					<Icon className="h-4 w-4" />
				</div>
				<span className="font-mono text-sm text-zinc-200 truncate">
					{asset.identifier}
				</span>
			</div>

			{/* Asset Type */}
			<div className="col-span-2">
				<span
					className={`text-xs font-medium px-2 py-1 rounded ${ASSET_TYPE_COLORS[asset.type]}`}
				>
					{ASSET_TYPE_LABELS[asset.type]}
				</span>
			</div>

			{/* Source */}
			<div className="col-span-2">
				<span className="text-sm text-zinc-400 font-mono">
					{asset.source}
				</span>
			</div>

			{/* Last Seen */}
			<div className="col-span-2">
				<span className="text-sm text-zinc-400">
					{formatDate(asset.lastSeen)}
				</span>
			</div>

			{/* Scan ID */}
			<div className="col-span-1">
				<Link
					href={`/scan/${asset.scanId}`}
					onClick={(e) => e.stopPropagation()}
					className="text-sm text-violet-400 hover:text-violet-300 hover:underline font-mono"
				>
					{asset.scanId.slice(0, 8)}...
				</Link>
			</div>

			{/* Status */}
			<div className="col-span-1 flex justify-end">
				<span
					className={`text-xs font-medium px-2 py-1 rounded ${
						asset.status === "active"
							? "bg-emerald-500/10 text-emerald-400"
							: "bg-zinc-700/50 text-zinc-400"
					}`}
				>
					{asset.status}
				</span>
			</div>
		</div>
	);
}
