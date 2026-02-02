"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GradientButton } from "@/components/ui/GradientButton";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		console.log("Password reset requested for:", email);

		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
		}, 1500);
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background">
				<div className="shadow-input mx-auto w-full max-w-md rounded-none md:rounded-2xl p-4 md:p-8 bg-card text-center">
					{/* Success Icon */}
					<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#50fa7b]/10 flex items-center justify-center">
						<svg
							className="w-8 h-8 text-[#50fa7b]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>

					<h2 className="text-2xl font-bold text-foreground">
						Check Your Email
					</h2>
					<p className="text-muted-foreground mt-4">
						We've sent password reset instructions to
					</p>
					<p className="text-[#8be9fd] font-medium mt-1">{email}</p>

					<p className="text-sm text-muted-foreground mt-6">
						Didn't receive the email? Check your spam folder or{" "}
						<button
							onClick={() => setIsSubmitted(false)}
							className="text-[#ff79c6] hover:text-[#ff79c6]/80 font-medium transition-colors"
						>
							try again
						</button>
					</p>

					<Link
						href="/login"
						className="mt-8 inline-block text-sm text-[#8be9fd] hover:text-[#8be9fd]/80 font-medium transition-colors"
					>
						&larr; Back to Login
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="shadow-input mx-auto w-full max-w-md rounded-none md:rounded-2xl p-4 md:p-8 bg-card">
				{/* Icon */}
				<div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#ffb86c]/10 flex items-center justify-center">
					<svg
						className="w-8 h-8 text-[#ffb86c]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
						/>
					</svg>
				</div>

				<h2 className="text-3xl font-bold text-foreground text-center">
					Forgot Password?
				</h2>
				<p className="text-sm text-muted-foreground text-center mt-2">
					No worries! Enter your email and we'll send you reset
					instructions.
				</p>

				<form className="my-8" onSubmit={handleSubmit}>
					<LabelInputContainer className="mb-8">
						<Label htmlFor="email" className="text-lg font-medium">
							Email Address
						</Label>
						<Input
							id="email"
							placeholder="admin@findit.sec"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="text-foreground h-12 text-lg"
							required
						/>
					</LabelInputContainer>

					<GradientButton
						type="submit"
						disabled={isLoading}
						className="h-12"
					>
						{isLoading ? (
							<span className="flex items-center justify-center gap-2">
								<Loader2 className="animate-spin h-5 w-5" />
								Sending...
							</span>
						) : (
							<>Send Reset Link</>
						)}
					</GradientButton>

					<p className="mt-6 text-center text-sm text-muted-foreground">
						Remember your password?{" "}
						<Link
							href="/login"
							className="text-[#ff79c6] hover:text-[#ff79c6]/80 font-medium transition-colors"
						>
							Back to Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("flex w-full flex-col space-y-2", className)}>
			{children}
		</div>
	);
};
