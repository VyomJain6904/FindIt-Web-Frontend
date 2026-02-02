"use client";

import { useState, useCallback } from "react";
import { FileText, X, AlertCircle, Lock } from "lucide-react";
import { FileUpload } from "@/components/aceternity/FileUpload";
import { usePermissions } from "@/hooks/usePermissions";

interface WordlistUploadProps {
	onFileChange: (file: WordlistFile | null) => void;
	file: WordlistFile | null;
}

export interface WordlistFile {
	name: string;
	size: number;
	wordCount: number;
	reference: string;
}

// Strict file validation
function validateWordlistFile(file: File): { valid: boolean; error?: string } {
	const name = file.name.toLowerCase();

	// Check for double extensions (security)
	const parts = name.split(".");
	if (parts.length > 2) {
		return {
			valid: false,
			error: "Invalid filename - double extensions not allowed",
		};
	}

	// Must end with .txt only
	if (!name.endsWith(".txt")) {
		return { valid: false, error: "Only .txt files are allowed" };
	}

	// Check for suspicious patterns
	const suspiciousPatterns = [
		/\.php/i,
		/\.asp/i,
		/\.jsp/i,
		/\.exe/i,
		/\.sh/i,
		/\.bash/i,
		/\.py/i,
		/\.rb/i,
		/\.pl/i,
		/\.cgi/i,
		/\.htaccess/i,
	];

	for (const pattern of suspiciousPatterns) {
		if (pattern.test(name)) {
			return { valid: false, error: "Suspicious filename detected" };
		}
	}

	// Size limit: 20MB
	if (file.size > 20 * 1024 * 1024) {
		return { valid: false, error: "File too large (max 20MB)" };
	}

	// Empty file check
	if (file.size === 0) {
		return { valid: false, error: "File is empty" };
	}

	return { valid: true };
}

function formatSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function WordlistUpload({ onFileChange, file }: WordlistUploadProps) {
	const [error, setError] = useState<string | null>(null);
	const { canUseModule, getUpgradeMessage } = usePermissions();

	const isLocked = !canUseModule("directory_bruteforce");

	const handleFileSelect = useCallback(
		async (files: File[]) => {
			const selectedFile = files[0];
			if (!selectedFile) return;

			setError(null);

			// Validate file
			const validation = validateWordlistFile(selectedFile);
			if (!validation.valid) {
				setError(validation.error || "Invalid file");
				return;
			}

			try {
				// Count words (lines)
				const text = await selectedFile.text();
				const lines = text
					.split("\n")
					.filter((line) => line.trim().length > 0);
				const wordCount = lines.length;

				// Generate a mock reference (in production, this would come from upload API)
				const reference = `wordlist-${Date.now()}-${Math.random().toString(36).slice(2)}`;

				onFileChange({
					name: selectedFile.name,
					size: selectedFile.size,
					wordCount,
					reference,
				});
			} catch {
				setError("Failed to read file");
			}
		},
		[onFileChange],
	);

	const handleRemove = useCallback(() => {
		onFileChange(null);
		setError(null);
	}, [onFileChange]);

	if (isLocked) {
		return (
			<div className="space-y-2">
				<label className="block text-sm font-medium text-zinc-300 flex items-center gap-2">
					Custom Wordlist
					<span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
						Pro
					</span>
				</label>
				<div
					className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 opacity-60 cursor-not-allowed"
					title={getUpgradeMessage("directory_bruteforce")}
				>
					<div className="flex items-center gap-3 text-zinc-500">
						<Lock className="h-5 w-5" />
						<span className="text-sm">
							Upgrade to Pro to use custom wordlists
						</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<label className="block text-sm font-medium text-zinc-300 flex items-center gap-2">
				Custom Wordlist
				<span className="text-xs text-zinc-500">(Optional)</span>
			</label>

			{file ? (
				<div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-3">
							<div className="p-2 rounded-lg bg-violet-500/20">
								<FileText className="h-5 w-5 text-violet-400" />
							</div>
							<div>
								<p className="font-medium text-zinc-200">
									{file.name}
								</p>
								<div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
									<span>{formatSize(file.size)}</span>
									<span>•</span>
									<span>
										{file.wordCount.toLocaleString()} words
									</span>
								</div>
							</div>
						</div>
						<button
							type="button"
							onClick={handleRemove}
							className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				</div>
			) : (
				<div className="rounded-xl border border-zinc-700 bg-zinc-900/50 overflow-hidden">
					<FileUpload onChange={handleFileSelect} />
					<p className="text-xs text-zinc-500 text-center pb-3">
						.txt files only, max 20MB
					</p>
				</div>
			)}

			{error && (
				<p className="text-sm text-red-400 flex items-center gap-1">
					<AlertCircle className="h-4 w-4" />
					{error}
				</p>
			)}
		</div>
	);
}
