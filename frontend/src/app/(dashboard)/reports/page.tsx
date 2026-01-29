import { ReportsList } from "@/components/reports/ReportsList";
import { ReportSummary } from "@/types";

// Placeholder data - will be fetched from API
const reports: ReportSummary[] = [];

export default function ReportsPage() {
	return (
		<div className="p-6 space-y-6 min-h-screen bg-black">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold text-zinc-100">Reports</h1>
				<p className="text-zinc-400 mt-1">
					Access and download scan reports for compliance and audits
				</p>
			</div>

			{/* Reports List */}
			<ReportsList reports={reports} />
		</div>
	);
}
