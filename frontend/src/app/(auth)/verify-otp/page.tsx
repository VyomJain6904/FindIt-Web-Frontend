"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type OTPStatus = "idle" | "verifying" | "success" | "error";

function OTPVerificationContent() {
	const searchParams = useSearchParams();
	const email = searchParams.get("email") || "";

	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [status, setStatus] = useState<OTPStatus>("idle");
	const [resendTimer, setResendTimer] = useState(30);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	// Countdown timer for resend
	useEffect(() => {
		if (resendTimer > 0) {
			const timer = setTimeout(
				() => setResendTimer(resendTimer - 1),
				1000,
			);
			return () => clearTimeout(timer);
		}
	}, [resendTimer]);

	// Auto-focus first input
	useEffect(() => {
		inputRefs.current[0]?.focus();
	}, []);

	const handleChange = (index: number, value: string) => {
		if (!/^\d*$/.test(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.slice(-1);
		setOtp(newOtp);

		if (status === "error") {
			setStatus("idle");
		}

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").slice(0, 6);
		if (!/^\d+$/.test(pastedData)) return;

		const newOtp = [...otp];
		pastedData.split("").forEach((char, i) => {
			if (i < 6) newOtp[i] = char;
		});
		setOtp(newOtp);
		inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const otpCode = otp.join("");

		if (otpCode.length !== 6) {
			setStatus("error");
			return;
		}

		setStatus("verifying");

		setTimeout(() => {
			if (otpCode === "123456") {
				setStatus("success");
				setTimeout(() => {
					window.location.href = "/dashboard";
				}, 1000);
			} else {
				setStatus("error");
			}
		}, 1000);
	};

	const handleResend = () => {
		if (resendTimer > 0) return;
		setResendTimer(30);
		setOtp(["", "", "", "", "", ""]);
		setStatus("idle");
		inputRefs.current[0]?.focus();
	};

	const getBoxStyle = (hasValue: boolean) => {
		if (status === "success") {
			return "border-[#50fa7b] bg-black";
		}
		if (status === "error") {
			return "border-[#ff5555]/50 bg-black";
		}
		return hasValue
			? "border-[#44475a] bg-black"
			: "border-[#44475a] bg-black";
	};

	const getTextColor = () => {
		if (status === "success") return "text-[#50fa7b]";
		if (status === "error") return "text-[#ff5555]";
		return "text-[#f8f8f2]";
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
			{/* Title */}
			<h2 className="text-3xl font-bold text-foreground text-center mb-8 tracking-wide">
				One Time Token
			</h2>

			<form onSubmit={handleSubmit}>
				{/* OTP Input Grid - Grouped 3-3 with dash */}
				<div className="flex items-center gap-3 mb-6">
					{/* First group of 3 */}
					<div className="flex gap-2">
						{[0, 1, 2].map((index) => (
							<input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={otp[index]}
								onChange={(e) =>
									handleChange(index, e.target.value)
								}
								onKeyDown={(e) => handleKeyDown(index, e)}
								onPaste={index === 0 ? handlePaste : undefined}
								disabled={
									status === "verifying" ||
									status === "success"
								}
								className={cn(
									"w-12 h-14 text-center text-xl font-medium rounded-lg border-2 transition-all focus:outline-none focus:border-[#ff79c6]",
									getBoxStyle(!!otp[index]),
									getTextColor(),
								)}
							/>
						))}
					</div>

					{/* Dash separator */}
					<span className="text-[#ff79c6] text-2xl font-light px-1">
						—
					</span>

					{/* Second group of 3 */}
					<div className="flex gap-2">
						{[3, 4, 5].map((index) => (
							<input
								key={index}
								ref={(el) => {
									inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={otp[index]}
								onChange={(e) =>
									handleChange(index, e.target.value)
								}
								onKeyDown={(e) => handleKeyDown(index, e)}
								disabled={
									status === "verifying" ||
									status === "success"
								}
								className={cn(
									"w-12 h-14 text-center text-xl font-medium rounded-lg border-2 transition-all focus:outline-none focus:border-[#ff79c6]",
									getBoxStyle(!!otp[index]),
									getTextColor(),
								)}
							/>
						))}
					</div>
				</div>

				{/* Error Message */}
				{status === "error" && (
					<p className="text-[#ff5555] text-sm text-center mb-4">
						Invalid OTP code
					</p>
				)}

				{/* Success Message */}
				{status === "success" && (
					<p className="text-[#50fa7b] text-sm text-center mb-4">
						Verified! Redirecting...
					</p>
				)}

				{/* Submit Button */}
				<button
					className="group/btn relative block h-12 w-full rounded-xl font-medium text-[#f8f8f2] bg-[#282a36] hover:bg-[#44475a] border border-[#44475a] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
					disabled={
						status === "verifying" ||
						status === "success" ||
						otp.join("").length !== 6
					}
				>
					{status === "verifying" ? (
						<span className="flex items-center justify-center gap-2">
							<svg
								className="animate-spin h-5 w-5 text-[#bd93f9]"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							<span className="text-[#bd93f9]">Verifying...</span>
						</span>
					) : status === "success" ? (
						<span className="flex items-center justify-center gap-2 text-[#50fa7b]">
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							Success!
						</span>
					) : (
						<>Verify</>
					)}
				</button>

				{/* Resend OTP */}
				<div className="mt-6 text-center">
					<p className="text-sm text-[#6272a4]">
						Didn't receive the code?{" "}
						{resendTimer > 0 ? (
							<span className="text-[#44475a]">
								Resend in {resendTimer}s
							</span>
						) : (
							<button
								type="button"
								onClick={handleResend}
								className="text-[#ff79c6] hover:text-[#ff79c6]/80 font-medium transition-colors"
							>
								Resend OTP
							</button>
						)}
					</p>
				</div>

				<p className="mt-6 text-center text-sm">
					<Link
						href="/login"
						className="text-[#8be9fd] hover:text-[#8be9fd]/80 transition-colors"
					>
						&larr; Back to Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default function VerifyOTPPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
					<div className="animate-spin h-8 w-8 border-2 border-[#bd93f9] border-t-transparent rounded-full" />
				</div>
			}
		>
			<OTPVerificationContent />
		</Suspense>
	);
}
