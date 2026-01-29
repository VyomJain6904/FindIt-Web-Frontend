"use client";

import { memo, useCallback } from "react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import { Perspective } from "../PerspectiveToggle";
import type { PortResultWithAI } from "@/types/ai-context";

interface PortResultsProps {
	results: PortResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

const ROW_HEIGHT = 48;
const TABLE_HEIGHT = 500;

/** Memoized port row */
const PortRow = memo(function PortRow({
	result,
	perspective,
}: {
	result: PortResultWithAI;
	perspective: Perspective;
}) {
	const aiContext =
		result.ai?.[perspective === "attacker" ? "attacker" : "defender"];
	const hasAI = !!aiContext;

	return (
		<div className="flex items-center hover:bg-zinc-800/50 border-b border-zinc-800/50">
			<div className="px-4 py-3 w-20 font-mono text-sm text-zinc-100">
				<span
					className={
						perspective === "attacker" && hasAI
							? "text-red-400 font-bold"
							: ""
					}
				>
					{result.port}
				</span>
			</div>
			<div className="px-4 py-3 w-20 text-sm text-zinc-400 uppercase">
				{result.protocol}
			</div>
			<div className="px-4 py-3 flex-1 text-sm text-zinc-300">
				{result.service || "—"}
			</div>
			<div className="px-4 py-3 w-28 text-sm text-zinc-400">
				{result.version || "—"}
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-3 w-48 text-xs truncate">
					{hasAI ? (
						perspective === "attacker" ? (
							<span className="text-red-400">
								{result.ai?.attacker?.exposureValue ||
									result.ai?.attacker?.exploitability}
							</span>
						) : (
							<span className="text-blue-400">
								{result.ai?.defender?.remediationPriority ||
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

export function PortResults({
	results,
	perspective,
	loading,
	error,
}: PortResultsProps) {
	const renderRow = useCallback(
		(result: PortResultWithAI) => (
			<PortRow result={result} perspective={perspective} />
		),
		[perspective],
	);

	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
				<div className="space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded w-16" />
							<div className="h-4 bg-zinc-800 rounded w-20" />
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

	const emptyState = (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
			<p className="text-zinc-500">No open ports discovered</p>
		</div>
	);

	const header = (
		<div className="flex">
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-20">
				Port
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-20">
				Protocol
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase flex-1">
				Service
			</div>
			<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-28">
				Version
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase w-48">
					{perspective === "attacker" ? "Exposure Risk" : "Hardening"}
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
