"use client";

import { User, Mail, Calendar, Clock } from "lucide-react";
import type { UserProfile } from "@/types/settings";

interface ProfileSectionProps {
	profile: UserProfile;
}

function formatDate(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function formatDateTime(dateStr: string): string {
	const date = new Date(dateStr);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

export function ProfileSection({ profile }: ProfileSectionProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-zinc-800">
					<User className="h-5 w-5 text-zinc-400" />
				</div>
				<div>
					<h2 className="text-lg font-semibold text-zinc-100">
						Profile
					</h2>
					<p className="text-sm text-zinc-500">Account information</p>
				</div>
			</div>

			<div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 space-y-4">
				{/* Name */}
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<User className="h-4 w-4 text-zinc-500" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs text-zinc-500">Name</p>
						<p className="text-sm text-zinc-200">{profile.name}</p>
					</div>
				</div>

				{/* Email */}
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<Mail className="h-4 w-4 text-zinc-500" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs text-zinc-500">Email</p>
						<p className="text-sm text-zinc-200 font-mono truncate">
							{profile.email}
						</p>
					</div>
				</div>

				{/* Account Created */}
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
						<Calendar className="h-4 w-4 text-zinc-500" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs text-zinc-500">Account Created</p>
						<p className="text-sm text-zinc-200">
							{formatDate(profile.createdAt)}
						</p>
					</div>
				</div>

				{/* Last Login */}
				{profile.lastLoginAt && (
					<div className="flex items-center gap-3">
						<div className="p-2 rounded-lg bg-zinc-800 shrink-0">
							<Clock className="h-4 w-4 text-zinc-500" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-xs text-zinc-500">Last Login</p>
							<p className="text-sm text-zinc-200">
								{formatDateTime(profile.lastLoginAt)}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
