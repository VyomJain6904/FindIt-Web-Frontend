/**
 * Scan types for FindIt API contract
 * JSON-compatible only - string unions for enums
 * Mirrors libs/events
 */

import { ISODateString, BaseEntity } from "./common";

/** Scan execution status - string union for JSON compatibility */
export type ScanStatus =
	| "QUEUED"
	| "RUNNING"
	| "COMPLETED"
	| "FAILED"
	| "CANCELLED";

/** Available scan types - string union for JSON compatibility */
export type ScanType = "QUICK" | "FULL" | "DEEP" | "CUSTOM";

/** Worker types */
export type WorkerType =
	| "SUBDOMAIN"
	| "PORT"
	| "TECH"
	| "HEADERS"
	| "TLS"
	| "DIRECTORY"
	| "NUCLEI"
	| "AI";

/** Worker execution status */
export type WorkerStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

/** Wordlist upload reference for custom scans */
export interface WordlistUpload {
	id: string;
	filename: string;
	size: number;
	uploadedAt: ISODateString;
}

/** Scan options - all optional for flexibility */
export interface ScanOptions {
	checkSubdomains?: boolean;
	checkPorts?: boolean;
	aggressive?: boolean;
	aiAnalysis?: boolean;
	nucleiTemplates?: string[];
	/** Custom wordlist reference for directory bruteforce */
	wordlistId?: string;
}

/** Request body for creating a new scan */
export interface ScanCreateRequest {
	target: string;
	type: ScanType;
	options?: ScanOptions;
}

/** Response after scan creation */
export interface ScanCreateResponse {
	scanId: string;
	status: ScanStatus;
	createdAt: ISODateString;
	estimatedDuration?: number;
}

/** Individual worker state within a scan */
export interface WorkerState {
	workerId: string;
	type: WorkerType;
	status: WorkerStatus;
	progress: number;
	startedAt?: ISODateString;
	completedAt?: ISODateString;
	error?: string;
	resultCount?: number;
}

/** Current state of a scan */
export interface ScanState extends BaseEntity {
	target: string;
	status: ScanStatus;
	type: ScanType;
	progress: number;
	startedAt: ISODateString;
	completedAt?: ISODateString;
	findingCount: number;
	workers: WorkerState[];
	options?: ScanOptions;
}

/** Scan list item - subset for listings */
export interface ScanListItem {
	id: string;
	target: string;
	status: ScanStatus;
	type: ScanType;
	progress: number;
	startedAt?: ISODateString;
	completedAt?: ISODateString;
	findingCount: number;
	createdAt: ISODateString;
}

/** Generic worker result - agnostic of specific worker type */
export interface ScanWorkerResult<T = unknown> {
	workerId: string;
	scanId: string;
	type: WorkerType;
	status: "SUCCESS" | "FAILURE";
	data: T;
	timestamp: ISODateString;
	error?: string;
}

/** Subdomain result data */
export interface SubdomainResult {
	subdomain: string;
	ip?: string;
	alive: boolean;
	resolvedAt?: ISODateString;
}

/** Port result data */
export interface PortResult {
	port: number;
	protocol: string;
	service?: string;
	version?: string;
	state: "open" | "closed" | "filtered";
}

/** Technology result data */
export interface TechResult {
	technology: string;
	category: string;
	version?: string;
	confidence?: number;
}

/** Header result data */
export interface HeaderResult {
	name: string;
	value?: string;
	present: boolean;
	secure?: boolean;
}

/** TLS result data */
export interface TLSResult {
	version: string;
	issuer: string;
	subject: string;
	expiry: ISODateString;
	valid: boolean;
	daysUntilExpiry?: number;
}

/** Nuclei result data */
export interface NucleiResult {
	templateId: string;
	severity: string;
	matchedUrl: string;
	evidence?: string;
	tags?: string[];
}

/** Directory bruteforce result data */
export interface DirectoryResult {
	path: string;
	statusCode: number;
	contentLength?: number;
	contentType?: string;
	redirectUrl?: string;
}
