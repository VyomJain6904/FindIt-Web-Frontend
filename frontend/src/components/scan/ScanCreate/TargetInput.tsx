"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { Search, AlertCircle, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TargetInputProps {
	value: string;
	onChange: (value: string) => void;
	error?: string;
	onValidationChange: (isValid: boolean) => void;
}

// SSRF protection - block dangerous IPs/hostnames
const BLOCKED_PATTERNS = [
	/^localhost$/i,
	/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
	/^0\.0\.0\.0$/,
	/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
	/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/,
	/^192\.168\.\d{1,3}\.\d{1,3}$/,
	/^169\.254\.\d{1,3}\.\d{1,3}$/,
	/^::1$/,
	/^fc00:/i,
	/^fe80:/i,
	/^fd00:/i,
	/^metadata\.google\.internal$/i,
	/^169\.254\.169\.254$/,
];

const SSRF_MESSAGE = "Nice try, better luck next time 😏";

// Domain validation schema
const domainSchema = z
	.string()
	.min(1, "Target is required")
	.max(253, "Target too long")
	.refine(
		(val) => {
			// Check for SSRF patterns
			for (const pattern of BLOCKED_PATTERNS) {
				if (pattern.test(val)) {
					return false;
				}
			}
			return true;
		},
		{ message: SSRF_MESSAGE },
	)
	.refine(
		(val) => {
			// Valid domain or IP
			const domainRegex =
				/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
			const ipRegex =
				/^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
			return domainRegex.test(val) || ipRegex.test(val);
		},
		{ message: "Enter a valid domain or IP address" },
	);

export function TargetInput({
	value,
	onChange,
	error,
	onValidationChange,
}: TargetInputProps) {
	const [localError, setLocalError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState(false);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value.trim().toLowerCase();
			onChange(newValue);

			if (!newValue) {
				setLocalError(null);
				setIsValid(false);
				onValidationChange(false);
				return;
			}

			const result = domainSchema.safeParse(newValue);
			if (result.success) {
				setLocalError(null);
				setIsValid(true);
				onValidationChange(true);
			} else {
				setLocalError(
					result.error.errors[0]?.message || "Invalid input",
				);
				setIsValid(false);
				onValidationChange(false);
			}
		},
		[onChange, onValidationChange],
	);

	const displayError = error || localError;

	return (
		<div className="space-y-3">
			<label className="block text-sm font-medium text-zinc-300">
				Target Domain or IP
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
					<Search className="h-5 w-5 text-zinc-500" />
				</div>
				<Input
					type="text"
					value={value}
					onChange={handleChange}
					placeholder="example.com"
					className={`pl-12 pr-12 ${
						displayError
							? "ring-2 ring-red-500/50"
							: isValid
								? "ring-2 ring-emerald-500/50"
								: ""
					}`}
				/>
				<div className="absolute inset-y-0 right-0 pr-4 flex items-center z-10">
					{displayError ? (
						<AlertCircle className="h-5 w-5 text-red-400" />
					) : isValid ? (
						<CheckCircle className="h-5 w-5 text-emerald-400" />
					) : null}
				</div>
			</div>
			{displayError && (
				<p className="text-sm text-red-400 flex items-center gap-1">
					<AlertCircle className="h-4 w-4" />
					{displayError}
				</p>
			)}
		</div>
	);
}
