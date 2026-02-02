import { ReportSummary } from "@/types";

interface ReportFindingsOverviewProps {
	stats: ReportSummary["findingStats"];
}

export function ReportFindingsOverview({ stats }: ReportFindingsOverviewProps) {
	const severities = [
		{
			key: "critical",
			label: "Critical",
			color: "bg-red-500",
			count: stats.bySeverity.CRITICAL,
		},
		{
			key: "high",
			label: "High",
			color: "bg-orange-500",
			count: stats.bySeverity.HIGH,
		},
		{
			key: "medium",
			label: "Medium",
			color: "bg-yellow-500",
			count: stats.bySeverity.MEDIUM,
		},
		{
			key: "low",
			label: "Low",
			color: "bg-blue-500",
			count: stats.bySeverity.LOW,
		},
		{
			key: "info",
			label: "Info",
			color: "bg-zinc-500",
			count: stats.bySeverity.INFO,
		},
	];

	const maxCount = Math.max(...severities.map((s) => s.count), 1);

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-lg font-semibold text-zinc-100">
					Findings Distribution
				</h2>
				<span className="text-sm text-zinc-400">
					{stats.total} total findings
				</span>
			</div>

			<div className="grid grid-cols-5 gap-4">
				{severities.map((sev) => (
					<div key={sev.key} className="text-center">
						<div className="h-32 flex items-end justify-center mb-2">
							<div
								className={`w-full max-w-[40px] ${sev.color} rounded-t transition-all duration-500`}
								style={{
									height: `${Math.max((sev.count / maxCount) * 100, 4)}%`,
								}}
							/>
						</div>
						<p className="text-2xl font-bold text-zinc-100">
							{sev.count}
						</p>
						<p className="text-xs text-zinc-500 mt-1">
							{sev.label}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
