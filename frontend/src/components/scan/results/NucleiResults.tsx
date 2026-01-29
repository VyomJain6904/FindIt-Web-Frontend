import {
	AlertTriangle,
	AlertCircle,
	Info,
	Shield,
	Sword,
	ShieldCheck,
} from "lucide-react";
import { Perspective } from "../PerspectiveToggle";
import type { NucleiResultWithAI } from "@/types/ai-context";

interface NucleiResultsProps {
	results: NucleiResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

export function NucleiResults({
	results,
	perspective,
	loading,
	error,
}: NucleiResultsProps) {
	const getSeverityConfig = (severity: string) => {
		const sev = severity.toUpperCase();
		switch (sev) {
			case "CRITICAL":
				return {
					bg: "bg-red-500/10",
					border: "border-red-500/20",
					text: "text-red-400",
					icon: AlertTriangle,
				};
			case "HIGH":
				return {
					bg: "bg-orange-500/10",
					border: "border-orange-500/20",
					text: "text-orange-400",
					icon: AlertTriangle,
				};
			case "MEDIUM":
				return {
					bg: "bg-yellow-500/10",
					border: "border-yellow-500/20",
					text: "text-yellow-400",
					icon: AlertCircle,
				};
			case "LOW":
				return {
					bg: "bg-blue-500/10",
					border: "border-blue-500/20",
					text: "text-blue-400",
					icon: Info,
				};
			default:
				return {
					bg: "bg-zinc-500/10",
					border: "border-zinc-500/20",
					text: "text-zinc-400",
					icon: Shield,
				};
		}
	};

	if (loading) {
		return (
			<div className="space-y-3">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="animate-pulse bg-zinc-900 rounded-xl border border-zinc-800 p-4"
					>
						<div className="flex gap-3">
							<div className="w-5 h-5 bg-zinc-800 rounded" />
							<div className="flex-1">
								<div className="h-4 bg-zinc-800 rounded w-1/3 mb-2" />
								<div className="h-3 bg-zinc-800 rounded w-2/3" />
							</div>
						</div>
					</div>
				))}
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

	if (results.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
				<p className="text-zinc-300 font-medium">
					No vulnerabilities detected
				</p>
				<p className="text-zinc-500 text-sm mt-1">
					Nuclei scan completed without findings
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{results.map((result, index) => {
				const config = getSeverityConfig(result.severity);
				const Icon = config.icon;
				const aiContext =
					result.ai?.[
						perspective === "attacker" ? "attacker" : "defender"
					];
				const hasAI = !!aiContext;

				return (
					<div
						key={`${result.templateId}-${index}`}
						className={`${config.bg} border ${config.border} rounded-xl p-4`}
					>
						<div className="flex items-start gap-3">
							<Icon
								className={`w-5 h-5 ${config.text} mt-0.5 shrink-0`}
							/>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 flex-wrap">
									<span className="font-mono text-sm text-zinc-100">
										{result.templateId}
									</span>
									<span
										className={`px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}
									>
										{result.severity.toUpperCase()}
									</span>
									{result.tags?.map((tag) => (
										<span
											key={tag}
											className="px-1.5 py-0.5 rounded text-xs bg-zinc-800 text-zinc-400"
										>
											{tag}
										</span>
									))}
								</div>

								<p className="text-sm text-zinc-400 mt-1 break-all">
									{result.matchedUrl}
								</p>

								{result.evidence && (
									<pre className="mt-3 p-3 bg-zinc-950 rounded text-xs text-zinc-400 overflow-x-auto">
										{result.evidence}
									</pre>
								)}

								{/* Perspective-specific content */}
								{perspective !== "neutral" && hasAI && (
									<div className="mt-4 pt-4 border-t border-zinc-800/50">
										{perspective === "attacker" ? (
											<div className="space-y-2">
												<div className="flex items-center gap-2 text-red-400 text-xs font-medium">
													<Sword className="w-3 h-3" />
													Attacker Analysis
												</div>
												{result.ai?.attacker
													?.attackNarrative && (
													<p className="text-xs text-zinc-300">
														{
															result.ai.attacker
																.attackNarrative
														}
													</p>
												)}
												{result.ai?.attacker
													?.exploitability && (
													<p className="text-xs text-red-400">
														Exploitability:{" "}
														{
															result.ai.attacker
																.exploitability
														}
													</p>
												)}
												{result.ai?.attacker
													?.chainOpportunities &&
													result.ai.attacker
														.chainOpportunities
														.length > 0 && (
														<div className="text-xs">
															<span className="text-zinc-500">
																Chaining:{" "}
															</span>
															<span className="text-red-400">
																{result.ai.attacker.chainOpportunities.join(
																	" → ",
																)}
															</span>
														</div>
													)}
											</div>
										) : (
											<div className="space-y-2">
												<div className="flex items-center gap-2 text-blue-400 text-xs font-medium">
													<ShieldCheck className="w-3 h-3" />
													Defender Analysis
												</div>
												{result.ai?.defender
													?.hardeningRecommendation && (
													<p className="text-xs text-zinc-300">
														<span className="text-zinc-500">
															Mitigation:{" "}
														</span>
														{
															result.ai.defender
																.hardeningRecommendation
														}
													</p>
												)}
												{result.ai?.defender
													?.detectionStrategy && (
													<p className="text-xs text-blue-400">
														Detection:{" "}
														{
															result.ai.defender
																.detectionStrategy
														}
													</p>
												)}
												{result.ai?.defender
													?.remediationPriority && (
													<span
														className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${
															result.ai.defender
																.remediationPriority ===
															"critical"
																? "bg-red-500/10 text-red-400"
																: result.ai
																			.defender
																			.remediationPriority ===
																	  "high"
																	? "bg-orange-500/10 text-orange-400"
																	: "bg-blue-500/10 text-blue-400"
														}`}
													>
														Priority:{" "}
														{
															result.ai.defender
																.remediationPriority
														}
													</span>
												)}
											</div>
										)}
									</div>
								)}

								{perspective !== "neutral" && !hasAI && (
									<p className="mt-3 text-xs text-zinc-600 italic">
										No AI analysis available for this
										finding
									</p>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
