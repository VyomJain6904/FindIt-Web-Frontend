"use client";

import { Zap, Infinity as InfinityIcon } from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";

export function ScanQuota() {
	const { plan, remainingScans } = usePermissions();

	const isUnlimited = remainingScans === -1;

	return (
		<div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-zinc-800">
						<Zap className="h-4 w-4 text-zinc-400" />
					</div>
					<div>
						<p className="text-xs text-zinc-500 uppercase tracking-wide">
							Scan Quota
						</p>
						<div className="flex items-center gap-2 mt-0.5">
							{isUnlimited ? (
								<>
									<InfinityIcon className="h-4 w-4 text-emerald-400" />
									<span className="text-sm text-emerald-400">
										Unlimited
									</span>
								</>
							) : (
								<span className="text-sm text-zinc-200">
									<span className="font-semibold text-violet-400">
										{remainingScans}
									</span>{" "}
									scans remaining this month
								</span>
							)}
						</div>
					</div>
				</div>
				<span
					className={`text-xs font-medium px-2 py-1 rounded-lg ${
						plan === "enterprise"
							? "bg-amber-500/10 text-amber-400"
							: plan === "pro"
								? "bg-blue-500/10 text-blue-400"
								: "bg-zinc-800 text-zinc-400"
					}`}
				>
					{plan.charAt(0).toUpperCase() + plan.slice(1)}
				</span>
			</div>
		</div>
	);
}
