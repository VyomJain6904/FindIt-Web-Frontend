import { Briefcase, TrendingUp, AlertTriangle } from "lucide-react";
import type { AIFinding } from "@/types";

interface ExecutiveSummaryTabProps {
	finding: AIFinding | null;
}

export function ExecutiveSummaryTab({ finding }: ExecutiveSummaryTabProps) {
	if (!finding || !finding.aiAnalysis) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<AlertTriangle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
				<p className="text-zinc-500">No executive summary available</p>
			</div>
		);
	}

	// Extract risk score from confidence (0-1 to 0-10 scale)
	const riskScore =
		finding.confidenceScore !== undefined
			? Math.round(finding.confidenceScore * 10)
			: null;

	const getRiskColor = (score: number) => {
		if (score >= 8) return "text-red-400";
		if (score >= 6) return "text-orange-400";
		if (score >= 4) return "text-yellow-400";
		return "text-emerald-400";
	};

	const getRiskLabel = (score: number) => {
		if (score >= 8) return "Critical Risk";
		if (score >= 6) return "High Risk";
		if (score >= 4) return "Moderate Risk";
		return "Low Risk";
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-violet-500/10">
						<Briefcase className="w-5 h-5 text-violet-400" />
					</div>
					<h2 className="text-lg font-bold text-violet-400">
						Executive Summary
					</h2>
				</div>
				<p className="text-sm text-zinc-400">
					Plain-language summary for management and stakeholders.
				</p>
			</div>

			{/* Risk Score */}
			{riskScore !== null && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-zinc-300 mb-1">
								Risk Assessment
							</h3>
							<p
								className={`text-lg font-bold ${getRiskColor(riskScore)}`}
							>
								{getRiskLabel(riskScore)}
							</p>
						</div>
						<div className="text-right">
							<div className="flex items-center gap-2">
								<TrendingUp
									className={`w-5 h-5 ${getRiskColor(riskScore)}`}
								/>
								<span
									className={`text-3xl font-bold ${getRiskColor(riskScore)}`}
								>
									{riskScore}
								</span>
								<span className="text-zinc-500 text-sm">
									/10
								</span>
							</div>
						</div>
					</div>

					{/* Visual bar */}
					<div className="mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full ${
								riskScore >= 8
									? "bg-red-500"
									: riskScore >= 6
										? "bg-orange-500"
										: riskScore >= 4
											? "bg-yellow-500"
											: "bg-emerald-500"
							}`}
							style={{ width: `${riskScore * 10}%` }}
						/>
					</div>
				</div>
			)}

			{/* Summary */}
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
				<h3 className="text-sm font-medium text-zinc-300 mb-4">
					Summary
				</h3>
				<p className="text-zinc-400 leading-relaxed">
					{finding.aiAnalysis}
				</p>
			</div>

			{/* Key Takeaways */}
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
				<h3 className="text-sm font-medium text-zinc-300 mb-4">
					Key Points
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 bg-zinc-800/50 rounded-lg">
						<span className="text-xs text-zinc-500">
							Finding Type
						</span>
						<p className="text-sm text-zinc-200 mt-1">
							{finding.category}
						</p>
					</div>
					<div className="p-4 bg-zinc-800/50 rounded-lg">
						<span className="text-xs text-zinc-500">
							Severity Level
						</span>
						<p className="text-sm text-zinc-200 mt-1">
							{finding.severity}
						</p>
					</div>
					<div className="p-4 bg-zinc-800/50 rounded-lg">
						<span className="text-xs text-zinc-500">
							Affected System
						</span>
						<p className="text-sm text-zinc-200 mt-1 truncate">
							{finding.asset}
						</p>
					</div>
					{finding.falsePositiveLikelihood !== undefined && (
						<div className="p-4 bg-zinc-800/50 rounded-lg">
							<span className="text-xs text-zinc-500">
								False Positive Risk
							</span>
							<p className="text-sm text-zinc-200 mt-1">
								{Math.round(
									finding.falsePositiveLikelihood * 100,
								)}
								%
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Confidence Indicator */}
			{finding.confidenceScore !== undefined && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3">
						AI Confidence Level
					</h3>
					<div className="flex items-center gap-4">
						<div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
							<div
								className="h-full bg-violet-500 rounded-full transition-all"
								style={{
									width: `${finding.confidenceScore * 100}%`,
								}}
							/>
						</div>
						<span className="text-sm font-medium text-zinc-100 w-12 text-right">
							{Math.round(finding.confidenceScore * 100)}%
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
