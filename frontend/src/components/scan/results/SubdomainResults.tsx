"use client";

import { memo, useCallback } from "react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import { Perspective } from "../PerspectiveToggle";
import type { SubdomainResultWithAI } from "@/types/ai-context";

interface SubdomainResultsProps {
	results: SubdomainResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

const ROW_HEIGHT = 48;
const TABLE_HEIGHT = 500;

/** Memoized subdomain row */
const SubdomainRow = memo(function SubdomainRow({
	result,
	perspective,
	index,
}: {
	result: SubdomainResultWithAI;
	perspective: Perspective;
	index: number;
}) {
	const aiContext =
		result.ai?.[perspective === "attacker" ? "attacker" : "defender"];
	const hasAI = !!aiContext;

	return (
		<div className="flex items-center hover:bg-zinc-800/50 border-b border-zinc-800/50">
			<div className="px-4 py-3 flex-1 font-mono text-sm text-zinc-100 truncate">
				{result.subdomain}
			</div>
			<div className="px-4 py-3 w-36 font-mono text-sm text-zinc-400">
				{result.ip || "—"}
			</div>
			<div className="px-4 py-3 w-20">
				<span
					className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
						result.alive
							? "bg-emerald-500/10 text-emerald-400"
							: "bg-zinc-700 text-zinc-400"
					}`}
				>
					{result.alive ? "Alive" : "Dead"}
				</span>
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-3 w-48 text-xs truncate">
					{hasAI ? (
						perspective === "attacker" ? (
							<span className="text-red-400">
								{result.ai?.attacker?.exposureValue ||
									result.ai?.attacker?.attackSurface}
							</span>
						) : (
							<span className="text-blue-400">
								{result.ai?.defender?.monitoringGap ||
									result.ai?.defender
										?.hardeningRecommendation}
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

export function SubdomainResults({
	results,
	perspective,
	loading,
	error,
}: SubdomainResultsProps) {
	const renderRow = useCallback(
		(result: SubdomainResultWithAI, index: number) => (
			<SubdomainRow
				result={result}
				perspective={perspective}
				index={index}
			/>
		),
		[perspective],
	);

	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
				<div className="space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded w-1/3" />
							<div className="h-4 bg-zinc-800 rounded w-1/4" />
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
			<p className="text-zinc-500">No subdomains discovered</p>
		</div>
	);

	const header = (
		<div className="flex">
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase flex-1">
				Subdomain
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-36">
				IP Address
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-20">
				Status
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-48">
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
