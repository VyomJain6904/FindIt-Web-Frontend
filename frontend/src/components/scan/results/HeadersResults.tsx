import { Check, X, AlertTriangle } from "lucide-react";
import { Perspective } from "../PerspectiveToggle";
import type { HeaderResultWithAI } from "@/types/ai-context";

interface HeadersResultsProps {
	results: HeaderResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

export function HeadersResults({
	results,
	perspective,
	loading,
	error,
}: HeadersResultsProps) {
	if (loading) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8">
				<div className="space-y-3">
					{[...Array(5)].map((_, i) => (
						<div key={i} className="animate-pulse flex gap-4">
							<div className="h-4 bg-zinc-800 rounded w-1/3" />
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

	if (results.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<p className="text-zinc-500">No header analysis results</p>
			</div>
		);
	}

	// Separate present and missing for defender view
	const missingHeaders = results.filter((r) => !r.present);
	const presentHeaders = results.filter((r) => r.present);

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
			{perspective === "attacker" && missingHeaders.length > 0 && (
				<div className="p-4 bg-red-500/5 border-b border-red-500/20">
					<div className="flex items-center gap-2 text-red-400 text-sm font-medium">
						<AlertTriangle className="w-4 h-4" />
						{missingHeaders.length} Security Headers Missing
					</div>
				</div>
			)}

			{perspective === "defender" && missingHeaders.length > 0 && (
				<div className="p-4 bg-blue-500/5 border-b border-blue-500/20">
					<div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
						<AlertTriangle className="w-4 h-4" />
						{missingHeaders.length} Headers Need Configuration
					</div>
				</div>
			)}

			<table className="w-full">
				<thead>
					<tr className="border-b border-zinc-800">
						<th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
							Header
						</th>
						<th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
							Status
						</th>
						{perspective !== "neutral" && (
							<th className="px-4 py-3 text-left text-xs font-medium text-zinc-400 uppercase">
								{perspective === "attacker"
									? "Attack Impact"
									: "Remediation"}
							</th>
						)}
					</tr>
				</thead>
				<tbody className="divide-y divide-zinc-800">
					{results.map((result, index) => {
						const aiContext =
							result.ai?.[
								perspective === "attacker"
									? "attacker"
									: "defender"
							];
						const hasAI = !!aiContext;

						return (
							<tr
								key={`${result.name}-${index}`}
								className={`hover:bg-zinc-800/50 ${
									!result.present &&
									perspective === "attacker"
										? "bg-red-500/5"
										: ""
								}`}
							>
								<td className="px-4 py-3 font-mono text-sm text-zinc-100">
									{result.name}
								</td>
								<td className="px-4 py-3">
									{result.present ? (
										<span className="inline-flex items-center gap-1 text-emerald-400 text-sm">
											<Check className="w-4 h-4" />
											Present
										</span>
									) : (
										<span className="inline-flex items-center gap-1 text-red-400 text-sm">
											<X className="w-4 h-4" />
											Missing
										</span>
									)}
								</td>
								{perspective !== "neutral" && (
									<td className="px-4 py-3 text-sm">
										{hasAI ? (
											perspective === "attacker" ? (
												<span className="text-red-400 text-xs">
													{result.ai?.attacker
														?.exposureValue ||
														result.ai?.attacker
															?.attackSurface}
												</span>
											) : (
												<span className="text-blue-400 text-xs">
													{
														result.ai?.defender
															?.hardeningRecommendation
													}
												</span>
											)
										) : (
											<span className="text-zinc-600 text-xs italic">
												No AI analysis
											</span>
										)}
									</td>
								)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
