/**
 * WebSocket Client
 * Manages WebSocket connection with reconnection logic
 */

import type { WSConnectionStatus, WSEvent } from "@/types";
import { parseWSEvent, createEventEmitter, EventEmitter } from "./events";

/** WebSocket client configuration */
export interface WSClientConfig {
	url: string;
	reconnect?: boolean;
	reconnectInterval?: number;
	maxReconnectAttempts?: number;
	pingInterval?: number;
}

/** WebSocket client state */
export interface WSClientState {
	status: WSConnectionStatus;
	reconnectAttempts: number;
	lastConnected?: Date;
	lastError?: string;
}

/** Default configuration */
const DEFAULT_CONFIG: Required<Omit<WSClientConfig, "url">> = {
	reconnect: true,
	reconnectInterval: 3000,
	maxReconnectAttempts: 10,
	pingInterval: 30000,
};

/** Create WebSocket client */
export function createWSClient(config: WSClientConfig) {
	const fullConfig = { ...DEFAULT_CONFIG, ...config };
	const emitter = createEventEmitter();

	let ws: WebSocket | null = null;
	let pingTimer: NodeJS.Timeout | null = null;
	let reconnectTimer: NodeJS.Timeout | null = null;

	let state: WSClientState = {
		status: "DISCONNECTED",
		reconnectAttempts: 0,
	};

	/** Status change listeners */
	const statusListeners = new Set<(status: WSConnectionStatus) => void>();

	/** Update status */
	function setStatus(status: WSConnectionStatus) {
		state = { ...state, status };
		statusListeners.forEach((listener) => listener(status));
	}

	/** Start ping/pong keepalive */
	function startPing() {
		stopPing();
		pingTimer = setInterval(() => {
			if (ws?.readyState === WebSocket.OPEN) {
				ws.send(
					JSON.stringify({
						type: "PING",
						timestamp: new Date().toISOString(),
					}),
				);
			}
		}, fullConfig.pingInterval);
	}

	/** Stop ping */
	function stopPing() {
		if (pingTimer) {
			clearInterval(pingTimer);
			pingTimer = null;
		}
	}

	/** Schedule reconnect */
	function scheduleReconnect() {
		if (!fullConfig.reconnect) return;
		if (state.reconnectAttempts >= fullConfig.maxReconnectAttempts) {
			setStatus("ERROR");
			return;
		}

		setStatus("RECONNECTING");
		reconnectTimer = setTimeout(() => {
			state = {
				...state,
				reconnectAttempts: state.reconnectAttempts + 1,
			};
			connect();
		}, fullConfig.reconnectInterval);
	}

	/** Cancel scheduled reconnect */
	function cancelReconnect() {
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = null;
		}
	}

	/** Connect to WebSocket server */
	function connect() {
		if (ws?.readyState === WebSocket.OPEN) return;

		setStatus("CONNECTING");

		try {
			ws = new WebSocket(fullConfig.url);

			ws.onopen = () => {
				setStatus("CONNECTED");
				state = {
					...state,
					reconnectAttempts: 0,
					lastConnected: new Date(),
				};
				startPing();
			};

			ws.onclose = (event) => {
				stopPing();
				setStatus("DISCONNECTED");

				if (!event.wasClean) {
					scheduleReconnect();
				}
			};

			ws.onerror = (error) => {
				state = { ...state, lastError: "WebSocket error" };
				console.error("[WS] Error:", error);
			};

			ws.onmessage = (event) => {
				const wsEvent = parseWSEvent(event.data);
				if (wsEvent) {
					emitter.emit(wsEvent);
				}
			};
		} catch (err) {
			state = { ...state, lastError: String(err) };
			setStatus("ERROR");
			scheduleReconnect();
		}
	}

	/** Disconnect from WebSocket server */
	function disconnect() {
		cancelReconnect();
		stopPing();

		if (ws) {
			ws.onclose = null; // Prevent reconnect on intentional close
			ws.close();
			ws = null;
		}

		setStatus("DISCONNECTED");
	}

	/** Send message */
	function send(data: unknown): boolean {
		if (ws?.readyState !== WebSocket.OPEN) return false;
		ws.send(JSON.stringify(data));
		return true;
	}

	/** Subscribe to specific scan */
	function subscribeTo(scanId: string): boolean {
		return send({ type: "SUBSCRIBE", scanId });
	}

	/** Unsubscribe from scan */
	function unsubscribeFrom(scanId: string): boolean {
		return send({ type: "UNSUBSCRIBE", scanId });
	}

	return {
		connect,
		disconnect,
		send,
		subscribeTo,
		unsubscribeFrom,

		/** Get current state */
		getState: () => ({ ...state }),

		/** Get event emitter for typed event handling */
		events: emitter,

		/** Subscribe to status changes */
		onStatusChange: (listener: (status: WSConnectionStatus) => void) => {
			statusListeners.add(listener);
			return () => statusListeners.delete(listener);
		},
	};
}

export type WSClient = ReturnType<typeof createWSClient>;
