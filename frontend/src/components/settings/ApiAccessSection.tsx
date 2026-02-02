"use client";

import { Key, Clock } from "lucide-react";

export function ApiAccessSection() {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-zinc-800">
					<Key className="h-5 w-5 text-zinc-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-zinc-100">
						API Access
					</h2>
					<p className="text-sm text-zinc-500">Programmatic access</p>
				</div>
			</div>

			<div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
				<div className="p-3 rounded-full bg-zinc-800 w-fit mx-auto mb-4">
					<Clock className="h-6 w-6 text-zinc-500" />
				</div>
				<h3 className="text-lg font-medium text-zinc-300 mb-2">
					Coming Soon
				</h3>
				<p className="text-sm text-zinc-500 max-w-sm mx-auto">
					API access with token generation will be available in a
					future update. Stay tuned!
				</p>
			</div>
		</div>
	);
}
