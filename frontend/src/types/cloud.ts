/**
 * Cloud Asset types for FindIt API contract
 * JSON-compatible only - string unions for enums
 * Mirrors libs/events cloud-worker
 */

import type { AIContext } from "./ai-context";

/** Cloud asset discovered by cloud-worker */
export interface CloudAsset {
	/** Cloud provider (AWS, GCP, Azure, etc.) */
	provider: string;
	/** Service type (S3, GCS, Blob, CloudFront, etc.) */
	service: string;
	/** Resource identifier/name */
	resource_name: string;
	/** Region if available */
	region?: string;
	/** Whether publicly accessible - backend-determined */
	public_access?: boolean;
	/** Endpoint URL if available */
	endpoint?: string;
}

/** Cloud result with optional AI context */
export interface CloudResultWithAI extends CloudAsset {
	ai?: AIContext;
}
