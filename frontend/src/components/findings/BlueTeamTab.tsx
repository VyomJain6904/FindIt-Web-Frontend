import {
	Shield,
	Eye,
	Wrench,
	CheckCircle,
	AlertTriangle,
	ExternalLink,
} from "lucide-react";
import type { AIFinding } from "@/types";

interface BlueTeamTabProps {
	finding: AIFinding | null;
}

export function BlueTeamTab({ finding }: BlueTeamTabProps) {
	if (!finding || !finding.blueTeamAnalysis) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<AlertTriangle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
				<p className="text-zinc-500">No blue team analysis available</p>
			</div>
		);
	}

	const blue = finding.blueTeamAnalysis;

	const getPriorityColor = (priority?: string) => {
		switch (priority) {
			case "IMMEDIATE":
				return "bg-red-500/10 text-red-400 border-red-500/30";
			case "SHORT_TERM":
				return "bg-orange-500/10 text-orange-400 border-orange-500/30";
			case "LONG_TERM":
				return "bg-blue-500/10 text-blue-400 border-blue-500/30";
			default:
				return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-blue-500/10">
						<Shield className="w-5 h-5 text-blue-400" />
					</div>
					<h2 className="text-lg font-bold text-blue-400">
						Defensive Analysis
					</h2>
				</div>
				<p className="text-sm text-zinc-400">
					SOC and incident response recommendations.
				</p>
			</div>

			{/* Priority Badge */}
			{blue.priority && (
				<div
					className={`${getPriorityColor(
						blue.priority,
					)} border rounded-xl p-4 flex items-center gap-3`}
				>
					<AlertTriangle className="w-5 h-5" />
					<div>
						<span className="text-sm font-medium">
							Remediation Priority:
						</span>
						<span className="ml-2 text-sm">
							{blue.priority.replace("_", " ")}
						</span>
					</div>
				</div>
			)}

			{/* Mitigation */}
			{blue.mitigation && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
						<Wrench className="w-4 h-4 text-blue-400" />
						Mitigation Steps
					</h3>
					<p className="text-sm text-zinc-400 whitespace-pre-wrap">
						{blue.mitigation}
					</p>
				</div>
			)}

			{/* Defense Strategy */}
			{blue.defenseStrategy && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
						<Shield className="w-4 h-4 text-blue-400" />
						Defense Strategy
					</h3>
					<p className="text-sm text-zinc-400">
						{blue.defenseStrategy}
					</p>
				</div>
			)}

			{/* Detection Checklist */}
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
				<h3 className="text-sm font-medium text-zinc-300 mb-4 flex items-center gap-2">
					<Eye className="w-4 h-4 text-blue-400" />
					Detection Checklist
				</h3>
				<div className="space-y-3">
					{blue.cvssScore !== undefined && (
						<div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
							<CheckCircle className="w-4 h-4 text-blue-400" />
							<span className="text-sm text-zinc-300">
								CVSS Score: {blue.cvssScore}
							</span>
						</div>
					)}
					{blue.cveId && (
						<div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
							<CheckCircle className="w-4 h-4 text-blue-400" />
							<span className="text-sm text-zinc-300">
								CVE: {blue.cveId}
							</span>
						</div>
					)}
					{blue.cweId && (
						<div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
							<CheckCircle className="w-4 h-4 text-blue-400" />
							<span className="text-sm text-zinc-300">
								CWE: {blue.cweId}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* References */}
			{blue.references && blue.references.length > 0 && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3">
						References
					</h3>
					<div className="space-y-2">
						{blue.references.map((ref, index) => (
							<a
								key={index}
								href={ref}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
							>
								<ExternalLink className="w-3 h-3" />
								{ref}
							</a>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
