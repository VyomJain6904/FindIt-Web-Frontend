interface ExecutiveSummaryProps {
	summary: string;
}

export function ExecutiveSummary({ summary }: ExecutiveSummaryProps) {
	if (!summary) {
		return (
			<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
				<h2 className="text-lg font-semibold text-zinc-100 mb-4">
					Executive Summary
				</h2>
				<p className="text-zinc-500">No executive summary available</p>
			</div>
		);
	}

	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
			<h2 className="text-lg font-semibold text-zinc-100 mb-4">
				Executive Summary
			</h2>
			<div className="prose prose-invert prose-zinc max-w-none">
				<p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
					{summary}
				</p>
			</div>
		</div>
	);
}
