"use client";

import { memo, useCallback } from "react";
import { Folder, ExternalLink, Lock, FileWarning } from "lucide-react";
import { VirtualizedTable } from "@/components/ui/VirtualizedTable";
import { Perspective } from "../PerspectiveToggle";
import type { DirectoryResultWithAI } from "@/types/ai-context";

interface DirectoryResultsProps {
	results: DirectoryResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

const ROW_HEIGHT = 40;
const TABLE_HEIGHT = 500;

const getStatusColor = (code: number) => {
	if (code >= 200 && code < 300) return "text-emerald-400";
	if (code >= 300 && code < 400) return "text-blue-400";
	if (code >= 400 && code < 500) return "text-yellow-400";
	if (code >= 500) return "text-red-400";
	return "text-zinc-400";
};

const isSensitivePath = (path: string) => {
	const sensitive = [
		"/admin",
		"/wp-admin",
		"/phpmyadmin",
		"/.git",
		"/.env",
		"/config",
		"/backup",
		"/api/internal",
		"/debug",
		"/swagger",
		"/graphql",
	];
	return sensitive.some((s) => path.toLowerCase().includes(s));
};

/** Memoized directory row */
const DirectoryRow = memo(function DirectoryRow({
	result,
	perspective,
}: {
	result: DirectoryResultWithAI;
	perspective: Perspective;
}) {
	const aiContext =
		result.ai?.[perspective === "attacker" ? "attacker" : "defender"];
	const hasAI = !!aiContext;
	const isSensitive = isSensitivePath(result.path);

	return (
		<div className="flex items-center hover:bg-zinc-800/50 border-b border-zinc-800/50">
			<div className="px-4 py-2 flex-1 flex items-center gap-2 min-w-0 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
				<Folder
					className={`w-4 h-4 shrink-0 ${isSensitive && perspective === "attacker" ? "text-red-400" : "text-zinc-500"}`}
				/>
				<span
					className={`font-mono text-sm ${isSensitive && perspective === "attacker" ? "text-red-400" : "text-zinc-100"}`}
				>
					{result.path}
				</span>
				{isSensitive && (
					<Lock className="w-3 h-3 text-yellow-500 shrink-0" />
				)}
			</div>
			<div className="px-4 py-2 w-20">
				<span
					className={`font-mono text-sm font-medium ${getStatusColor(result.statusCode)}`}
				>
					{result.statusCode}
				</span>
			</div>
			<div className="px-4 py-2 w-28 text-sm text-zinc-400 font-mono">
				{result.contentLength
					? `${(result.contentLength / 1024).toFixed(1)}KB`
					: "—"}
			</div>
			<div className="px-4 py-2 w-32 text-sm text-zinc-500 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
				{result.contentType || "—"}
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

export function DirectoryResults({
	results,
	perspective,
	loading,
	error,
}: DirectoryResultsProps) {
	const renderRow = useCallback(
		(result: DirectoryResultWithAI) => (
			<DirectoryRow result={result} perspective={perspective} />
		),
		[perspective],
	);

	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
				<div className="space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded flex-1" />
							<div className="h-4 bg-zinc-800 rounded w-16" />
							<div className="h-4 bg-zinc-800 rounded w-20" />
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
			<Folder className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
			<p className="text-zinc-500">No directories discovered</p>
		</div>
	);

	const header = (
		<div className="flex">
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase flex-1">
				Path
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-20">
				Status
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-28">
				Size
			</div>
			<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-32">
				Type
			</div>
			{perspective !== "neutral" && (
				<div className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase w-48">
					{perspective === "attacker"
						? "Exposure Risk"
						: "Hardening Notes"}
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
