import { Activity, Search, AlertTriangle, FileText } from "lucide-react";

interface KPIData {
	totalScans: number;
	activeScans: number;
	criticalFindings: number;
	highFindings: number;
	reportsGenerated: number;
}

interface KPICardsProps {
	data: KPIData;
}

export function KPICards({ data }: KPICardsProps) {
	const cards = [
		{
			label: "Total Scans",
			value: data.totalScans,
			icon: Search,
			color: "text-blue-400",
			bg: "bg-blue-500/10",
		},
		{
			label: "Active Scans",
			value: data.activeScans,
			icon: Activity,
			color: "text-emerald-400",
			bg: "bg-emerald-500/10",
		},
		{
			label: "Critical Findings",
			value: data.criticalFindings,
			icon: AlertTriangle,
			color: "text-red-400",
			bg: "bg-red-500/10",
		},
		{
			label: "High Findings",
			value: data.highFindings,
			icon: AlertTriangle,
			color: "text-orange-400",
			bg: "bg-orange-500/10",
		},
		{
			label: "Reports",
			value: data.reportsGenerated,
			icon: FileText,
			color: "text-violet-400",
			bg: "bg-violet-500/10",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{cards.map((card) => {
				const Icon = card.icon;
				return (
					<div
						key={card.label}
						className="bg-zinc-900 rounded-xl border border-zinc-800 p-5"
					>
						<div className="flex items-center justify-between">
							<div className={`p-2 rounded-lg ${card.bg}`}>
								<Icon className={`w-5 h-5 ${card.color}`} />
							</div>
						</div>
						<p className="text-2xl font-bold text-zinc-100 mt-4">
							{card.value}
						</p>
						<p className="text-sm text-zinc-500 mt-1">
							{card.label}
						</p>
					</div>
				);
			})}
		</div>
	);
}
