/**
 * API Gateway Client
 * Single, safe data-access layer for all REST endpoints
 *
 * Features:
 * - Type-safe requests and responses
 * - Centralized error handling
 * - Future-ready for auth, retries, rate limiting
 */

import { APIResponse } from "@/types";
import {
	parseAPIError,
	createNetworkError,
	createTimeoutError,
	ClassifiedError,
} from "./errors";

/** API client configuration */
export interface APIClientConfig {
	baseUrl: string;
	timeout?: number;
	headers?: Record<string, string>;
}

/** Request options */
export interface RequestOptions {
	headers?: Record<string, string>;
	signal?: AbortSignal;
	timeout?: number;
}

/** Default configuration */
const DEFAULT_CONFIG: APIClientConfig = {
	baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
};

/** Current configuration - can be updated */
let config: APIClientConfig = { ...DEFAULT_CONFIG };

/** Configure the API client */
export function configureAPI(newConfig: Partial<APIClientConfig>): void {
	config = { ...config, ...newConfig };
}

/** Get current configuration */
export function getAPIConfig(): APIClientConfig {
	return { ...config };
}

/** Build full URL from path */
function buildUrl(path: string): string {
	const base = config.baseUrl.replace(/\/$/, "");
	const cleanPath = path.startsWith("/") ? path : `/${path}`;
	return `${base}${cleanPath}`;
}

/** Build headers with auth and custom headers */
function buildHeaders(options?: RequestOptions): Headers {
	const headers = new Headers(config.headers);

	// Add custom headers
	if (options?.headers) {
		Object.entries(options.headers).forEach(([key, value]) => {
			headers.set(key, value);
		});
	}

	// Future: Add auth token here
	// const token = getAuthToken();
	// if (token) headers.set('Authorization', `Bearer ${token}`);

	return headers;
}

/** Create timeout signal */
function createTimeoutSignal(
	timeout: number,
	existingSignal?: AbortSignal,
): { signal: AbortSignal; cleanup: () => void } {
	const controller = new AbortController();

	const timeoutId = setTimeout(() => {
		controller.abort();
	}, timeout);

	// Link to existing signal if provided
	if (existingSignal) {
		existingSignal.addEventListener("abort", () => {
			controller.abort();
			clearTimeout(timeoutId);
		});
	}

	return {
		signal: controller.signal,
		cleanup: () => clearTimeout(timeoutId),
	};
}

/** Generic fetch wrapper */
async function request<T>(
	method: string,
	path: string,
	body?: unknown,
	options?: RequestOptions,
): Promise<APIResponse<T>> {
	const url = buildUrl(path);
	const headers = buildHeaders(options);
	const timeout = options?.timeout || config.timeout || 30000;

	const { signal, cleanup } = createTimeoutSignal(timeout, options?.signal);

	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined,
			signal,
		});

		cleanup();

		// Parse response body
		let data: unknown;
		const contentType = response.headers.get("content-type");

		if (contentType?.includes("application/json")) {
			data = await response.json();
		} else {
			data = await response.text();
		}

		// Handle non-2xx responses
		if (!response.ok) {
			const error = parseAPIError(response.status, data);
			return { success: false, error };
		}

		return { success: true, data: data as T };
	} catch (err) {
		cleanup();

		// Handle abort/timeout
		if (err instanceof Error && err.name === "AbortError") {
			const error = options?.signal?.aborted
				? createNetworkError("Request cancelled")
				: createTimeoutError();
			return { success: false, error };
		}

		// Handle network errors
		const error = createNetworkError(
			err instanceof Error ? err.message : "Network error",
		);
		return { success: false, error };
	}
}

/** HTTP Methods */
export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>("GET", path, undefined, options),

	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("POST", path, body, options),

	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("PUT", path, body, options),

	patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>("PATCH", path, body, options),

	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>("DELETE", path, undefined, options),
};

export type { ClassifiedError };
