"use client";

import { useState, useEffect } from "react";
import {
	ScanLogs,
	ScanHeader,
	ScanProgress,
	ScanTabs,
	PerspectiveToggle,
	SubdomainResults,
	PortResults,
	TechResults,
	HeadersResults,
	TLSResults,
	DirectoryResults,
	CloudResults,
	NucleiResults,
} from "@/components/scan";
import { LocalErrorBoundary, ConnectionBanner } from "@/components/error";
import { DemoBanner } from "@/components/demo";
import { usePermissions } from "@/hooks/usePermissions";
import { useScanSocket } from "@/lib/websocket/useScanSocket";
import {
	isDemoMode,
	DEMO_SCAN_STATE,
	DEMO_SCAN_PROGRESS,
	DEMO_SUBDOMAINS,
	DEMO_PORTS,
	DEMO_TECHNOLOGIES,
	DEMO_HEADERS,
	DEMO_TLS,
	DEMO_DIRECTORIES,
	DEMO_CLOUD_ASSETS,
	DEMO_NUCLEI,
	DEMO_LOGS,
	DEMO_FEATURE_FLAGS,
} from "@/lib/demo";
import type { TabId, Perspective } from "@/components/scan";
import type {
	ScanState,
	ScanLogPayload,
	ScanProgressPayload,
	FeatureFlags,
	WorkerState,
} from "@/types";
import type {
	SubdomainResultWithAI,
	PortResultWithAI,
	TechResultWithAI,
	HeaderResultWithAI,
	TLSResultWithAI,
	DirectoryResultWithAI,
	NucleiResultWithAI,
} from "@/types/ai-context";
import type { CloudResultWithAI } from "@/types/cloud";

interface ScanPageProps {
	params: Promise<{ scanId: string }>;
}

// Initial workers state
const INITIAL_WORKERS: WorkerState[] = [
	{
		workerId: "subdomain-worker",
		type: "SUBDOMAIN",
		status: "PENDING",
		progress: 0,
	},
	{ workerId: "port-worker", type: "PORT", status: "PENDING", progress: 0 },
	{ workerId: "tech-worker", type: "TECH", status: "PENDING", progress: 0 },
	{
		workerId: "headers-worker",
		type: "HEADERS",
		status: "PENDING",
		progress: 0,
	},
	{ workerId: "tls-worker", type: "TLS", status: "PENDING", progress: 0 },
	{
		workerId: "directory-worker",
		type: "DIRECTORY",
		status: "PENDING",
		progress: 0,
	},
	{
		workerId: "nuclei-worker",
		type: "NUCLEI",
		status: "PENDING",
		progress: 0,
	},
];

// Placeholder feature flags
const PLACEHOLDER_FEATURES: FeatureFlags = {
	ai_analysis: false,
	report_export: true,
	branding_removal: false,
	deep_scan: false,
	custom_scan: false,
	custom_wordlist: false,
	cloud_enumeration: false,
};

