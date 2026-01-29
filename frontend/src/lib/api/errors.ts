/**
 * API Error handling utilities
 * Centralized error parsing and classification
 */

import { APIError } from "@/types";

/** Known API error codes */
export type APIErrorCode =
	| "UNAUTHORIZED"
	| "FORBIDDEN"
	| "NOT_FOUND"
	| "VALIDATION_ERROR"
	| "RATE_LIMITED"
	| "SERVER_ERROR"
	| "NETWORK_ERROR"
	| "TIMEOUT"
	| "UNKNOWN";

/** Extended error with classification */
export interface ClassifiedError extends APIError {
	classification: APIErrorCode;
	retryable: boolean;
	userMessage: string;
}

/** Parse API error from response */
export function parseAPIError(status: number, body: unknown): ClassifiedError {
	const timestamp = new Date().toISOString();

	// Try to extract error from body
	const apiError = isAPIError(body) ? body : null;

	const baseError = {
		code: apiError?.code || `HTTP_${status}`,
		message: apiError?.message || getDefaultMessage(status),
		details: apiError?.details,
		timestamp: apiError?.timestamp || timestamp,
	};

	return {
		...baseError,
		classification: classifyError(status, baseError.code),
		retryable: isRetryable(status),
		userMessage: getUserMessage(status, baseError.message),
	};
}

/** Check if body is an APIError */
function isAPIError(body: unknown): body is APIError {
	if (typeof body !== "object" || body === null) return false;
	const obj = body as Record<string, unknown>;
	return typeof obj.code === "string" && typeof obj.message === "string";
}

/** Classify error by status code and error code */
function classifyError(status: number, code: string): APIErrorCode {
	if (status === 401) return "UNAUTHORIZED";
	if (status === 403) return "FORBIDDEN";
	if (status === 404) return "NOT_FOUND";
	if (status === 422 || status === 400) return "VALIDATION_ERROR";
	if (status === 429) return "RATE_LIMITED";
	if (status >= 500) return "SERVER_ERROR";
	if (status === 0) return "NETWORK_ERROR";
	return "UNKNOWN";
}

/** Check if error is retryable */
function isRetryable(status: number): boolean {
	return status === 429 || status >= 500 || status === 0;
}

/** Get default HTTP status message */
function getDefaultMessage(status: number): string {
	const messages: Record<number, string> = {
		400: "Bad request",
		401: "Authentication required",
		403: "Access denied",
		404: "Resource not found",
		422: "Validation failed",
		429: "Too many requests",
		500: "Internal server error",
		502: "Service unavailable",
		503: "Service temporarily unavailable",
		504: "Request timeout",
	};
	return messages[status] || "An error occurred";
}

/** Get user-friendly message */
function getUserMessage(status: number, message: string): string {
	if (status === 401) return "Please log in to continue";
	if (status === 403) return "You don't have permission to access this";
	if (status === 404) return "The requested resource was not found";
	if (status === 429) return "Please wait before trying again";
	if (status >= 500) return "Something went wrong. Please try again later";
	return message;
}

/** Create network error */
export function createNetworkError(message: string): ClassifiedError {
	return {
		code: "NETWORK_ERROR",
		message,
		timestamp: new Date().toISOString(),
		classification: "NETWORK_ERROR",
		retryable: true,
		userMessage: "Unable to connect. Please check your connection.",
	};
}

/** Create timeout error */
export function createTimeoutError(): ClassifiedError {
	return {
		code: "TIMEOUT",
		message: "Request timed out",
		timestamp: new Date().toISOString(),
		classification: "TIMEOUT",
		retryable: true,
		userMessage: "The request took too long. Please try again.",
	};
}
