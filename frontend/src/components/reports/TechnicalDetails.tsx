import { ReportDetail } from "@/types";

interface TechnicalDetailsProps {
	details: string;
	sections: ReportDetail["sections"];
}

export function TechnicalDetails({ details, sections }: TechnicalDetailsProps) {
	return (
		<div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
			<h2 className="text-lg font-semibold text-zinc-100 mb-6">
				Technical Details
			</h2>

			{details && (
				<div className="prose prose-invert prose-zinc max-w-none mb-8">
					<p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
						{details}
					</p>
				</div>
			)}

			{sections.length > 0 && (
				<div className="space-y-6">
					{sections
						.sort((a, b) => a.order - b.order)
						.map((section, index) => (
							<div
								key={`section-${index}`}
								className="border-t border-zinc-800 pt-6 first:border-0 first:pt-0"
							>
								<h3 className="text-sm font-medium text-zinc-200 mb-3">
									{section.title}
								</h3>
								<p className="text-sm text-zinc-400 whitespace-pre-wrap">
									{section.content}
								</p>
							</div>
						))}
				</div>
			)}

			{!details && sections.length === 0 && (
				<p className="text-zinc-500">No technical details available</p>
			)}
		</div>
	);
}
