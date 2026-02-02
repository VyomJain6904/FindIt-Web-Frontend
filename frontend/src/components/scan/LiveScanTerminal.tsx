"use client";

import { useScanSocket } from "@/lib/websocket/useScanSocket";
import { ScanLogs } from "./ScanLogs";

interface LiveScanTerminalProps {
	scanId: string;
	className?: string;
}

export function LiveScanTerminal({ scanId, className }: LiveScanTerminalProps) {
	// Use the standardized socket hook which supports Demo Mode
	const { logs, isConnected, status } = useScanSocket({
		scanId,
		enabled: true,
	});

	return (
		<div className={className}>
			{!isConnected && status === "ERROR" && (
				<div className="mb-4 p-4 rounded bg-red-500/10 border border-red-500/20 text-red-500">
					Connection Error: WebSocket failed to connect
				</div>
			)}
			<ScanLogs logs={logs} isConnected={isConnected} />
		</div>
	);
}
