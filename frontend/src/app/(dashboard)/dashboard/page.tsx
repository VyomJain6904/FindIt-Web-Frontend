import {
	KPICards,
	RecentScans,
	FindingsOverview,
	ActivityPanel,
} from "@/components/dashboard";
import { FindingSeverity, ScanStatus, ScanType } from "@/types";

// Placeholder data - will be fetched from API
const kpiData = {
	totalScans: 0,
	activeScans: 0,
	criticalFindings: 0,
	highFindings: 0,
	reportsGenerated: 0,
};

const recentScans: Array<{
	id: string;
	target: string;
	type: ScanType;
	status: ScanStatus;
	startedAt: string;
}> = [];

const findingsData: Array<{ severity: FindingSeverity; count: number }> = [
	{ severity: "CRITICAL", count: 0 },
	{ severity: "HIGH", count: 0 },
	{ severity: "MEDIUM", count: 0 },
	{ severity: "LOW", count: 0 },
	{ severity: "INFO", count: 0 },
];

const activities: Array<{
	id: string;
	type: "scan_started" | "scan_completed" | "report_generated";
	message: string;
	timestamp: string;
}> = [];

export default function DashboardPage() {
	return (
		<div className="p-6 space-y-6 min-h-screen bg-black">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
				<p className="text-zinc-400 mt-1">
					Security operations overview
				</p>
			</div>

			{/* KPI Cards */}
			<KPICards data={kpiData} />

			{/* Main Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Recent Scans */}
				<div className="lg:col-span-2">
					<RecentScans scans={recentScans} />
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					<FindingsOverview data={findingsData} />
					<ActivityPanel activities={activities} />
				</div>
			</div>
		</div>
	);
}
