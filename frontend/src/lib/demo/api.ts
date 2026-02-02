/**
 * Demo API Override
 * Returns demo data instead of making real API calls
 */

import { isDemoMode } from "./mode";
import type { APIResponse, PaginatedResponse } from "@/types";
import {
	DEMO_DASHBOARD_OVERVIEW,
	DEMO_DASHBOARD_ACTIVITY,
	DEMO_RECENT_SCANS,
	DEMO_FEATURE_FLAGS,
	DEMO_SCAN_STATE,
	DEMO_SUBDOMAINS,
	DEMO_PORTS,
	DEMO_TECHNOLOGIES,
	DEMO_HEADERS,
	DEMO_TLS,
	DEMO_NUCLEI,
	DEMO_FINDINGS_LIST,
	DEMO_FINDING_DETAIL,
	DEMO_REPORTS_LIST,
	DEMO_REPORT_DETAIL,
} from "./data";

type DemoResponse<T> = APIResponse<T>;

function success<T>(data: T): DemoResponse<T> {
	return { success: true, data };
}

function paginated<T>(items: T[], page = 1, limit = 20): PaginatedResponse<T> {
	const start = (page - 1) * limit;
	const end = start + limit;
	return {
		data: items.slice(start, end),
		pagination: {
			page,
			limit,
			total: items.length,
			totalPages: Math.ceil(items.length / limit),
		},
	};
}

/**
 * Demo API endpoints - mirrors real API structure
 */
export const demoApi = {
	// Dashboard
	dashboard: {
		getOverview: () => Promise.resolve(success(DEMO_DASHBOARD_OVERVIEW)),
		getActivity: () => Promise.resolve(success(DEMO_DASHBOARD_ACTIVITY)),
		getRecentScans: () => Promise.resolve(success(DEMO_RECENT_SCANS)),
	},

	// Scans
	scans: {
		get: (_scanId: string) => Promise.resolve(success(DEMO_SCAN_STATE)),
		list: (page?: number, limit?: number) =>
			Promise.resolve(success(paginated(DEMO_RECENT_SCANS, page, limit))),
		create: () =>
			Promise.resolve({
				success: false,
				error: { code: "DEMO_MODE", message: "Demo Mode – Read Only" },
			}),
		cancel: () =>
			Promise.resolve({
				success: false,
				error: { code: "DEMO_MODE", message: "Demo Mode – Read Only" },
			}),
		getSubdomains: () => Promise.resolve(success(DEMO_SUBDOMAINS)),
		getPorts: () => Promise.resolve(success(DEMO_PORTS)),
		getTech: () => Promise.resolve(success(DEMO_TECHNOLOGIES)),
		getHeaders: () => Promise.resolve(success(DEMO_HEADERS)),
		getTLS: () => Promise.resolve(success(DEMO_TLS)),
		getNuclei: () => Promise.resolve(success(DEMO_NUCLEI)),
	},

	// Findings
	findings: {
		list: (page?: number, limit?: number) =>
			Promise.resolve(
				success(paginated(DEMO_FINDINGS_LIST, page, limit)),
			),
		get: (_findingId: string) =>
			Promise.resolve(success(DEMO_FINDING_DETAIL)),
		getStats: () =>
			Promise.resolve(
				success({
					total: DEMO_FINDINGS_LIST.length,
					bySeverity: {
						CRITICAL: 2,
						HIGH: 2,
						MEDIUM: 3,
						LOW: 1,
						INFO: 0,
					},
					byCategory: {
						WEB: 3,
						NETWORK: 1,
						CONFIGURATION: 3,
						AUTHENTICATION: 1,
					},
				}),
			),
	},

	// Reports
	reports: {
		list: (page?: number, limit?: number) =>
			Promise.resolve(success(paginated(DEMO_REPORTS_LIST, page, limit))),
		get: (_reportId: string) =>
			Promise.resolve(success(DEMO_REPORT_DETAIL)),
		generate: () =>
			Promise.resolve({
				success: false,
				error: { code: "DEMO_MODE", message: "Demo Mode – Read Only" },
			}),
		getDownloadUrl: () =>
			Promise.resolve(success({ url: "/demo/sample-report.pdf" })),
	},

	// User
	user: {
		getFeatures: () => Promise.resolve(success(DEMO_FEATURE_FLAGS)),
	},
};

/**
 * Get the appropriate API based on demo mode
 */
export function getApi() {
	if (isDemoMode()) {
		return demoApi;
	}
	// Return real API (imported separately to avoid circular deps)
	return null;
}
