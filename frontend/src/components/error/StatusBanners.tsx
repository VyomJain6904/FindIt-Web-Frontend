"use client";

import { AlertTriangle, WifiOff, RefreshCw, X } from "lucide-react";
import { useState } from "react";

/** Connection status banner props */
interface ConnectionBannerProps {
	isConnected: boolean;
	isReconnecting?: boolean;
	onRetry?: () => void;
}

/**
 * WebSocket connection status banner
 * Shows when connection is lost or reconnecting
 */
export function ConnectionBanner({
	isConnected,
	isReconnecting,
	onRetry,
}: ConnectionBannerProps) {
	const [dismissed, setDismissed] = useState(false);

	if (isConnected || dismissed) return null;

	return (
		<div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<WifiOff className="w-4 h-4 text-yellow-400" />
				<div>
					<p className="text-sm text-yellow-200">
						{isReconnecting
							? "Reconnecting..."
							: "Live updates paused"}
					</p>
					<p className="text-xs text-yellow-400/70">
						Connection to server lost. Data may be stale.
					</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				{onRetry && !isReconnecting && (
					<button
						onClick={onRetry}
						className="p-2 text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors"
					>
						<RefreshCw className="w-4 h-4" />
					</button>
				)}
				<button
					onClick={() => setDismissed(true)}
					className="p-2 text-yellow-400/50 hover:text-yellow-400 transition-colors"
				>
					<X className="w-4 h-4" />
				</button>
			</div>
		</div>
	);
}

/** API error banner props */
interface APIErrorBannerProps {
	message?: string;
	code?: string;
	onRetry?: () => void;
	onDismiss?: () => void;
}

/**
 * API error banner
 * Non-blocking notification for API failures
 */
export function APIErrorBanner({
	message = "Failed to load data",
	code,
	onRetry,
	onDismiss,
}: APIErrorBannerProps) {
	return (
		<div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<AlertTriangle className="w-4 h-4 text-red-400" />
				<div>
					<p className="text-sm text-red-200">{message}</p>
					{code && (
						<p className="text-xs text-red-400/70">Error: {code}</p>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2">
				{onRetry && (
					<button
						onClick={onRetry}
						className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"
					>
						<RefreshCw className="w-3 h-3" />
						Retry
					</button>
				)}
				{onDismiss && (
					<button
						onClick={onDismiss}
						className="p-2 text-red-400/50 hover:text-red-400 transition-colors"
					>
						<X className="w-4 h-4" />
					</button>
				)}
			</div>
		</div>
	);
}

/** Offline banner props */
interface OfflineBannerProps {
	onRetry?: () => void;
}

/**
 * Offline/timeout state banner
 */
export function OfflineBanner({ onRetry }: OfflineBannerProps) {
	return (
		<div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<WifiOff className="w-4 h-4 text-zinc-400" />
				<div>
					<p className="text-sm text-zinc-200">
						You appear to be offline
					</p>
					<p className="text-xs text-zinc-500">
						Check your connection and try again
					</p>
				</div>
			</div>
			{onRetry && (
				<button
					onClick={onRetry}
					className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-700 hover:bg-zinc-600 rounded transition-colors"
				>
					<RefreshCw className="w-3 h-3" />
					Retry
				</button>
			)}
		</div>
	);
}

/** Partial data warning props */
interface PartialDataBannerProps {
	message?: string;
}

/**
 * Partial/incomplete data warning
 */
export function PartialDataBanner({
	message = "Some data may be incomplete",
}: PartialDataBannerProps) {
	return (
		<div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2 flex items-center gap-3">
			<AlertTriangle className="w-4 h-4 text-blue-400 shrink-0" />
			<p className="text-xs text-blue-300">{message}</p>
		</div>
	);
}
