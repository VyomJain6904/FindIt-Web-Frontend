import { Perspective } from "../PerspectiveToggle";
import type { TechResultWithAI } from "@/types/ai-context";

interface TechResultsProps {
	results: TechResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

export function TechResults({
	results,
	perspective,
	loading,
	error,
}: TechResultsProps) {
	if (loading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="animate-pulse bg-zinc-900 rounded-lg border border-zinc-800 p-4"
					>
						<div className="h-4 bg-zinc-800 rounded w-2/3 mb-2" />
						<div className="h-3 bg-zinc-800 rounded w-1/2" />
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
				<p className="text-zinc-500">No technologies detected</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
			{results.map((result, index) => {
				const aiContext =
					result.ai?.[
						perspective === "attacker" ? "attacker" : "defender"
					];
				const hasAI = !!aiContext;

				return (
					<div
						key={`${result.technology}-${index}`}
						className={`bg-zinc-900 rounded-lg border p-4 transition-colors ${
							perspective === "attacker" && hasAI
								? "border-red-500/30 hover:border-red-500/50"
								: perspective === "defender" && hasAI
									? "border-blue-500/30 hover:border-blue-500/50"
									: "border-zinc-800 hover:border-zinc-700"
						}`}
					>
						<div className="flex items-start justify-between">
							<div>
								<p className="text-sm font-medium text-zinc-100">
									{result.technology}
								</p>
								<p className="text-xs text-zinc-500 mt-1">
									{result.category}
								</p>
								{result.version && (
									<p className="text-xs text-zinc-600 mt-0.5">
										v{result.version}
									</p>
								)}
							</div>
							{result.ai?.attacker?.targetValue &&
								perspective === "attacker" && (
									<span
										className={`px-2 py-0.5 rounded text-xs ${
											result.ai.attacker.targetValue ===
											"high"
												? "bg-red-500/10 text-red-400"
												: result.ai.attacker
															.targetValue ===
													  "medium"
													? "bg-orange-500/10 text-orange-400"
													: "bg-zinc-700 text-zinc-400"
										}`}
									>
										{result.ai.attacker.targetValue}
									</span>
								)}
						</div>

						{perspective !== "neutral" && hasAI && (
							<div className="mt-3 pt-3 border-t border-zinc-800">
								{perspective === "attacker" ? (
									<>
										{result.ai?.attacker?.attackSurface && (
											<p className="text-xs text-red-400">
												{
													result.ai.attacker
														.attackSurface
												}
											</p>
										)}
									</>
								) : (
									<>
										{result.ai?.defender
											?.patchingRelevance && (
											<p className="text-xs text-blue-400">
												{
													result.ai.defender
														.patchingRelevance
												}
											</p>
										)}
									</>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
