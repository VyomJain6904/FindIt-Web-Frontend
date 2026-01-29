import { Activity, Search, FileText, CheckCircle } from "lucide-react";
import { ISODateString } from "@/types";

type ActivityType = "scan_started" | "scan_completed" | "report_generated";

interface ActivityItem {
	id: string;
	type: ActivityType;
	message: string;
	timestamp: ISODateString;
}

interface ActivityPanelProps {
	activities: ActivityItem[];
}

export function ActivityPanel({ activities }: ActivityPanelProps) {
	const getActivityConfig = (type: ActivityType) => {
		switch (type) {
			case "scan_started":
				return {
					icon: Search,
					color: "text-blue-400",
					bg: "bg-blue-500/10",
				};
			case "scan_completed":
				return {
					icon: CheckCircle,
					color: "text-emerald-400",
					bg: "bg-emerald-500/10",
				};
			case "report_generated":
				return {
					icon: FileText,
					color: "text-violet-400",
					bg: "bg-violet-500/10",
				};
			default:
				return {
					icon: Activity,
					color: "text-zinc-400",
					bg: "bg-zinc-500/10",
				};
		}
	};

	const formatTime = (date: ISODateString) => {
		try {
			return new Date(date).toLocaleTimeString();
		} catch {
			return date;
		}
	};

	if (activities.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<Activity className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
				<p className="text-zinc-500">No recent activity</p>
			</div>
		);
	}

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800">
			<div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
				<h3 className="text-sm font-medium text-zinc-100">
					System Activity
				</h3>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
					<span className="text-xs text-zinc-500">Live</span>
				</div>
			</div>
			<div className="divide-y divide-zinc-800 max-h-[300px] overflow-y-auto">
				{activities.map((activity) => {
					const config = getActivityConfig(activity.type);
					const Icon = config.icon;

					return (
						<div
							key={activity.id}
							className="flex items-center gap-3 px-5 py-3"
						>
							<div className={`p-2 rounded-lg ${config.bg}`}>
								<Icon className={`w-4 h-4 ${config.color}`} />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm text-zinc-300 truncate">
									{activity.message}
								</p>
							</div>
							<span className="text-xs text-zinc-500 shrink-0">
								{formatTime(activity.timestamp)}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
