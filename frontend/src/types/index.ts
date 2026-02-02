/**
 * FindIt Frontend Types - Central Export
 * Import all types from here: import { ... } from '@/types'
 */

// Common types
export type {
	ISODateString,
	Pagination,
	PaginatedResponse,
	APIError,
	APIResponse,
	FeatureFlags,
	SubscriptionTier,
	BaseEntity,
} from "./common";

// Scan types
export type {
	ScanStatus,
	ScanType,
	WorkerType,
	WorkerStatus,
	ScanOptions,
	ScanCreateRequest,
	ScanCreateResponse,
	WorkerState,
	ScanState,
	ScanListItem,
	ScanWorkerResult,
	SubdomainResult,
	PortResult,
	TechResult,
	HeaderResult,
	TLSResult,
	NucleiResult,
	DirectoryResult,
	WordlistUpload,
} from "./scan";

// Finding types
export type {
	FindingSeverity,
	FindingCategory,
	FindingSource,
	RedTeamAnalysis,
	BlueTeamAnalysis,
	Finding,
	AIFinding,
	FindingListItem,
	FindingStats,
} from "./findings";

// Report types
export type {
	ReportFormat,
	ReportStatus,
	ReportSection,
	ReportSummary,
	ReportDetail,
	ReportGenerateRequest,
	ReportGenerateResponse,
} from "./reports";

// WebSocket types
export type {
	WSConnectionStatus,
	WSEventType,
	WSEvent,
	LogLevel,
	ScanLogPayload,
	ScanProgressPayload,
	WorkerEventPayload,
	FindingEventPayload,
	ScanCompletedPayload,
	ErrorEventPayload,
	WSEventMap,
} from "./websocket";

// Cloud types
export type { CloudAsset, CloudResultWithAI } from "./cloud";
