import { LiveScanTerminal } from "@/components/scanPageUI/LiveScanTerminal";
import { ArrowLeft, Share2, Download } from "lucide-react";
import Link from "next/link";

interface LivePageProps {
	params: Promise<{ scanId: string }>;
}

export default async function LiveScanPage({ params }: LivePageProps) {
	const { scanId } = await params;

	return (
		<div className="min-h-screen bg-[#282A36] p-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-4">
					<Link
						href="/dashboard"
						className="p-2 rounded-lg bg-[#44475A] hover:bg-[#6272A4]/50 transition-colors"
					>
						<ArrowLeft className="w-5 h-5 text-[#F8F8F2]" />
					</Link>
					<div>
						<h1 className="text-xl font-bold text-[#F8F8F2]">
							Live Scan
						</h1>
						<p className="text-sm text-[#6272A4]">
							Scan ID: {scanId}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button className="flex items-center gap-2 px-4 py-2 bg-[#44475A] text-[#F8F8F2] rounded-lg hover:bg-[#6272A4]/50 transition-colors">
						<Share2 className="w-4 h-4" />
						<span className="text-sm">Share</span>
					</button>
					<button className="flex items-center gap-2 px-4 py-2 bg-[#BD93F9] text-[#282A36] rounded-lg hover:bg-[#FF79C6] transition-colors">
						<Download className="w-4 h-4" />
						<span className="text-sm">Export</span>
					</button>
				</div>
			</div>

			{/* Terminal Container */}
			<div className="h-[calc(100vh-140px)]">
				<LiveScanTerminal scanId={scanId} className="h-full" />
			</div>
		</div>
	);
}
