"use client";

import { useEffect, useState } from "react";
import {
	ReportHeader,
	ExecutiveSummary,
	ReportFindingsOverview,
	TechnicalDetails,
	ExportActions,
} from "@/components/reports";
import { ReportDetail, FeatureFlags, ScanType, ReportFormat } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ReportDetailPageProps {
	params: Promise<{ reportId: string }>;
}

// Placeholder report - will be fetched from API
const placeholderReport: ReportDetail = {
	id: "",
	scanId: "",
	generatedAt: new Date().toISOString(),
	title: "Security Assessment Report",
	format: "PDF" as ReportFormat,
	target: "Loading...",
	scanType: "QUICK" as ScanType,
	findingStats: {
		critical: 0,
		high: 0,
		medium: 0,
		low: 0,
		info: 0,
		total: 0,
	},
	executiveSummary: "",
	technicalDetails: "",
	sections: [],
};

// Placeholder feature flags - will come from API/context
const placeholderFeatures: FeatureFlags = {
	report_export: true,
	branding_removal: false,
};

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
	const [reportId, setReportId] = useState<string>("");
	const [report, setReport] = useState<ReportDetail>(placeholderReport);
	const [features] = useState<FeatureFlags>(placeholderFeatures);

	useEffect(() => {
		params.then((p) => {
			setReportId(p.reportId);
			setReport((prev) => ({ ...prev, id: p.reportId }));
		});
	}, [params]);

	return (
		<div className="p-6 space-y-6 min-h-screen bg-black">
			{/* Back Link */}
			<Link
				href="/reports"
				className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Reports
			</Link>

			{/* Header */}
			<ReportHeader report={report} />

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column */}
				<div className="lg:col-span-2 space-y-6">
					<ExecutiveSummary summary={report.executiveSummary} />
					<TechnicalDetails
						details={report.technicalDetails}
						sections={report.sections}
					/>
				</div>

				{/* Right Column */}
				<div className="space-y-6">
					<ReportFindingsOverview stats={report.findingStats} />
					<ExportActions
						reportId={reportId}
						downloadUrl={report.downloadUrl}
						features={features}
					/>
				</div>
			</div>
		</div>
	);
}
