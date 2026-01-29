import { Globe, Calendar, Clock } from "lucide-react";
import { ReportDetail } from "@/types";

interface ReportHeaderProps {
	report: ReportDetail;
}

export function ReportHeader({ report }: ReportHeaderProps) {
	const formatDate = (date: string) => {
		try {
			return new Date(date).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		} catch {
			return date;
		}
	};

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
			<div className="flex items-start gap-4">
				<div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center">
					<Globe className="w-7 h-7 text-violet-400" />
				</div>
				<div className="flex-1">
					<h1 className="text-xl font-bold text-zinc-100">
						{report.target}
					</h1>
					<p className="text-zinc-400 mt-1">{report.title}</p>
					<div className="flex items-center gap-4 mt-3">
						<div className="flex items-center gap-2 text-sm text-zinc-500">
							<Calendar className="w-4 h-4" />
							{formatDate(report.generatedAt)}
						</div>
						<span className="text-zinc-700">•</span>
						<span className="text-sm text-zinc-500 capitalize">
							{report.scanType.toLowerCase()} scan
						</span>
						<span className="text-zinc-700">•</span>
						<span className="text-sm text-zinc-500">
							{report.findingStats.total} findings
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
