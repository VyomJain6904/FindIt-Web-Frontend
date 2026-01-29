"use client";

import { ScanProgressPayload } from "@/types";

type WorkerStatus = "pending" | "running" | "completed" | "failed";

interface WorkerState {
	name: string;
	status: WorkerStatus;
}

interface ScanProgressProps {
	progress: ScanProgressPayload;
	workers: WorkerState[];
}

export function ScanProgress({ progress, workers }: ScanProgressProps) {
	const getWorkerStatusColor = (status: WorkerStatus) => {
		switch (status) {
			case "running":
				return "bg-blue-500 animate-pulse";
			case "completed":
				return "bg-emerald-500";
			case "failed":
				return "bg-red-500";
			default:
				return "bg-zinc-600";
		}
	};

	const getWorkerBadgeStyle = (status: WorkerStatus) => {
		switch (status) {
			case "running":
				return "bg-blue-500/10 text-blue-400 border-blue-500/20";
			case "completed":
				return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
			case "failed":
				return "bg-red-500/10 text-red-400 border-red-500/20";
			default:
				return "bg-zinc-800 text-zinc-400 border-zinc-700";
		}
	};

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6">
			{/* Progress Bar */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<span className="text-sm font-medium text-zinc-300">
						Scan Progress
					</span>
					<span className="text-sm text-zinc-400">
						{progress.progress}%
					</span>
				</div>
				<div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
					<div
						className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
						style={{ width: `${progress.progress}%` }}
					/>
				</div>
				{progress.currentTask && (
					<p className="text-xs text-zinc-500">
						Current: {progress.currentTask}
					</p>
				)}
			</div>

			{/* Worker Status */}
			<div className="mt-6 pt-6 border-t border-zinc-800">
				<h3 className="text-sm font-medium text-zinc-300 mb-4">
					Worker Status
				</h3>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
					{workers.map((worker) => (
						<div
							key={worker.name}
							className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getWorkerBadgeStyle(
								worker.status,
							)}`}
						>
							<div
								className={`w-2 h-2 rounded-full ${getWorkerStatusColor(
									worker.status,
								)}`}
							/>
							<span className="text-xs font-medium capitalize truncate">
								{worker.name.replace("-worker", "")}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
