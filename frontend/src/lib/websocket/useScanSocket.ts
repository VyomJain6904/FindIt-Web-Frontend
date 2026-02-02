"use client";

/**
 * Scan WebSocket Hook
 * React hook for subscribing to scan events
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { createWSClient, WSClient } from "./client";
import type {
	WSConnectionStatus,
	ScanLogPayload,
	ScanProgressPayload,
	WorkerEventPayload,
	FindingEventPayload,
	ScanCompletedPayload,
} from "@/types";
import { isDemoMode } from "@/lib/demo/mode";
import { useDemoScanSocket } from "@/lib/demo/websocket";

/** Hook configuration */
export interface UseScanSocketOptions {
	scanId: string;
	enabled?: boolean;
	onLog?: (log: ScanLogPayload) => void;
	onProgress?: (progress: ScanProgressPayload) => void;
	onWorkerUpdate?: (worker: WorkerEventPayload) => void;
	onFinding?: (finding: FindingEventPayload) => void;
	onComplete?: (result: ScanCompletedPayload) => void;
	onError?: (error: { code: string; message: string }) => void;
}

/** Hook return value */
export interface UseScanSocketReturn {
	status: WSConnectionStatus;
	isConnected: boolean;
	logs: ScanLogPayload[];
	progress: ScanProgressPayload | null;
	workers: Map<string, WorkerEventPayload>;
	latestFinding: FindingEventPayload | null;
	connect: () => void;
	disconnect: () => void;
	clearLogs: () => void;
}

/** WebSocket URL builder */
function getWSUrl(scanId: string): string {
	const baseUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080";
	return `${baseUrl}/ws/scan/${scanId}`;
}

/** Max logs to keep in memory */
const MAX_LOGS = 1000;

export function useScanSocket(
	options: UseScanSocketOptions,
): UseScanSocketReturn {
	const {
		scanId,
		enabled = true,
		onLog,
		onProgress,
		onWorkerUpdate,
		onFinding,
		onComplete,
		onError,
	} = options;

	const isDemo = isDemoMode() || scanId === "scan-demo-001";

	// Demo socket hook (always called to respect rules of hooks)
	const demoSocket = useDemoScanSocket({
		scanId,
		onLog,
		onProgress,
		enabled: isDemo,
	});

	const [status, setStatus] = useState<WSConnectionStatus>("DISCONNECTED");
	const [logs, setLogs] = useState<ScanLogPayload[]>([]);
	const [progress, setProgress] = useState<ScanProgressPayload | null>(null);
	const [workers, setWorkers] = useState<Map<string, WorkerEventPayload>>(
		new Map(),
	);
	const [latestFinding, setLatestFinding] =
		useState<FindingEventPayload | null>(null);

	const clientRef = useRef<WSClient | null>(null);

	// Connect function
	const connect = useCallback(() => {
		if (clientRef.current) return;

		const client = createWSClient({
			url: getWSUrl(scanId),
			reconnect: true,
		});

		// Status updates
		client.onStatusChange(setStatus);

		// Event handlers
		client.events.on("SCAN_LOG", (payload) => {
			setLogs((prev) => {
				const next = [...prev, payload];
				return next.length > MAX_LOGS ? next.slice(-MAX_LOGS) : next;
			});
			onLog?.(payload);
		});

		client.events.on("SCAN_PROGRESS", (payload) => {
			if (payload.scanId === scanId) {
				setProgress(payload);
				onProgress?.(payload);
			}
		});

		client.events.on("WORKER_STARTED", (payload) => {
			setWorkers((prev) => new Map(prev).set(payload.workerId, payload));
			onWorkerUpdate?.(payload);
		});

		client.events.on("WORKER_PROGRESS", (payload) => {
			setWorkers((prev) => new Map(prev).set(payload.workerId, payload));
			onWorkerUpdate?.(payload);
		});

		client.events.on("WORKER_COMPLETED", (payload) => {
			setWorkers((prev) => new Map(prev).set(payload.workerId, payload));
			onWorkerUpdate?.(payload);
		});

		client.events.on("WORKER_FAILED", (payload) => {
			setWorkers((prev) => new Map(prev).set(payload.workerId, payload));
			onWorkerUpdate?.(payload);
		});

		client.events.on("FINDING_DISCOVERED", (payload) => {
			setLatestFinding(payload);
			onFinding?.(payload);
		});

		client.events.on("SCAN_COMPLETED", (payload) => {
			if (payload.scanId === scanId) {
				onComplete?.(payload);
			}
		});

		client.events.on("ERROR", (payload) => {
			onError?.(payload);
		});

		client.connect();
		clientRef.current = client;
	}, [
		scanId,
		onLog,
		onProgress,
		onWorkerUpdate,
		onFinding,
		onComplete,
		onError,
	]);

	// Disconnect function
	const disconnect = useCallback(() => {
		if (clientRef.current) {
			clientRef.current.disconnect();
			clientRef.current = null;
		}
		setStatus("DISCONNECTED");
	}, []);

	// Clear logs
	const clearLogs = useCallback(() => {
		setLogs([]);
	}, []);

	// Auto-connect/disconnect based on enabled flag
	useEffect(() => {
		if (enabled && scanId && !isDemo) {
			connect();
		}

		return () => {
			disconnect();
		};
	}, [enabled, scanId, connect, disconnect]);

	if (isDemo) {
		return {
			status: demoSocket.isConnected ? "CONNECTED" : "CONNECTING",
			isConnected: demoSocket.isConnected,
			logs: demoSocket.logs,
			progress: demoSocket.progress,
			workers: new Map(
				demoSocket.workers.map((w) => [
					w.workerId,
					{ ...w, scanId } as WorkerEventPayload,
				]),
			),
			latestFinding: null,
			connect: () => {},
			disconnect: () => {},
			clearLogs: () => {},
		};
	}

	return {
		status,
		isConnected: status === "CONNECTED",
		logs,
		progress,
		workers,
		latestFinding,
		connect,
		disconnect,
		clearLogs,
	};
}
