/**
 * Demo Data - Dashboard
 * Contract-valid fake data for demo mode
 */

import type { ScanListItem, FindingStats, FeatureFlags } from "@/types";
import type { DashboardOverview, DashboardActivity } from "@/lib/api/endpoints";

export const DEMO_DASHBOARD_OVERVIEW: DashboardOverview = {
	totalScans: 47,
	activeScans: 2,
	criticalFindings: 3,
	highFindings: 12,
	reportsGenerated: 15,
	findingStats: {
		total: 156,
		bySeverity: {
			CRITICAL: 3,
			HIGH: 12,
			MEDIUM: 45,
			LOW: 78,
			INFO: 18,
		},
		byCategory: {
			WEB: 67,
			NETWORK: 34,
			CLOUD: 23,
			CONFIGURATION: 21,
			AUTHENTICATION: 11,
		},
	},
};

export const DEMO_DASHBOARD_ACTIVITY: DashboardActivity[] = [
	{
		id: "act-001",
		type: "scan_completed",
		message: "Full scan completed for api.acme-corp.com",
		timestamp: "2026-01-27T10:30:00Z",
	},
	{
		id: "act-002",
		type: "report_generated",
		message: "Executive report generated for Q1 Assessment",
		timestamp: "2026-01-27T09:15:00Z",
	},
	{
		id: "act-003",
		type: "scan_started",
		message: "Quick scan started for staging.acme-corp.com",
		timestamp: "2026-01-27T08:45:00Z",
	},
	{
		id: "act-004",
		type: "scan_completed",
		message: "Deep scan completed for app.acme-corp.com",
		timestamp: "2026-01-26T16:20:00Z",
	},
	{
		id: "act-005",
		type: "report_generated",
		message: "Technical report generated for SOC team",
		timestamp: "2026-01-26T14:00:00Z",
	},
];

export const DEMO_RECENT_SCANS: ScanListItem[] = [
	{
		id: "scan-demo-001",
		target: "api.acme-corp.com",
		status: "RUNNING",
		type: "FULL",
		progress: 67,
		findingCount: 8,
		createdAt: "2026-01-27T10:00:00Z",
	},
	{
		id: "scan-demo-002",
		target: "app.acme-corp.com",
		status: "COMPLETED",
		type: "DEEP",
		progress: 100,
		findingCount: 24,
		createdAt: "2026-01-26T14:30:00Z",
	},
	{
		id: "scan-demo-003",
		target: "staging.acme-corp.com",
		status: "RUNNING",
		type: "QUICK",
		progress: 35,
		findingCount: 3,
		createdAt: "2026-01-27T08:45:00Z",
	},
	{
		id: "scan-demo-004",
		target: "portal.acme-corp.com",
		status: "COMPLETED",
		type: "FULL",
		progress: 100,
		findingCount: 19,
		createdAt: "2026-01-25T11:00:00Z",
	},
	{
		id: "scan-demo-005",
		target: "admin.acme-corp.com",
		status: "COMPLETED",
		type: "QUICK",
		progress: 100,
		findingCount: 7,
		createdAt: "2026-01-24T09:30:00Z",
	},
];

export const DEMO_FEATURE_FLAGS: FeatureFlags = {
	ai_analysis: true,
	report_export: true,
	branding_removal: true,
	deep_scan: true,
	custom_scan: true,
	custom_wordlist: true,
};
