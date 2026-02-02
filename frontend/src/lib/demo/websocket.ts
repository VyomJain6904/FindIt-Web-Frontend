/**
 * Demo WebSocket Hook
 * Simulates WebSocket events in demo mode
 */

import { useState, useEffect, useRef } from "react";
import { isDemoMode } from "./mode";
import { DEMO_LOGS, DEMO_SCAN_PROGRESS, DEMO_SCAN_STATE } from "./data";
import type { ScanLogPayload, ScanProgressPayload } from "@/types";

interface DemoScanSocketOptions {
	scanId: string;
	onLog?: (log: ScanLogPayload) => void;
	onProgress?: (progress: ScanProgressPayload) => void;
	enabled?: boolean;
}

interface DemoScanSocketReturn {
	logs: ScanLogPayload[];
	progress: ScanProgressPayload;
	isConnected: boolean;
	workers: typeof DEMO_SCAN_STATE.workers;
}

/**
 * Demo version of useScanSocket
 * Simulates real-time log streaming with deterministic data
 */
export function useDemoScanSocket({
	scanId,
	onLog,
	onProgress,
	enabled = isDemoMode(),
}: DemoScanSocketOptions): DemoScanSocketReturn {
	const [logs, setLogs] = useState<ScanLogPayload[]>([]);
	const [progress, setProgress] =
		useState<ScanProgressPayload>(DEMO_SCAN_PROGRESS);
	const [isConnected, setIsConnected] = useState(false);
	const logIndexRef = useRef(0);

	useEffect(() => {
		if (!enabled) return;

		// Simulate connection delay
		const connectTimeout = setTimeout(() => {
			setIsConnected(true);
		}, 500);

		// Simulate log streaming
		const logInterval = setInterval(() => {
			if (logIndexRef.current < DEMO_LOGS.length) {
				const newLog = DEMO_LOGS[logIndexRef.current];
				setLogs((prev) => [...prev, newLog]);
				onLog?.(newLog);
				logIndexRef.current++;

				// Update progress based on log index
				const progressPercent = Math.min(
					100,
					Math.round((logIndexRef.current / DEMO_LOGS.length) * 100),
				);
				const newProgress = {
					...DEMO_SCAN_PROGRESS,
					progress: progressPercent,
					status: progressPercent === 100 ? "COMPLETED" : "RUNNING",
				} as ScanProgressPayload;
				setProgress(newProgress);
				onProgress?.(newProgress);
			}
		}, 800); // Simulate realistic log frequency

		return () => {
			clearTimeout(connectTimeout);
			clearInterval(logInterval);
		};
	}, [scanId, onLog, onProgress, enabled]);

	return {
		logs,
		progress,
		isConnected,
		workers: DEMO_SCAN_STATE.workers,
	};
}
