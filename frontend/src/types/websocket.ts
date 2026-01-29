/**
 * WebSocket event types for FindIt API contract
 * JSON-compatible only - typed event routing
 * Mirrors libs/events
 */

import { ISODateString } from "./common";
import { ScanStatus, WorkerType, WorkerStatus } from "./scan";
import { Finding, FindingSeverity } from "./findings";

/** WebSocket connection status */
export type WSConnectionStatus =
	| "CONNECTING"
	| "CONNECTED"
	| "DISCONNECTED"
	| "RECONNECTING"
	| "ERROR";

/** All possible WebSocket event types */
export type WSEventType =
	| "SCAN_STARTED"
	| "SCAN_PROGRESS"
	| "SCAN_COMPLETED"
	| "SCAN_FAILED"
	| "SCAN_LOG"
	| "WORKER_STARTED"
	| "WORKER_PROGRESS"
	| "WORKER_COMPLETED"
	| "WORKER_FAILED"
	| "FINDING_DISCOVERED"
	| "REPORT_READY"
	| "ERROR"
	| "PING"
	| "PONG";

/** Generic WebSocket event wrapper */
export interface WSEvent<T = unknown> {
	type: WSEventType;
	payload: T;
	timestamp: ISODateString;
	eventId: string;
	scanId?: string;
}

/** Log levels for scan logs */
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

/** Scan log event payload */
export interface ScanLogPayload {
	scanId: string;
	level: LogLevel;
	message: string;
	source: string;
	timestamp: ISODateString;
	metadata?: Record<string, unknown>;
}

/** Scan progress event payload */
export interface ScanProgressPayload {
	scanId: string;
	progress: number;
	status: ScanStatus;
	currentTask?: string;
	workersCompleted: number;
	workersTotal: number;
}

/** Worker event payload */
export interface WorkerEventPayload {
	workerId: string;
	scanId: string;
	type: WorkerType;
	status: WorkerStatus;
	progress?: number;
	resultCount?: number;
	error?: string;
}

/** Live finding event payload */
export interface FindingEventPayload {
	scanId: string;
	findingId: string;
	title: string;
	severity: FindingSeverity;
	asset: string;
	source: string;
}

/** Scan completion event payload */
export interface ScanCompletedPayload {
	scanId: string;
	status: ScanStatus;
	duration: number;
	findingCount: number;
	completedAt: ISODateString;
}

/** Error event payload */
export interface ErrorEventPayload {
	code: string;
	message: string;
	recoverable: boolean;
	scanId?: string;
}

/** Typed event map for type-safe event handling */
export interface WSEventMap {
	SCAN_STARTED: { scanId: string; target: string };
	SCAN_PROGRESS: ScanProgressPayload;
	SCAN_COMPLETED: ScanCompletedPayload;
	SCAN_FAILED: { scanId: string; error: string };
	SCAN_LOG: ScanLogPayload;
	WORKER_STARTED: WorkerEventPayload;
	WORKER_PROGRESS: WorkerEventPayload;
	WORKER_COMPLETED: WorkerEventPayload;
	WORKER_FAILED: WorkerEventPayload;
	FINDING_DISCOVERED: FindingEventPayload;
	REPORT_READY: { reportId: string; scanId: string; downloadUrl: string };
	ERROR: ErrorEventPayload;
	PING: { timestamp: ISODateString };
	PONG: { timestamp: ISODateString };
}
