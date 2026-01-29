/**
 * Demo Data - Reports
 * Contract-valid fake reports for demo mode
 */

import type { ReportSummary, ReportDetail } from "@/types";

export const DEMO_REPORTS_LIST: ReportSummary[] = [
	{
		id: "report-001",
		name: "Q1 2026 Security Assessment - ACME Corp",
		scanIds: ["scan-demo-001", "scan-demo-002"],
		format: "PDF",
		status: "COMPLETED",
		createdAt: "2026-01-27T09:15:00Z",
		downloadUrl: "/demo/report-001.pdf",
	},
	{
		id: "report-002",
		name: "Executive Summary - January 2026",
		scanIds: ["scan-demo-002", "scan-demo-003"],
		format: "PDF",
		status: "COMPLETED",
		createdAt: "2026-01-26T14:00:00Z",
		downloadUrl: "/demo/report-002.pdf",
	},
	{
		id: "report-003",
		name: "SOC Technical Report - API Infrastructure",
		scanIds: ["scan-demo-001"],
		format: "PDF",
		status: "COMPLETED",
		createdAt: "2026-01-25T16:30:00Z",
		downloadUrl: "/demo/report-003.pdf",
	},
	{
		id: "report-004",
		name: "Compliance Audit - PCI DSS",
		scanIds: ["scan-demo-004", "scan-demo-005"],
		format: "PDF",
		status: "COMPLETED",
		createdAt: "2026-01-24T11:00:00Z",
		downloadUrl: "/demo/report-004.pdf",
	},
];

export const DEMO_REPORT_DETAIL: ReportDetail = {
	id: "report-001",
	name: "Q1 2026 Security Assessment - ACME Corp",
	scanIds: ["scan-demo-001", "scan-demo-002"],
	format: "PDF",
	status: "COMPLETED",
	createdAt: "2026-01-27T09:15:00Z",
	downloadUrl: "/demo/report-001.pdf",
	findingsSummary: {
		total: 24,
		bySeverity: {
			CRITICAL: 2,
			HIGH: 4,
			MEDIUM: 10,
			LOW: 8,
			INFO: 0,
		},
	},
	scansIncluded: [
		{
			id: "scan-demo-001",
			target: "api.acme-corp.com",
			status: "COMPLETED",
			type: "FULL",
			progress: 100,
			findingCount: 16,
			createdAt: "2026-01-27T10:00:00Z",
		},
		{
			id: "scan-demo-002",
			target: "app.acme-corp.com",
			status: "COMPLETED",
			type: "DEEP",
			progress: 100,
			findingCount: 8,
			createdAt: "2026-01-26T14:30:00Z",
		},
	],
};