export default function ScanResultsPage({ params }: ScanPageProps) {
	const [scanId, setScanId] = useState<string>("");
	const [activeTab, setActiveTab] = useState<TabId>("subdomains");
	const [perspective, setPerspective] = useState<Perspective>("neutral");
	const [isDemoScan, setIsDemoScan] = useState(false);

	// Get permissions from subscription
	const { getDisabledScanTabs, getUpgradeMessage } = usePermissions();

	// Use demo data if in demo mode
	const isDemo = isDemoMode();
	const [features] = useState<FeatureFlags>(
		isDemo ? DEMO_FEATURE_FLAGS : PLACEHOLDER_FEATURES,
	);

	// Scan state
	const [scan, setScan] = useState<ScanState>(
		isDemo
			? DEMO_SCAN_STATE
			: {
					id: "",
					target: "Loading...",
					status: "QUEUED",
					type: "QUICK",
					progress: 0,
					startedAt: new Date().toISOString(),
					findingCount: 0,
					workers: INITIAL_WORKERS,
					createdAt: new Date().toISOString(),
				},
	);

	const [progress, setProgress] = useState<ScanProgressPayload>(
		isDemo
			? DEMO_SCAN_PROGRESS
			: {
					scanId: "",
					progress: 0,
					status: "QUEUED",
					workersCompleted: 0,
					workersTotal: 7,
				},
	);

	// Results state (with AI context support)
	const [results, setResults] = useState({
		subdomains: (isDemo ? DEMO_SUBDOMAINS : []) as SubdomainResultWithAI[],
		ports: (isDemo ? DEMO_PORTS : []) as PortResultWithAI[],
		technologies: (isDemo ? DEMO_TECHNOLOGIES : []) as TechResultWithAI[],
		headers: (isDemo ? DEMO_HEADERS : []) as HeaderResultWithAI[],
		tls: (isDemo ? DEMO_TLS : []) as TLSResultWithAI[],
		directories: (isDemo
			? DEMO_DIRECTORIES
			: []) as DirectoryResultWithAI[],
		cloud: (isDemo ? DEMO_CLOUD_ASSETS : []) as CloudResultWithAI[],
		vulnerabilities: (isDemo ? DEMO_NUCLEI : []) as NucleiResultWithAI[],
	});

	// Loading states per worker
	const [loading, setLoading] = useState({
		subdomains: !isDemo,
		ports: !isDemo,
		technologies: !isDemo,
		headers: !isDemo,
		tls: !isDemo,
		directories: !isDemo,
		cloud: !isDemo,
		vulnerabilities: !isDemo,
	});

	// Error states per worker
	const [errors, setErrors] = useState<Record<string, string | undefined>>(
		{},
	);

	// WebSocket Hook
	const socket = useScanSocket({
		scanId,
		enabled: !!scanId,
	});

	// Sync logs and connection status
	const isConnected = socket.isConnected;
	const logs = socket.logs;

	// Sync progress
	useEffect(() => {
		if (socket.progress) {
			setProgress(socket.progress);
		}
	}, [socket.progress]);

	// Resolve params
	useEffect(() => {
		params.then((p) => {
			setScanId(p.scanId);
			const demoOverride = p.scanId === "scan-demo-001";
			setIsDemoScan(demoOverride);

			if (isDemo || demoOverride) {
				// Ensure demo data is loaded if forced via ID
				setScan(DEMO_SCAN_STATE);
				// Results already loaded via initial state if isDemo is true,
				// but if only demoOverride is true (and isDemo false), we need to set them:
				if (!isDemo && demoOverride) {
					setResults({
						subdomains: DEMO_SUBDOMAINS,
						ports: DEMO_PORTS,
						technologies: DEMO_TECHNOLOGIES,
						headers: DEMO_HEADERS,
						tls: DEMO_TLS,
						directories: DEMO_DIRECTORIES,
						cloud: DEMO_CLOUD_ASSETS,
						vulnerabilities: DEMO_NUCLEI,
					});
					setLoading({
						subdomains: false,
						ports: false,
						technologies: false,
						headers: false,
						tls: false,
						directories: false,
						cloud: false,
						vulnerabilities: false,
					});
				}
			} else {
				setScan((prev) => ({ ...prev, id: p.scanId }));
				setProgress((prev) => ({ ...prev, scanId: p.scanId }));
				// Simulate loading complete after mount
				setTimeout(() => {
					setLoading({
						subdomains: false,
						ports: false,
						technologies: false,
						headers: false,
						tls: false,
						directories: false,
						cloud: false,
						vulnerabilities: false,
					});
				}, 1500);
			}
		});
	}, [params, isDemo]);

	// Convert workers to format expected by ScanProgress
	const workersForProgress = scan.workers.map((w) => ({
		name: w.workerId,
		status: w.status.toLowerCase() as
			| "pending"
			| "running"
			| "completed"
			| "failed",
	}));

	const renderTabContent = () => {
		switch (activeTab) {
			case "subdomains":
				return (
					<SubdomainResults
						results={results.subdomains}
						perspective={perspective}
						loading={loading.subdomains}
						error={errors.subdomains}
					/>
				);
			case "ports":
				return (
					<PortResults
						results={results.ports}
						perspective={perspective}
						loading={loading.ports}
						error={errors.ports}
					/>
				);
			case "technologies":
				return (
					<TechResults
						results={results.technologies}
						perspective={perspective}
						loading={loading.technologies}
						error={errors.technologies}
					/>
				);
			case "headers":
				return (
					<HeadersResults
						results={results.headers}
						perspective={perspective}
						loading={loading.headers}
						error={errors.headers}
					/>
				);
			case "tls":
				return (
					<TLSResults
						results={results.tls}
						perspective={perspective}
						loading={loading.tls}
						error={errors.tls}
					/>
				);
			case "directories":
				return (
					<DirectoryResults
						results={results.directories}
						perspective={perspective}
						loading={loading.directories}
						error={errors.directories}
					/>
				);
			case "cloud":
				return (
					<CloudResults
						results={results.cloud}
						perspective={perspective}
						loading={loading.cloud}
						error={errors.cloud}
					/>
				);
			case "vulnerabilities":
				return (
					<NucleiResults
						results={results.vulnerabilities}
						perspective={perspective}
						loading={loading.vulnerabilities}
						error={errors.vulnerabilities}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div
			className={`p-3 sm:p-6 space-y-4 sm:space-y-6 min-h-screen bg-black ${isDemo || isDemoScan ? "pt-16" : ""}`}
		>
			{/* Demo Banner */}
			{(isDemo || isDemoScan) && <DemoBanner />}

			{/* Connection Banner */}
			<ConnectionBanner isConnected={isConnected} />

			{/* Header */}
			<LocalErrorBoundary sectionName="Scan Header">
				<ScanHeader scan={scan} />
			</LocalErrorBoundary>

			{/* Progress */}
			<LocalErrorBoundary sectionName="Scan Progress">
				<ScanProgress
					progress={progress}
					workers={workersForProgress}
				/>
			</LocalErrorBoundary>

			{/* Main Content Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Left: Terminal */}
				<div className="lg:col-span-2">
					<LocalErrorBoundary sectionName="Scan Logs">
						<ScanLogs logs={logs} isConnected={isConnected} />
					</LocalErrorBoundary>
				</div>

				{/* Right: Perspective Toggle */}
				<div>
					<PerspectiveToggle
						value={perspective}
						onChange={setPerspective}
						features={features}
					/>
				</div>
			</div>

			{/* Tabs */}
			<ScanTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				counts={{
					subdomains: results.subdomains.length,
					ports: results.ports.length,
					technologies: results.technologies.length,
					headers: results.headers.length,
					tls: results.tls.length,
					directories: results.directories.length,
					cloud: results.cloud.length,
					vulnerabilities: results.vulnerabilities.length,
				}}
				disabledTabs={getDisabledScanTabs()}
			/>

			{/* Tab Content - Each worker wrapped independently */}
			<LocalErrorBoundary sectionName={`${activeTab} Results`}>
				{renderTabContent()}
			</LocalErrorBoundary>
		</div>
	);
}
