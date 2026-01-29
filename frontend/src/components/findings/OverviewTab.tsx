import {
	AlertTriangle,
	AlertCircle,
	Info,
	Shield,
	FileText,
} from "lucide-react";
import type { Finding, AIFinding, FindingSeverity } from "@/types";

interface OverviewTabProps {
	finding: Finding | AIFinding;
}

export function OverviewTab({ finding }: OverviewTabProps) {
	const getSeverityConfig = (severity: FindingSeverity) => {
		switch (severity) {
			case "CRITICAL":
				return {
					bg: "bg-red-500/10",
					text: "text-red-400",
					border: "border-red-500/30",
				};
			case "HIGH":
				return {
					bg: "bg-orange-500/10",
					text: "text-orange-400",
					border: "border-orange-500/30",
				};
			case "MEDIUM":
				return {
					bg: "bg-yellow-500/10",
					text: "text-yellow-400",
					border: "border-yellow-500/30",
				};
			case "LOW":
				return {
					bg: "bg-zinc-500/10",
					text: "text-zinc-400",
					border: "border-zinc-500/30",
				};
			default:
				return {
					bg: "bg-blue-500/10",
					text: "text-blue-400",
					border: "border-blue-500/30",
				};
		}
	};

	const config = getSeverityConfig(finding.severity);
	const aiFinding = "aiAnalysis" in finding ? (finding as AIFinding) : null;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div
				className={`${config.bg} border ${config.border} rounded-xl p-6`}
			>
				<div className="flex items-start gap-4">
					<div className={`p-3 rounded-lg ${config.bg}`}>
						<AlertTriangle className={`w-6 h-6 ${config.text}`} />
					</div>
					<div className="flex-1">
						<h2 className="text-xl font-bold text-zinc-100">
							{finding.title}
						</h2>
						<div className="flex items-center gap-3 mt-2">
							<span
								className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}
							>
								{finding.severity}
							</span>
							<span className="text-sm text-zinc-400">
								{finding.category}
							</span>
							<span className="text-zinc-600">•</span>
							<span className="text-sm text-zinc-500">
								{finding.source}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Description */}
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
				<h3 className="text-sm font-medium text-zinc-300 mb-3">
					Description
				</h3>
				<p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
					{finding.description}
				</p>
			</div>

			{/* Asset & Confidence */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
					<h3 className="text-xs text-zinc-500 mb-2">
						Affected Asset
					</h3>
					<p className="text-sm font-mono text-zinc-100">
						{finding.asset}
					</p>
					{finding.port && (
						<p className="text-xs text-zinc-500 mt-1">
							Port: {finding.port} ({finding.protocol || "tcp"})
						</p>
					)}
				</div>

				{aiFinding?.confidenceScore !== undefined && (
					<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
						<h3 className="text-xs text-zinc-500 mb-2">
							AI Confidence
						</h3>
						<div className="flex items-center gap-3">
							<div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
								<div
									className="h-full bg-violet-500 rounded-full"
									style={{
										width: `${aiFinding.confidenceScore * 100}%`,
									}}
								/>
							</div>
							<span className="text-sm font-medium text-zinc-100">
								{Math.round(aiFinding.confidenceScore * 100)}%
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Evidence */}
			{finding.evidence && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3">
						Evidence
					</h3>
					<pre className="p-4 bg-zinc-950 rounded-lg text-xs text-zinc-400 overflow-x-auto whitespace-pre-wrap">
						{finding.evidence}
					</pre>
				</div>
			)}

			{/* Raw Data */}
			{finding.raw && Object.keys(finding.raw).length > 0 && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3">
						Raw Data
					</h3>
					<pre className="p-4 bg-zinc-950 rounded-lg text-xs text-zinc-400 overflow-x-auto">
						{JSON.stringify(finding.raw, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
