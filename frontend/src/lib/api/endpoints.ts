/**
 * Typed API Endpoint Helpers
 * All API calls go through these functions
 */

import { api, RequestOptions } from "./client";
import type {
	APIResponse,
	PaginatedResponse,
	FeatureFlags,
	ScanCreateRequest,
	ScanCreateResponse,
	ScanState,
	ScanListItem,
	SubdomainResult,
	PortResult,
	TechResult,
	HeaderResult,
	TLSResult,
	NucleiResult,
	Finding,
	FindingListItem,
	FindingStats,
	ReportSummary,
	ReportDetail,
	ReportGenerateRequest,
	ReportGenerateResponse,
} from "@/types";

// ─────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────

export interface DashboardOverview {
	totalScans: number;
	activeScans: number;
	criticalFindings: number;
	highFindings: number;
	reportsGenerated: number;
	findingStats: FindingStats;
}

export interface DashboardActivity {
	id: string;
	type: "scan_started" | "scan_completed" | "report_generated";
	message: string;
	timestamp: string;
}

export const dashboard = {
	getOverview: (options?: RequestOptions) =>
		api.get<DashboardOverview>("/dashboard/overview", options),

	getActivity: (options?: RequestOptions) =>
		api.get<DashboardActivity[]>("/dashboard/activity", options),

	getRecentScans: (limit?: number, options?: RequestOptions) =>
		api.get<ScanListItem[]>(
			`/dashboard/scans/recent${limit ? `?limit=${limit}` : ""}`,
			options,
		),
};

// ─────────────────────────────────────────────────────────────
// Scans
// ─────────────────────────────────────────────────────────────

export const scans = {
	create: (data: ScanCreateRequest, options?: RequestOptions) =>
		api.post<ScanCreateResponse>("/scans", data, options),

	get: (scanId: string, options?: RequestOptions) =>
		api.get<ScanState>(`/scans/${scanId}`, options),

	list: (page?: number, limit?: number, options?: RequestOptions) => {
		const params = new URLSearchParams();
		if (page) params.set("page", page.toString());
		if (limit) params.set("limit", limit.toString());
		const query = params.toString();
		return api.get<PaginatedResponse<ScanListItem>>(
			`/scans${query ? `?${query}` : ""}`,
			options,
		);
	},

	cancel: (scanId: string, options?: RequestOptions) =>
		api.post<{ success: boolean }>(
			`/scans/${scanId}/cancel`,
			undefined,
			options,
		),

	// Worker results
	getSubdomains: (scanId: string, options?: RequestOptions) =>
		api.get<SubdomainResult[]>(
			`/scans/${scanId}/results/subdomains`,
			options,
		),

	getPorts: (scanId: string, options?: RequestOptions) =>
		api.get<PortResult[]>(`/scans/${scanId}/results/ports`, options),

	getTech: (scanId: string, options?: RequestOptions) =>
		api.get<TechResult[]>(`/scans/${scanId}/results/technologies`, options),

	getHeaders: (scanId: string, options?: RequestOptions) =>
		api.get<HeaderResult[]>(`/scans/${scanId}/results/headers`, options),

	getTLS: (scanId: string, options?: RequestOptions) =>
		api.get<TLSResult[]>(`/scans/${scanId}/results/tls`, options),

	getNuclei: (scanId: string, options?: RequestOptions) =>
		api.get<NucleiResult[]>(`/scans/${scanId}/results/nuclei`, options),
};

// ─────────────────────────────────────────────────────────────
// Findings
// ─────────────────────────────────────────────────────────────

export const findings = {
	list: (
		scanId?: string,
		page?: number,
		limit?: number,
		options?: RequestOptions,
	) => {
		const params = new URLSearchParams();
		if (scanId) params.set("scanId", scanId);
		if (page) params.set("page", page.toString());
		if (limit) params.set("limit", limit.toString());
		const query = params.toString();
		return api.get<PaginatedResponse<FindingListItem>>(
			`/findings${query ? `?${query}` : ""}`,
			options,
		);
	},

	get: (findingId: string, options?: RequestOptions) =>
		api.get<Finding>(`/findings/${findingId}`, options),

	getStats: (scanId?: string, options?: RequestOptions) => {
		const query = scanId ? `?scanId=${scanId}` : "";
		return api.get<FindingStats>(`/findings/stats${query}`, options);
	},
};

// ─────────────────────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────────────────────

export const reports = {
	list: (page?: number, limit?: number, options?: RequestOptions) => {
		const params = new URLSearchParams();
		if (page) params.set("page", page.toString());
		if (limit) params.set("limit", limit.toString());
		const query = params.toString();
		return api.get<PaginatedResponse<ReportSummary>>(
			`/reports${query ? `?${query}` : ""}`,
			options,
		);
	},

	get: (reportId: string, options?: RequestOptions) =>
		api.get<ReportDetail>(`/reports/${reportId}`, options),

	generate: (data: ReportGenerateRequest, options?: RequestOptions) =>
		api.post<ReportGenerateResponse>("/reports/generate", data, options),

	getDownloadUrl: (
		reportId: string,
		format: string,
		options?: RequestOptions,
	) =>
		api.get<{ url: string }>(
			`/reports/${reportId}/download?format=${format}`,
			options,
		),
};

// ─────────────────────────────────────────────────────────────
// User / Features
// ─────────────────────────────────────────────────────────────

export const user = {
	getFeatures: (options?: RequestOptions) =>
		api.get<FeatureFlags>("/user/features", options),
};
