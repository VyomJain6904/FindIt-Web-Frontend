"use client";

import { memo, useCallback } from "react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import { Perspective } from "../PerspectiveToggle";
import type { CloudResultWithAI } from "@/types/cloud";

interface CloudResultsProps {
	results: CloudResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

const ROW_HEIGHT = 40;
const TABLE_HEIGHT = 500;

/** Memoized cloud asset row */
const CloudRow = memo(function CloudRow({
	result,
	perspective,
}: {
	result: CloudResultWithAI;
	perspective: Perspective;
	index: number;
}) {
	const aiContext =
		result.ai?.[perspective === "attacker" ? "attacker" : "defender"];
	const hasAI = !!aiContext;

	return (
		<div className="flex items-center hover:bg-zinc-800/50 border-b border-zinc-800/50">
			<div className="px-4 py-2 w-24 text-sm text-zinc-100">
				<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-violet-500/10 text-violet-400">
					{result.provider}
				</span>
			</div>
			<div className="px-4 py-2 w-28 text-sm text-zinc-300">
				{result.service}
			</div>
			<div className="px-4 py-2 flex-1 font-mono text-sm text-zinc-100 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
				{result.resource_name}
			</div>
			<div className="px-4 py-2 w-24 text-sm text-zinc-400">
				{result.region || "—"}
			</div>
			<div className="px-4 py-2 w-48 font-mono text-xs text-zinc-500 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
				{result.endpoint || "—"}
			</div>
			<div className="px-4 py-2 w-20">
				{result.public_access !== undefined && (
					<span
						className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
							result.public_access
								? "bg-red-500/10 text-red-400"
								: "bg-emerald-500/10 text-emerald-400"
						}`}
					>
						{result.public_access ? "Public" : "Private"}
					</span>
				)}
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-2 w-48 text-xs overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
					{hasAI ? (
						perspective === "attacker" ? (
							<span className="text-red-400">
								{result.ai?.attacker?.exposureValue ||
									result.ai?.attacker?.attackSurface}
							</span>
						) : (
							<span className="text-blue-400">
								{result.ai?.defender?.hardeningRecommendation ||
									result.ai?.defender?.monitoringGap}
							</span>
						)
					) : (
						<span className="text-zinc-600 italic">No AI</span>
					)}
				</div>
			)}
		</div>
	);
});

export function CloudResults({
	results,
	perspective,
	loading,
	error,
}: CloudResultsProps) {
	const renderRow = useCallback(
		(result: CloudResultWithAI, index: number) => (
			<CloudRow result={result} perspective={perspective} index={index} />
		),
		[perspective],
	);

	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
				<div className="space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded w-20" />
							<div className="h-4 bg-zinc-800 rounded w-24" />
							<div className="h-4 bg-zinc-800 rounded w-1/3" />
							<div className="h-4 bg-zinc-800 rounded w-16" />
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

	const emptyState = (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
			<p className="text-zinc-500">No cloud assets discovered</p>
		</div>
	);

	const header = (
		<div className="flex">
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-24">
				Provider
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-28">
				Service
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase flex-1">
				Resource Name
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-24">
				Region
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-48">
				Endpoint
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-20">
				Access
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-48">
					{perspective === "attacker"
						? "Attack Surface"
						: "Defense Notes"}
				</div>
			)}
		</div>
	);

	return (
		<VirtualizedTable
			items={results}
			height={TABLE_HEIGHT}
			rowHeight={ROW_HEIGHT}
			header={header}
			renderRow={renderRow}
			emptyState={emptyState}
		/>
	);
}
