"use client";

import { useState, useEffect } from "react";
import { ScanState } from "@/types";
import { Globe, Clock, Activity, AlertCircle } from "lucide-react";

interface ScanHeaderProps {
	scan: ScanState;
}

export function ScanHeader({ scan }: ScanHeaderProps) {
	// Use state to avoid hydration mismatch with date formatting
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const getStatusColor = (status: ScanState["status"]) => {
		switch (status) {
			case "RUNNING":
				return "bg-blue-500/10 text-blue-400 border-blue-500/20";
			case "COMPLETED":
				return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
			case "FAILED":
				return "bg-red-500/10 text-red-400 border-red-500/20";
			case "CANCELLED":
				return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
			default:
				return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
		}
	};

	const getStatusIcon = (status: ScanState["status"]) => {
		switch (status) {
			case "RUNNING":
				return <Activity className="w-4 h-4 animate-pulse" />;
			case "COMPLETED":
				return <Activity className="w-4 h-4" />;
			case "FAILED":
				return <AlertCircle className="w-4 h-4" />;
			default:
				return <Clock className="w-4 h-4" />;
		}
	};

	// Use consistent date format to avoid hydration mismatch
	const formatDate = (dateString: string) => {
		if (!mounted) return "...";
		try {
			const date = new Date(dateString);
			// Use explicit format to avoid locale differences
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			});
		} catch {
			return dateString;
		}
	};

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
				{/* Target Info */}
				<div className="flex items-center gap-3 sm:gap-4 min-w-0">
					<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
						<Globe className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400" />
					</div>
					<div className="min-w-0">
						<h1 className="text-lg sm:text-xl font-bold text-zinc-100 truncate">
							{scan.target}
						</h1>
						<div className="flex items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm text-zinc-400">
							<span className="capitalize">
								{scan.type.toLowerCase()} scan
							</span>
							<span className="text-zinc-600 hidden sm:inline">
								•
							</span>
							<span className="hidden sm:inline">
								Started {formatDate(scan.startedAt)}
							</span>
						</div>
					</div>
				</div>

				{/* Status Badge */}
				<div
					className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shrink-0 ${getStatusColor(
						scan.status,
					)}`}
				>
					{getStatusIcon(scan.status)}
					<span className="text-sm font-medium capitalize">
						{scan.status.toLowerCase()}
					</span>
				</div>
			</div>

			{/* Stats Row */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zinc-800">
				<div className="min-w-0">
					<p className="text-xs sm:text-sm text-zinc-500">Scan ID</p>
					<p className="text-xs sm:text-sm font-mono text-zinc-300 mt-1 truncate">
						{scan.id}
					</p>
				</div>
				<div>
					<p className="text-xs sm:text-sm text-zinc-500">Findings</p>
					<p className="text-base sm:text-lg font-bold text-zinc-100 mt-1">
						{scan.findingCount}
					</p>
				</div>
				<div className="col-span-2 sm:col-span-1">
					<p className="text-xs sm:text-sm text-zinc-500">
						Completed
					</p>
					<p className="text-xs sm:text-sm text-zinc-300 mt-1">
						{scan.completedAt
							? formatDate(scan.completedAt)
							: "In progress..."}
					</p>
				</div>
			</div>
		</div>
	);
}
