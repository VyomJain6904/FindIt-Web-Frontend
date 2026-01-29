"use client";

import Link from "next/link";
import { memo, useCallback } from "react";
import {
	AlertTriangle,
	AlertCircle,
	Info,
	Shield,
	ExternalLink,
} from "lucide-react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import type { FindingListItem, FindingSeverity } from "@/types";

interface FindingsTableProps {
	findings: FindingListItem[];
	loading?: boolean;
	error?: string;
}

const ROW_HEIGHT = 56;
const TABLE_HEIGHT = 600;

const getSeverityConfig = (severity: FindingSeverity) => {
	switch (severity) {
		case "CRITICAL":
			return {
				bg: "bg-red-500/10",
				text: "text-red-400",
				icon: AlertTriangle,
			};
		case "HIGH":
			return {
				bg: "bg-orange-500/10",
				text: "text-orange-400",
				icon: AlertTriangle,
			};
		case "MEDIUM":
			return {
				bg: "bg-yellow-500/10",
				text: "text-yellow-400",
				icon: AlertCircle,
			};
		case "LOW":
			return { bg: "bg-zinc-500/10", text: "text-zinc-400", icon: Info };
		default:
			return {
				bg: "bg-blue-500/10",
				text: "text-blue-400",
				icon: Shield,
			};
	}
};

const formatDate = (date: string) => {
	try {
		return new Date(date).toLocaleDateString();
	} catch {
		return date;
	}
};

/** Memoized table row for mobile - card layout */
const FindingRowMobile = memo(function FindingRowMobile({
	finding,
}: {
	finding: FindingListItem;
}) {
	const config = getSeverityConfig(finding.severity);
	const Icon = config.icon;

	return (
		<Link
			href={`/findings/${finding.id}`}
			className="block p-3 border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors"
		>
			<div className="flex items-start justify-between gap-2 mb-2">
				<span
					className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
				>
					<Icon className="w-3 h-3" />
					{finding.severity}
				</span>
				<span className="text-xs text-zinc-500">
					{formatDate(finding.createdAt)}
				</span>
			</div>
			<p className="text-sm text-zinc-100 line-clamp-2 mb-1">
				{finding.title}
			</p>
			<div className="flex items-center gap-2 text-xs text-zinc-500">
				<span>{finding.category}</span>
				<span>•</span>
				<span>{finding.source}</span>
				{finding.hasAIAnalysis && (
					<span className="px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400">
						AI
					</span>
				)}
			</div>
		</Link>
	);
});

/** Memoized table row for desktop */
const FindingRow = memo(function FindingRow({
	finding,
}: {
	finding: FindingListItem;
}) {
	const config = getSeverityConfig(finding.severity);
	const Icon = config.icon;

	return (
		<div className="flex items-center hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50">
			<div className="px-4 py-3 w-24 shrink-0">
				<span
					className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}
				>
					<Icon className="w-3 h-3" />
					{finding.severity}
				</span>
			</div>
			<div className="px-4 py-3 flex-1 min-w-0">
				<Link
					href={`/findings/${finding.id}`}
					className="text-sm text-zinc-100 hover:text-violet-400 transition-colors truncate block"
				>
					{finding.title}
				</Link>
				{finding.hasAIAnalysis && (
					<span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-violet-500/10 text-violet-400">
						AI
					</span>
				)}
			</div>
			<div className="px-4 py-3 w-28 text-sm text-zinc-400 truncate shrink-0">
				{finding.category}
			</div>
			<div className="px-4 py-3 w-24 text-sm text-zinc-500 shrink-0">
				{finding.source}
			</div>
			<div className="px-4 py-3 w-28 text-sm text-zinc-500 shrink-0">
				{formatDate(finding.createdAt)}
			</div>
			<div className="px-4 py-3 w-10 shrink-0">
				<Link
					href={`/findings/${finding.id}`}
					className="p-1.5 rounded hover:bg-zinc-700 text-zinc-500 hover:text-zinc-300 transition-colors inline-block"
				>
					<ExternalLink className="w-4 h-4" />
				</Link>
			</div>
		</div>
	);
});

export function FindingsTable({
	findings,
	loading,
	error,
}: FindingsTableProps) {
	const renderRow = useCallback(
		(finding: FindingListItem) => <FindingRow finding={finding} />,
		[],
	);

	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
				<div className="p-4 space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded w-16" />
							<div className="h-4 bg-zinc-800 rounded flex-1" />
							<div className="h-4 bg-zinc-800 rounded w-24" />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-red-900/50 p-6">
				<p className="text-red-400 text-sm">{error}</p>
			</div>
		);
	}

	if (findings.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 sm:p-12 text-center">
				<Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
				<h3 className="text-lg font-medium text-zinc-300">
					No findings
				</h3>
				<p className="text-zinc-500 mt-2 text-sm">
					No security findings match your current filters
				</p>
			</div>
		);
	}

	// Mobile card layout
	const mobileList = (
		<div className="sm:hidden bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
			{findings.map((finding) => (
				<FindingRowMobile key={finding.id} finding={finding} />
			))}
		</div>
	);

	// Desktop table
	const header = (
		<div className="flex">
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-24 shrink-0">
				Severity
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase flex-1">
				Title
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-28 shrink-0">
				Category
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-24 shrink-0">
				Source
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-28 shrink-0">
				Created
			</div>
			<div className="px-4 py-3 w-10 shrink-0" />
		</div>
	);

	const desktopTable = (
		<div className="hidden sm:block">
			<VirtualizedTable
				items={findings}
				height={TABLE_HEIGHT}
				rowHeight={ROW_HEIGHT}
				header={header}
				renderRow={renderRow}
				emptyState={null}
			/>
		</div>
	);

	return (
		<>
			{mobileList}
			{desktopTable}
		</>
	);
}
