"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { FixedSizeList } from "react-window";
import type { ScanLogPayload } from "@/types";

interface ScanLogsProps {
	logs: ScanLogPayload[];
	isConnected: boolean;
}

const LOG_LINE_HEIGHT = 24;
const MAX_VISIBLE_LOGS = 1000;
const VISIBLE_HEIGHT = 400;

const DRACULA = {
	foreground: "#f8f8f2",
	comment: "#6272a4",
	cyan: "#8be9fd",
	green: "#50fa7b",
	orange: "#ffb86c",
	pink: "#ff79c6",
	purple: "#bd93f9",
	red: "#ff5555",
	yellow: "#f1fa8c",
};

/** Memoized log line to prevent per-line re-renders */
const LogLine = memo(function LogLine({
	log,
	formatTime,
	getLevelColor,
}: {
	log: ScanLogPayload;
	formatTime: (timestamp: string) => string;
	getLevelColor: (level?: ScanLogPayload["level"]) => string;
}) {
	return (
		<div className="flex gap-2 px-4 py-0.5 hover:bg-zinc-900/50 font-mono text-sm">
			<span style={{ color: DRACULA.comment }} className="shrink-0">
				[{formatTime(log.timestamp)}]
			</span>
			<span
				className="shrink-0"
				style={{ color: getLevelColor(log.level) }}
			>
				{log.source}
			</span>
			<span style={{ color: DRACULA.pink }}>→</span>
			<span style={{ color: DRACULA.foreground }} className="break-all">
				{log.message}
			</span>
		</div>
	);
});

export function ScanLogs({ logs, isConnected }: ScanLogsProps) {
	const listRef = useRef<FixedSizeList>(null);
	const [autoScroll, setAutoScroll] = useState(true);

	// Limit logs to prevent memory issues
	const visibleLogs =
		logs.length > MAX_VISIBLE_LOGS ? logs.slice(-MAX_VISIBLE_LOGS) : logs;

	// Auto-scroll to bottom when new logs arrive
	useEffect(() => {
		if (autoScroll && listRef.current && visibleLogs.length > 0) {
			listRef.current.scrollToItem(visibleLogs.length - 1, "end");
		}
	}, [visibleLogs.length, autoScroll]);

	const formatTime = useCallback((timestamp: string) => {
		try {
			const date = new Date(timestamp);
			return date.toLocaleTimeString("en-US", {
				hour12: false,
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
		} catch {
			return "--:--:--";
		}
	}, []);

	const getLevelColor = useCallback((level?: ScanLogPayload["level"]) => {
		switch (level) {
			case "ERROR":
				return DRACULA.red;
			case "WARN":
				return DRACULA.orange;
			case "DEBUG":
				return DRACULA.comment;
			case "INFO":
			default:
				return DRACULA.green;
		}
	}, []);

	// Virtualized row renderer
	const Row = useCallback(
		({ index, style }: { index: number; style: React.CSSProperties }) => {
			const log = visibleLogs[index];
			if (!log) return null;
			return (
				<div style={style}>
					<LogLine
						log={log}
						formatTime={formatTime}
						getLevelColor={getLevelColor}
					/>
				</div>
			);
		},
		[visibleLogs, formatTime, getLevelColor],
	);

	return (
		<div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d0d] shadow-2xl">
			{/* macOS Title Bar */}
			<div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
				{/* Traffic lights */}
				<div className="flex items-center gap-1.5">
					<div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
					<div className="w-3 h-3 rounded-full bg-[#febc2e]" />
					<div className="w-3 h-3 rounded-full bg-[#28c840]" />
				</div>

				{/* Title */}
				<div className="flex-1 text-center">
					<span
						className="text-sm font-medium"
						style={{ color: DRACULA.purple }}
					>
						FindIt — Live Scan
					</span>
				</div>

				{/* Connection status */}
				<div className="flex items-center gap-2">
					<div
						className={`w-2 h-2 rounded-full ${isConnected ? "animate-pulse" : ""}`}
						style={{
							backgroundColor: isConnected
								? DRACULA.green
								: DRACULA.red,
						}}
					/>
					<span
						className="text-xs"
						style={{ color: DRACULA.comment }}
					>
						{isConnected ? "Live" : "Disconnected"}
					</span>
				</div>
			</div>

			{/* Virtualized Terminal Content */}
			<div
				style={{
					scrollbarWidth: "thin",
					scrollbarColor: "#3f3f46 transparent",
				}}
			>
				{visibleLogs.length === 0 ? (
					<div
						className="flex items-center justify-center h-[400px]"
						style={{ color: DRACULA.comment }}
					>
						<span>Waiting for scan logs...</span>
					</div>
				) : (
					<FixedSizeList
						ref={listRef}
						height={VISIBLE_HEIGHT}
						itemCount={visibleLogs.length}
						itemSize={LOG_LINE_HEIGHT}
						width="100%"
						style={{ overflowX: "hidden" }}
					>
						{Row}
					</FixedSizeList>
				)}
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border-t border-zinc-800">
				<span className="text-xs" style={{ color: DRACULA.comment }}>
					{visibleLogs.length} log entries
					{logs.length > MAX_VISIBLE_LOGS && (
						<span
							style={{ color: DRACULA.comment, opacity: 0.6 }}
							className="ml-1"
						>
							(showing last {MAX_VISIBLE_LOGS})
						</span>
					)}
				</span>
				<button
					onClick={() => setAutoScroll(!autoScroll)}
					className="text-xs px-2 py-1 rounded transition-colors"
					style={{
						backgroundColor: autoScroll
							? `${DRACULA.green}15`
							: "transparent",
						color: autoScroll ? DRACULA.green : DRACULA.comment,
						border: `1px solid ${autoScroll ? `${DRACULA.green}40` : "transparent"}`,
					}}
				>
					Auto-scroll: {autoScroll ? "ON" : "OFF"}
				</button>
			</div>
		</div>
	);
}
