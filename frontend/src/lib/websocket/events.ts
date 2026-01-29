/**
 * WebSocket Event Routing
 * Type-safe event parsing and dispatch
 */

import type {
	WSEvent,
	WSEventType,
	WSEventMap,
	ScanLogPayload,
	ScanProgressPayload,
	WorkerEventPayload,
	FindingEventPayload,
	ScanCompletedPayload,
	ErrorEventPayload,
} from "@/types";

/** Event handler type */
export type WSEventHandler<T extends WSEventType> = (
	payload: WSEventMap[T],
	event: WSEvent<WSEventMap[T]>,
) => void;

/** Event listener registry */
export type WSEventListeners = {
	[K in WSEventType]?: Set<WSEventHandler<K>>;
};

/** Parse raw WebSocket message to typed event */
export function parseWSEvent(data: string): WSEvent | null {
	try {
		const parsed = JSON.parse(data);

		// Validate basic structure
		if (
			typeof parsed !== "object" ||
			parsed === null ||
			typeof parsed.type !== "string" ||
			typeof parsed.timestamp !== "string"
		) {
			console.warn("[WS] Invalid event structure:", parsed);
			return null;
		}

		return parsed as WSEvent;
	} catch (err) {
		console.error("[WS] Failed to parse event:", err);
		return null;
	}
}

/** Validate event type */
export function isValidEventType(type: string): type is WSEventType {
	const validTypes: WSEventType[] = [
		"SCAN_STARTED",
		"SCAN_PROGRESS",
		"SCAN_COMPLETED",
		"SCAN_FAILED",
		"SCAN_LOG",
		"WORKER_STARTED",
		"WORKER_PROGRESS",
		"WORKER_COMPLETED",
		"WORKER_FAILED",
		"FINDING_DISCOVERED",
		"REPORT_READY",
		"ERROR",
		"PING",
		"PONG",
	];
	return validTypes.includes(type as WSEventType);
}

/** Create event emitter for WebSocket events */
export function createEventEmitter() {
	const listeners: WSEventListeners = {};

	return {
		/** Add event listener */
		on<T extends WSEventType>(
			type: T,
			handler: WSEventHandler<T>,
		): () => void {
			if (!listeners[type]) {
				listeners[type] = new Set();
			}
			(listeners[type] as Set<WSEventHandler<T>>).add(handler);

			// Return unsubscribe function
			return () => {
				(listeners[type] as Set<WSEventHandler<T>>).delete(handler);
			};
		},

		/** Remove event listener */
		off<T extends WSEventType>(type: T, handler: WSEventHandler<T>): void {
			listeners[type]?.delete(handler as WSEventHandler<WSEventType>);
		},

		/** Emit event to all listeners */
		emit<T extends WSEventType>(event: WSEvent<WSEventMap[T]>): void {
			const handlers = listeners[event.type as T];
			if (handlers) {
				handlers.forEach((handler) => {
					try {
						(handler as WSEventHandler<T>)(
							event.payload as WSEventMap[T],
							event,
						);
					} catch (err) {
						console.error(
							`[WS] Error in ${event.type} handler:`,
							err,
						);
					}
				});
			}
		},

		/** Clear all listeners */
		clear(): void {
			Object.keys(listeners).forEach((key) => {
				delete listeners[key as WSEventType];
			});
		},
	};
}

export type EventEmitter = ReturnType<typeof createEventEmitter>;
