import { ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { Perspective } from "../PerspectiveToggle";
import type { TLSResultWithAI } from "@/types/ai-context";

interface TLSResultsProps {
	results: TLSResultWithAI[];
	perspective: Perspective;
	loading?: boolean;
	error?: string;
}

export function TLSResults({
	results,
	perspective,
	loading,
	error,
}: TLSResultsProps) {
	if (loading) {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{[...Array(2)].map((_, i) => (
					<div
						key={i}
						className="animate-pulse bg-zinc-900 rounded-xl border border-zinc-800 p-5"
					>
						<div className="h-4 bg-zinc-800 rounded w-1/3 mb-3" />
						<div className="h-3 bg-zinc-800 rounded w-2/3 mb-2" />
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
				<p className="text-zinc-500">No TLS data available</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
			{results.map((result, index) => {
				const aiContext =
					result.ai?.[
						perspective === "attacker" ? "attacker" : "defender"
					];
				const hasAI = !!aiContext;
				const isExpiringSoon =
					result.daysUntilExpiry !== undefined &&
					result.daysUntilExpiry < 30;

				return (
					<div
						key={`tls-${index}`}
						className={`bg-zinc-900 rounded-xl border p-3 ${
							!result.valid
								? "border-red-900/50"
								: perspective === "attacker" && hasAI
									? "border-red-500/30"
									: perspective === "defender" && hasAI
										? "border-blue-500/30"
										: "border-zinc-800"
						}`}
					>
						<div className="flex items-start justify-between">
							<div>
								<p className="text-sm font-medium text-zinc-100">
									{result.version}
								</p>
								<p className="text-xs text-zinc-500 mt-1">
									{result.issuer}
								</p>
							</div>
							<div className="flex items-center gap-2">
								{isExpiringSoon && (
									<AlertTriangle className="w-4 h-4 text-yellow-400" />
								)}
								{result.valid ? (
									<ShieldCheck className="w-5 h-5 text-emerald-400" />
								) : (
									<ShieldX className="w-5 h-5 text-red-400" />
								)}
							</div>
						</div>

						<div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
							<div className="flex items-center justify-between text-xs">
								<span className="text-zinc-500">Subject</span>
								<span className="text-zinc-300 overflow-x-auto whitespace-nowrap text-right flex-1 ml-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-700/50 [&::-webkit-scrollbar-track]:bg-transparent">
									{result.subject}
								</span>
							</div>
							<div className="flex items-center justify-between text-xs">
								<span className="text-zinc-500">Expires</span>
								<span
									className={`${
										isExpiringSoon
											? "text-yellow-400"
											: "text-zinc-300"
									}`}
								>
									{result.expiry}
									{result.daysUntilExpiry !== undefined && (
										<span className="ml-1 text-zinc-500">
											({result.daysUntilExpiry} days)
										</span>
									)}
								</span>
							</div>
						</div>

						{perspective !== "neutral" && hasAI && (
							<div className="mt-4 pt-4 border-t border-zinc-800">
								{perspective === "attacker" ? (
									<p className="text-xs text-red-400">
										{result.ai?.attacker?.exploitability ||
											result.ai?.attacker?.attackSurface}
									</p>
								) : (
									<p className="text-xs text-blue-400">
										{result.ai?.defender
											?.complianceImpact ||
											result.ai?.defender
												?.hardeningRecommendation}
									</p>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
