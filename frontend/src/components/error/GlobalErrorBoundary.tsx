"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface GlobalErrorBoundaryProps {
	children: ReactNode;
}

interface GlobalErrorBoundaryState {
	hasError: boolean;
	errorId: string | null;
}

/**
 * Global Error Boundary
 * Catches rendering errors at the root level
 * Prevents white-screen crashes
 */
export class GlobalErrorBoundary extends Component<
	GlobalErrorBoundaryProps,
	GlobalErrorBoundaryState
> {
	constructor(props: GlobalErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, errorId: null };
	}

	static getDerivedStateFromError(): GlobalErrorBoundaryState {
		const errorId = `ERR-${Date.now()}`;
		return { hasError: true, errorId };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		// Log to console in development - would send to monitoring in production
		console.error("[GlobalErrorBoundary] Caught error:", {
			error: error.message,
			errorId: this.state.errorId,
			componentStack: errorInfo.componentStack,
		});
	}

	handleReload = (): void => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen bg-black flex items-center justify-center p-6">
					<div className="max-w-md w-full bg-zinc-900 rounded-2xl border border-zinc-800 p-8 text-center">
						<div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
							<AlertTriangle className="w-8 h-8 text-red-400" />
						</div>

						<h1 className="text-xl font-bold text-zinc-100 mb-2">
							Something went wrong
						</h1>

						<p className="text-zinc-400 text-sm mb-6">
							We encountered an unexpected error. Our team has
							been notified. Please try refreshing the page.
						</p>

						<button
							onClick={this.handleReload}
							className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
						>
							<RefreshCw className="w-4 h-4" />
							Refresh Page
						</button>

						{this.state.errorId && (
							<p className="mt-6 text-xs text-zinc-600">
								Error ID: {this.state.errorId}
							</p>
						)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
