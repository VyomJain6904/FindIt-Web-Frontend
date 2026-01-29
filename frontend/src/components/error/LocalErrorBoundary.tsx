"use client";

import { Component, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface LocalErrorBoundaryProps {
	children: ReactNode;
	/** Name of the section for display */
	sectionName?: string;
	/** Optional custom fallback */
	fallback?: ReactNode;
	/** Optional callback when error occurs */
	onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface LocalErrorBoundaryState {
	hasError: boolean;
	errorId: string | null;
}

/**
 * Local Error Boundary
 * Wraps individual panels/sections
 * One section failing does NOT break others
 */
export class LocalErrorBoundary extends Component<
	LocalErrorBoundaryProps,
	LocalErrorBoundaryState
> {
	constructor(props: LocalErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, errorId: null };
	}

	static getDerivedStateFromError(): LocalErrorBoundaryState {
		const errorId = `ERR-${Date.now()}`;
		return { hasError: true, errorId };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.error(`[LocalErrorBoundary:${this.props.sectionName}]`, {
			error: error.message,
			errorId: this.state.errorId,
		});

		this.props.onError?.(error, errorInfo);
	}

	handleRetry = (): void => {
		this.setState({ hasError: false, errorId: null });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="bg-zinc-900 rounded-xl border border-red-900/30 p-6">
					<div className="flex items-start gap-3">
						<div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
							<AlertCircle className="w-5 h-5 text-red-400" />
						</div>
						<div className="flex-1">
							<h3 className="text-sm font-medium text-zinc-200">
								{this.props.sectionName || "Section"} failed to
								load
							</h3>
							<p className="text-xs text-zinc-500 mt-1">
								This section encountered an error. Other
								sections remain functional.
							</p>
							<button
								onClick={this.handleRetry}
								className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
							>
								<RefreshCw className="w-3 h-3" />
								Retry
							</button>
						</div>
					</div>
					{this.state.errorId && (
						<p className="mt-4 text-xs text-zinc-600">
							ID: {this.state.errorId}
						</p>
					)}
				</div>
			);
		}

		return this.props.children;
	}
}
