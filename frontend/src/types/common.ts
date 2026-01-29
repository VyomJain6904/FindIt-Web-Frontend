/**
 * Common types for FindIt API contract
 * JSON-compatible only - no methods, no classes
 * Mirrors libs/events
 */

/** ISO 8601 date string format */
export type ISODateString = string;

/** Standard pagination structure for list endpoints */
export interface Pagination {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
	data: T[];
	pagination: Pagination;
}

/** Standard API error response */
export interface APIError {
	code: string;
	message: string;
	details?: Record<string, unknown>;
	timestamp: ISODateString;
}

/** API response wrapper for consistent handling */
export type APIResponse<T> =
	| { success: true; data: T }
	| { success: false; error: APIError };

/** Feature flags from backend - controls UI capabilities */
export interface FeatureFlags {
	/** Can export reports */
	report_export: boolean;
	/** Can remove branding from reports */
	branding_removal: boolean;
	/** AI analysis available */
	ai_analysis: boolean;
	/** Deep scan available */
	deep_scan: boolean;
	/** Custom scan options */
	custom_scan: boolean;
	/** Custom wordlist upload */
	custom_wordlist: boolean;
	/** Additional flags */
	[key: string]: boolean;
}

/** User subscription tier - render only, no logic */
export type SubscriptionTier = "free" | "pro" | "enterprise";

/** Base entity with common fields */
export interface BaseEntity {
	id: string;
	createdAt: ISODateString;
	updatedAt?: ISODateString;
}
