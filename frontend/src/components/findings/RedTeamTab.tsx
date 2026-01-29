import { Sword, Target, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import type { AIFinding } from "@/types";

interface RedTeamTabProps {
	finding: AIFinding | null;
}

export function RedTeamTab({ finding }: RedTeamTabProps) {
	if (!finding || !finding.redTeamAnalysis) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<AlertTriangle className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
				<p className="text-zinc-500">No red team analysis available</p>
			</div>
		);
	}

	const red = finding.redTeamAnalysis;

	const getSkillColor = (level?: string) => {
		switch (level) {
			case "LOW":
				return "bg-emerald-500/10 text-emerald-400";
			case "MEDIUM":
				return "bg-yellow-500/10 text-yellow-400";
			case "HIGH":
				return "bg-orange-500/10 text-orange-400";
			case "EXPERT":
				return "bg-red-500/10 text-red-400";
			default:
				return "bg-zinc-500/10 text-zinc-400";
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-red-500/10">
						<Sword className="w-5 h-5 text-red-400" />
					</div>
					<h2 className="text-lg font-bold text-red-400">
						Adversarial Analysis
					</h2>
				</div>
				<p className="text-sm text-zinc-400">
					Technical assessment from an attacker&apos;s perspective.
				</p>
			</div>

			{/* Attack Vector */}
			{red.attackVector && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
						<Target className="w-4 h-4 text-red-400" />
						Attack Vector
					</h3>
					<p className="text-sm text-zinc-400">{red.attackVector}</p>
				</div>
			)}

			{/* Exploitability */}
			{red.exploitability && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
						<Zap className="w-4 h-4 text-red-400" />
						Exploitability
					</h3>
					<p className="text-sm text-zinc-400">
						{red.exploitability}
					</p>

					{red.skillLevel && (
						<div className="mt-4">
							<span className="text-xs text-zinc-500 mr-2">
								Required Skill Level:
							</span>
							<span
								className={`px-2 py-1 rounded text-xs font-medium ${getSkillColor(
									red.skillLevel,
								)}`}
							>
								{red.skillLevel}
							</span>
						</div>
					)}
				</div>
			)}

			{/* Steps to Reproduce */}
			{red.stepsToReproduce && red.stepsToReproduce.length > 0 && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-4">
						Attack Chain
					</h3>
					<div className="space-y-3">
						{red.stepsToReproduce.map((step, index) => (
							<div key={index} className="flex items-start gap-3">
								<div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
									<span className="text-xs text-red-400 font-medium">
										{index + 1}
									</span>
								</div>
								<p className="text-sm text-zinc-400 pt-0.5">
									{step}
								</p>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Estimated Impact */}
			{red.estimatedImpact && (
				<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
					<h3 className="text-sm font-medium text-zinc-300 mb-3">
						Estimated Impact
					</h3>
					<p className="text-sm text-zinc-400">
						{red.estimatedImpact}
					</p>
				</div>
			)}
		</div>
	);
}
