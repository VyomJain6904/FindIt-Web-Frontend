import Link from "next/link";
import {
	Globe,
	Clock,
	Activity,
	CheckCircle,
	XCircle,
	Loader2,
} from "lucide-react";
import { ScanStatus, ScanType, ISODateString } from "@/types";

interface RecentScan {
	id: string;
	target: string;
	type: ScanType;
	status: ScanStatus;
	startedAt: ISODateString;
}

interface RecentScansProps {
	scans: RecentScan[];
}

export function RecentScans({ scans }: RecentScansProps) {
	const getStatusConfig = (status: ScanStatus) => {
		switch (status) {
			case "RUNNING":
				return {
					icon: Loader2,
					color: "text-blue-400",
					animate: "animate-spin",
				};
			case "COMPLETED":
				return {
					icon: CheckCircle,
					color: "text-emerald-400",
					animate: "",
				};
			case "FAILED":
				return { icon: XCircle, color: "text-red-400", animate: "" };
			default:
				return { icon: Clock, color: "text-yellow-400", animate: "" };
		}
	};

	const formatDate = (date: ISODateString) => {
		try {
			return new Date(date).toLocaleString();
		} catch {
			return date;
		}
	};

	if (scans.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-8 text-center">
				<Activity className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
				<p className="text-zinc-500">No recent scans</p>
			</div>
		);
	}

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800">
			<div className="px-5 py-4 border-b border-zinc-800">
				<h3 className="text-sm font-medium text-zinc-100">
					Recent Scans
				</h3>
			</div>
			<div className="divide-y divide-zinc-800">
				{scans.map((scan) => {
					const config = getStatusConfig(scan.status);
					const Icon = config.icon;

					return (
						<Link
							key={scan.id}
							href={`/scan/${scan.id}`}
							className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-800/50 transition-colors"
						>
							<div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
								<Globe className="w-5 h-5 text-zinc-400" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-zinc-100 truncate">
									{scan.target}
								</p>
								<div className="flex items-center gap-2 mt-1">
									<span className="text-xs text-zinc-500 capitalize">
										{scan.type.toLowerCase()}
									</span>
									<span className="text-zinc-700">•</span>
									<span className="text-xs text-zinc-500">
										{formatDate(scan.startedAt)}
									</span>
								</div>
							</div>
							<Icon
								className={`w-5 h-5 ${config.color} ${config.animate}`}
							/>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
