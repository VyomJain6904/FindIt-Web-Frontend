/**
 * Report types for FindIt API contract
 * JSON-compatible only - string unions for enums
 * Mirrors libs/events
 */

import { ISODateString, BaseEntity } from "./common";
import { ScanType } from "./scan";
import { FindingStats } from "./findings";

/** Available report export formats - string union */
export type ReportFormat = "PDF" | "JSON" | "CSV" | "HTML";

/** Report status */
export type ReportStatus = "GENERATING" | "READY" | "FAILED" | "EXPIRED";

/** Report section */
export interface ReportSection {
	title: string;
	content: string;
	order: number;
	type?: "text" | "table" | "chart";
}

/** Summary view of a report */
export interface ReportSummary extends BaseEntity {
	scanId: string;
	generatedAt: ISODateString;
	title: string;
	format: ReportFormat;
	status: ReportStatus;
	target: string;
	scanType: ScanType;
	findingStats: FindingStats;
	downloadUrl?: string;
	expiresAt?: ISODateString;
	fileSize?: number;
}

/** Detailed report with full content */
export interface ReportDetail extends ReportSummary {
	executiveSummary: string;
	technicalDetails: string;
	methodology?: string;
	scope?: string;
	limitations?: string;
	recommendations?: string;
	sections: ReportSection[];
}

/** Report generation request */
export interface ReportGenerateRequest {
	scanId: string;
	format: ReportFormat;
	includeSections?: string[];
	branding?: boolean;
}

/** Report generation response */
export interface ReportGenerateResponse {
	reportId: string;
	status: ReportStatus;
	estimatedTime?: number;
}
