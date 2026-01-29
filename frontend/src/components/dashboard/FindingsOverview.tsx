import { FindingSeverity } from "@/types";

interface SeverityCount {
	severity: FindingSeverity;
	count: number;
}

interface FindingsOverviewProps {
	data: SeverityCount[];
}

export function FindingsOverview({ data }: FindingsOverviewProps) {
	const getSeverityConfig = (severity: FindingSeverity) => {
		switch (severity) {
			case "CRITICAL":
				return { color: "bg-red-500", label: "Critical" };
			case "HIGH":
				return { color: "bg-orange-500", label: "High" };
			case "MEDIUM":
				return { color: "bg-yellow-500", label: "Medium" };
			case "LOW":
				return { color: "bg-blue-500", label: "Low" };
			default:
				return { color: "bg-zinc-500", label: "Info" };
		}
	};

	const maxCount = Math.max(...data.map((d) => d.count), 1);

	if (data.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<p className="text-zinc-500">No findings data</p>
			</div>
		);
	}

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800">
			<div className="px-5 py-4 border-b border-zinc-800">
				<h3 className="text-sm font-medium text-zinc-100">
					Findings Overview
				</h3>
			</div>
			<div className="p-5 space-y-4">
				{data.map((item) => {
					const config = getSeverityConfig(item.severity);
					const percentage = (item.count / maxCount) * 100;

					return (
						<div key={item.severity}>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-zinc-400">
									{config.label}
								</span>
								<span className="text-sm font-medium text-zinc-100">
									{item.count}
								</span>
							</div>
							<div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
								<div
									className={`h-full ${config.color} rounded-full transition-all duration-500`}
									style={{ width: `${percentage}%` }}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
