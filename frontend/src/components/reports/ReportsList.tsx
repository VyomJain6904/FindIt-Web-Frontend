import Link from "next/link";
import { FileText, Download, Calendar, Globe } from "lucide-react";
import { ReportSummary, ReportFormat } from "@/types";

interface ReportsListProps {
	reports: ReportSummary[];
}

export function ReportsList({ reports }: ReportsListProps) {
	const getFormatBadge = (format: ReportFormat) => {
		switch (format) {
			case "PDF":
				return "bg-red-500/10 text-red-400";
			case "JSON":
				return "bg-blue-500/10 text-blue-400";
			case "CSV":
				return "bg-emerald-500/10 text-emerald-400";
			case "HTML":
				return "bg-violet-500/10 text-violet-400";
			default:
				return "bg-zinc-500/10 text-zinc-400";
		}
	};

	const formatDate = (date: string) => {
		try {
			return new Date(date).toLocaleDateString();
		} catch {
			return date;
		}
	};

	if (reports.length === 0) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-12 text-center">
				<FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
				<h3 className="text-lg font-medium text-zinc-300">
					No reports yet
				</h3>
				<p className="text-zinc-500 mt-2">
					Reports will appear here after scan completion
				</p>
			</div>
		);
	}

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
			<table className="w-full">
				<thead>
					<tr className="border-b border-zinc-800">
						<th className="px-5 py-4 text-left text-xs font-medium text-zinc-400 uppercase">
							Target
						</th>
						<th className="px-5 py-4 text-left text-xs font-medium text-zinc-400 uppercase">
							Scan Type
						</th>
						<th className="px-5 py-4 text-left text-xs font-medium text-zinc-400 uppercase">
							Generated
						</th>
						<th className="px-5 py-4 text-left text-xs font-medium text-zinc-400 uppercase">
							Format
						</th>
						<th className="px-5 py-4 text-left text-xs font-medium text-zinc-400 uppercase">
							Findings
						</th>
						<th className="px-5 py-4 text-right text-xs font-medium text-zinc-400 uppercase">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-zinc-800">
					{reports.map((report) => (
						<tr
							key={report.id}
							className="hover:bg-zinc-800/50 transition-colors"
						>
							<td className="px-5 py-4">
								<Link
									href={`/reports/${report.id}`}
									className="flex items-center gap-3"
								>
									<div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
										<Globe className="w-4 h-4 text-zinc-400" />
									</div>
									<span className="text-sm font-medium text-zinc-100 hover:text-violet-400 transition-colors">
										{report.target}
									</span>
								</Link>
							</td>
							<td className="px-5 py-4 text-sm text-zinc-400 capitalize">
								{report.scanType.toLowerCase()}
							</td>
							<td className="px-5 py-4">
								<div className="flex items-center gap-2 text-sm text-zinc-400">
									<Calendar className="w-4 h-4" />
									{formatDate(report.generatedAt)}
								</div>
							</td>
							<td className="px-5 py-4">
								<span
									className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getFormatBadge(
										report.format,
									)}`}
								>
									{report.format}
								</span>
							</td>
							<td className="px-5 py-4">
								<div className="flex items-center gap-2">
									{report.findingStats.bySeverity.CRITICAL >
										0 && (
										<span className="text-xs text-red-400">
											{
												report.findingStats.bySeverity
													.CRITICAL
											}{" "}
											Critical
										</span>
									)}
									{report.findingStats.bySeverity.HIGH >
										0 && (
										<span className="text-xs text-orange-400">
											{
												report.findingStats.bySeverity
													.HIGH
											}{" "}
											High
										</span>
									)}
									<span className="text-xs text-zinc-500">
										{report.findingStats.total} total
									</span>
								</div>
							</td>
							<td className="px-5 py-4 text-right">
								<button
									className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
									title="Download"
								>
									<Download className="w-4 h-4" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
