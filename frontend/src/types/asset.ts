/**
 * Asset Types
 * Backend-provided asset definitions
 */

export type AssetType =
	| "domain"
	| "subdomain"
	| "ip"
	| "cloud"
	| "service"
	| "certificate";

export type AssetStatus = "active" | "inactive";

export interface Asset {
	id: string;
	identifier: string;
	type: AssetType;
	source: string;
	lastSeen: string;
	scanId: string;
	status: AssetStatus;
	metadata?: Record<string, unknown>;
}

export interface AssetDetail extends Asset {
	firstSeen: string;
	scanHistory: {
		scanId: string;
		timestamp: string;
		scanType: string;
	}[];
}
