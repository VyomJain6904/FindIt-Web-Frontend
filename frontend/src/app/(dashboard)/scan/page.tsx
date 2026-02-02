"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Radar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
	TargetInput,
	ScanTemplates,
	ScanModules,
	WordlistUpload,
	ScanPreview,
	ScanQuota,
	StartScanButton,
	getTemplateModules,
} from "@/components/scan/ScanCreate";
import type { ScanTemplate, WordlistFile } from "@/components/scan/ScanCreate";
import type { ScanModule } from "@/types/subscription";
import { LocalErrorBoundary } from "@/components/error";
import { DemoBanner } from "@/components/demo";
import { isDemoMode } from "@/lib/demo";
import { usePermissions } from "@/hooks/usePermissions";

export default function ScanPage() {
	const router = useRouter();
	const { canUseModule } = usePermissions();
	const isDemo = isDemoMode();

	// Form state
	const [target, setTarget] = useState("");
	const [targetValid, setTargetValid] = useState(false);
	const [template, setTemplate] = useState<ScanTemplate>("quick");
	const [selectedModules, setSelectedModules] = useState<ScanModule[]>([]);
	const [wordlist, setWordlist] = useState<WordlistFile | null>(null);
	const [loading, setLoading] = useState(false);
	const [showDemoToast, setShowDemoToast] = useState(false);

	// AI enabled check (based on selected modules)
	const aiEnabled = selectedModules.includes("vulnerability_scan");

	// Update modules when template changes
	useEffect(() => {
		if (template === "custom") {
			// Keep current selection for custom
			return;
		}
		const templateModules = getTemplateModules(template);
		// Filter to only include modules the user can access
		const accessibleModules = templateModules.filter((mod) =>
			canUseModule(mod),
		);
		setSelectedModules(accessibleModules);
	}, [template, canUseModule]);

	// Validation
	const isValidConfig = targetValid && selectedModules.length > 0;

	// Handle template change
	const handleTemplateChange = useCallback((newTemplate: ScanTemplate) => {
		setTemplate(newTemplate);
	}, []);

	// Handle modules change
	const handleModulesChange = useCallback(
		(modules: ScanModule[]) => {
			setSelectedModules(modules);
			// If user modifies modules, switch to custom template
			if (template !== "custom") {
				const templateModules = getTemplateModules(template);
				const isSame =
					modules.length === templateModules.length &&
					modules.every((m) => templateModules.includes(m));
				if (!isSame) {
					setTemplate("custom");
				}
			}
		},
		[template],
	);

	// Handle scan start
	const handleStartScan = useCallback(async () => {
		if (!isValidConfig) return;

		// Demo mode - block execution
		if (isDemo) {
			setShowDemoToast(true);
			setTimeout(() => setShowDemoToast(false), 3000);
			return;
		}

		setLoading(true);

		try {
			// Build scan config
			const scanConfig = {
				target,
				modules: selectedModules,
				template,
				wordlistRef: wordlist?.reference || null,
				aiEnabled,
			};

			// POST to API Gateway
			const response = await fetch("/api/scans", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(scanConfig),
			});

			if (!response.ok) {
				throw new Error("Failed to start scan");
			}

			const result = await response.json();

			// Navigate to scan results page
			router.push(`/scan/${result.scanId}`);
		} catch (error) {
			console.error("Scan start error:", error);
			// Error handling via error banner would go here
		} finally {
			setLoading(false);
		}
	}, [
		isValidConfig,
		isDemo,
		target,
		selectedModules,
		template,
		wordlist,
		aiEnabled,
		router,
	]);

	return (
		<div
			className={`p-4 sm:p-6 space-y-6 min-h-screen bg-black ${isDemo ? "pt-16" : ""}`}
		>
			{/* Demo Banner */}
			<DemoBanner />

			{/* Demo Toast */}
			{showDemoToast && (
				<div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-5">
					<div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
						<Radar className="h-5 w-5" />
						<span className="font-medium">
							Demo Mode – Scan execution disabled
						</span>
					</div>
				</div>
			)}

			{/* Back Link */}
			<Link
				href="/dashboard"
				className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
			>
				<ArrowLeft className="w-4 h-4" />
				Back to Dashboard
			</Link>

			{/* Header */}
			<div className="flex items-center gap-4">
				<div className="p-3 rounded-xl bg-gradient-to-br from-[#FF79C6]/20 to-[#ff99cc]/20 border border-[#FF79C6]/30">
					<Radar className="h-6 w-6 text-[#FF79C6]" />
				</div>
				<div>
					<h1 className="text-2xl font-bold text-zinc-100">
						New Scan
					</h1>
					<p className="text-sm text-zinc-500">
						Configure and start a security scan
					</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left Column - Form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Target Input */}
					<LocalErrorBoundary sectionName="Target Input">
						<div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
							<TargetInput
								value={target}
								onChange={setTarget}
								onValidationChange={setTargetValid}
							/>
						</div>
					</LocalErrorBoundary>

					{/* Scan Templates */}
					<LocalErrorBoundary sectionName="Scan Templates">
						<div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
							<ScanTemplates
								selected={template}
								onChange={handleTemplateChange}
							/>
						</div>
					</LocalErrorBoundary>

					{/* Scan Modules */}
					<LocalErrorBoundary sectionName="Scan Modules">
						<div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
							<ScanModules
								selectedModules={selectedModules}
								onChange={handleModulesChange}
								disabled={loading}
							/>
						</div>
					</LocalErrorBoundary>

					{/* Custom Wordlist */}
					<LocalErrorBoundary sectionName="Wordlist Upload">
						<div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
							<WordlistUpload
								file={wordlist}
								onFileChange={setWordlist}
							/>
						</div>
					</LocalErrorBoundary>
				</div>

				{/* Right Column - Preview & Actions */}
				<div className="space-y-6">
					{/* Quota */}
					<LocalErrorBoundary sectionName="Scan Quota">
						<ScanQuota />
					</LocalErrorBoundary>

					{/* Preview */}
					<LocalErrorBoundary sectionName="Scan Preview">
						<div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
							<ScanPreview
								target={target}
								template={template}
								selectedModules={selectedModules}
								wordlist={wordlist}
								aiEnabled={aiEnabled}
							/>
						</div>
					</LocalErrorBoundary>

					{/* Start Button */}
					<LocalErrorBoundary sectionName="Start Scan">
						<StartScanButton
							disabled={!isValidConfig}
							loading={loading}
							onClick={handleStartScan}
						/>
					</LocalErrorBoundary>

					{/* Validation Helper */}
					{!isValidConfig && target && (
						<p className="text-xs text-zinc-500 text-center">
							{!targetValid
								? "Enter a valid target"
								: selectedModules.length === 0
									? "Select at least one module"
									: "Complete configuration to start scan"}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
