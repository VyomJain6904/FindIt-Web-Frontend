/**
 * Demo Data - Scans
 * Contract-valid fake scan data for demo mode
 */

import type {
	ScanState,
	WorkerState,
	ScanLogPayload,
	ScanProgressPayload,
} from "@/types";
import type {
	SubdomainResultWithAI,
	PortResultWithAI,
	TechResultWithAI,
	HeaderResultWithAI,
	TLSResultWithAI,
	NucleiResultWithAI,
	DirectoryResultWithAI,
} from "@/types/ai-context";

export const DEMO_SCAN_STATE: ScanState = {
	id: "scan-demo-001",
	target: "api.acme-corp.com",
	status: "RUNNING",
	type: "FULL",
	progress: 67,
	startedAt: "2026-01-27T10:00:00Z",
	findingCount: 8,
	createdAt: "2026-01-27T10:00:00Z",
	workers: [
		{
			workerId: "subdomain-worker",
			type: "SUBDOMAIN",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "port-worker",
			type: "PORT",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "tech-worker",
			type: "TECH",
			status: "RUNNING",
			progress: 75,
		},
		{
			workerId: "headers-worker",
			type: "HEADERS",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "tls-worker",
			type: "TLS",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "directory-worker",
			type: "DIRECTORY",
			status: "COMPLETED",
			progress: 100,
		},
		{
			workerId: "nuclei-worker",
			type: "NUCLEI",
			status: "RUNNING",
			progress: 42,
		},
	],
};

export const DEMO_SCAN_PROGRESS: ScanProgressPayload = {
	scanId: "scan-demo-001",
	progress: 67,
	status: "RUNNING",
	workersCompleted: 4,
	workersTotal: 6,
};

export const DEMO_SUBDOMAINS: SubdomainResultWithAI[] = [
	{
		subdomain: "api.acme-corp.com",
		ip: "52.12.34.56",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Public API endpoint",
				attackSurface: "REST API with authentication",
			},
			defender: { monitoringGap: "No rate limiting detected" },
		},
	},
	{
		subdomain: "app.acme-corp.com",
		ip: "52.12.34.57",
		alive: true,
		ai: {
			attacker: { exposureValue: "Main application" },
			defender: { hardeningRecommendation: "Enable WAF" },
		},
	},
	{
		subdomain: "staging.acme-corp.com",
		ip: "52.12.34.58",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Staging environment exposed",
				attackSurface: "Non-production data",
			},
			defender: { monitoringGap: "Should be internal only" },
		},
	},
	{
		subdomain: "admin.acme-corp.com",
		ip: "52.12.34.59",
		alive: true,
		ai: {
			attacker: {
				exposureValue: "Admin panel",
				attackSurface: "High-value target",
			},
			defender: { hardeningRecommendation: "Restrict to VPN" },
		},
	},
	{ subdomain: "mail.acme-corp.com", ip: "52.12.34.60", alive: true },
	{ subdomain: "vpn.acme-corp.com", ip: "52.12.34.61", alive: true },
	{ subdomain: "dev.acme-corp.com", ip: undefined, alive: false },
	{ subdomain: "test.acme-corp.com", ip: undefined, alive: false },
];

export const DEMO_PORTS: PortResultWithAI[] = [
	{
		port: 22,
		protocol: "tcp",
		service: "SSH",
		version: "OpenSSH 8.9",
		state: "open",
		ai: {
			attacker: { exposureValue: "Remote access" },
			defender: { hardeningRecommendation: "Key-only auth" },
		},
	},
	{
		port: 80,
		protocol: "tcp",
		service: "HTTP",
		state: "open",
		ai: {
			attacker: { exposureValue: "Unencrypted traffic" },
			defender: {
				remediationPriority: "medium",
				hardeningRecommendation: "Redirect to HTTPS",
			},
		},
	},
	{
		port: 443,
		protocol: "tcp",
		service: "HTTPS",
		version: "nginx/1.24",
		state: "open",
	},
	{
		port: 3306,
		protocol: "tcp",
		service: "MySQL",
		version: "8.0.32",
		state: "open",
		ai: {
			attacker: {
				exposureValue: "Database exposed",
				exploitability: "Credential brute force",
			},
			defender: {
				remediationPriority: "critical",
				hardeningRecommendation: "Restrict to internal network",
			},
		},
	},
	{
		port: 6379,
		protocol: "tcp",
		service: "Redis",
		version: "7.0.8",
		state: "open",
		ai: {
			attacker: {
				exposureValue: "Cache server",
				exploitability: "No auth required",
			},
			defender: { remediationPriority: "high" },
		},
	},
	{ port: 8080, protocol: "tcp", service: "HTTP-Alt", state: "open" },
];

export const DEMO_TECHNOLOGIES: TechResultWithAI[] = [
	{
		technology: "nginx",
		category: "Web Server",
		version: "1.24",
		ai: {
			attacker: { attackSurface: "Well-known CVEs" },
			defender: { patchingRelevance: "Keep updated" },
		},
	},
	{ technology: "React", category: "JavaScript Framework", version: "18.2" },
	{ technology: "Node.js", category: "Runtime", version: "20.10" },
	{
		technology: "PostgreSQL",
		category: "Database",
		version: "15.4",
		ai: { defender: { patchingRelevance: "Critical component" } },
	},
	{ technology: "Redis", category: "Cache", version: "7.0.8" },
	{ technology: "Docker", category: "Container", version: "24.0" },
	{ technology: "Kubernetes", category: "Orchestration", version: "1.28" },
	{ technology: "AWS", category: "Cloud Provider" },
];

export const DEMO_HEADERS: HeaderResultWithAI[] = [
	{ name: "Strict-Transport-Security", present: true, secure: true },
	{ name: "X-Content-Type-Options", present: true, secure: true },
	{ name: "X-Frame-Options", present: true, secure: true },
	{
		name: "Content-Security-Policy",
		present: false,
		ai: {
			attacker: { exposureValue: "XSS possible" },
			defender: { hardeningRecommendation: "Implement CSP header" },
		},
	},
	{
		name: "X-XSS-Protection",
		present: false,
		ai: {
			defender: {
				hardeningRecommendation: "Add X-XSS-Protection: 1; mode=block",
			},
		},
	},
	{ name: "Referrer-Policy", present: false },
	{ name: "Permissions-Policy", present: false },
];

export const DEMO_TLS: TLSResultWithAI[] = [
	{
		version: "TLS 1.3",
		issuer: "Let's Encrypt Authority X3",
		subject: "*.acme-corp.com",
		expiry: "2026-04-15T00:00:00Z",
		valid: true,
		daysUntilExpiry: 78,
	},
];

export const DEMO_NUCLEI: NucleiResultWithAI[] = [
	{
		templateId: "CVE-2023-44487",
		severity: "HIGH",
		matchedUrl: "https://api.acme-corp.com/",
		evidence: "HTTP/2 Rapid Reset vulnerability detected",
		tags: ["cve", "http2", "dos"],
		ai: {
			attacker: {
				attackNarrative: "Denial of service via HTTP/2 stream reset",
				exploitability: "Low skill required",
				chainOpportunities: [
					"Service disruption",
					"Resource exhaustion",
				],
			},
			defender: {
				hardeningRecommendation:
					"Update web server and enable rate limiting",
				remediationPriority: "high",
				detectionStrategy: "Monitor for rapid stream resets",
			},
		},
	},
	{
		templateId: "exposed-docker-api",
		severity: "CRITICAL",
		matchedUrl: "https://api.acme-corp.com:2375/",
		evidence: "Docker API accessible without authentication",
		tags: ["docker", "misconfig", "rce"],
		ai: {
			attacker: {
				attackNarrative:
					"Full container escape and host takeover possible",
				exploitability: "Trivial",
				chainOpportunities: [
					"Container escape",
					"Lateral movement",
					"Data exfiltration",
				],
			},
			defender: {
				hardeningRecommendation:
					"Disable Docker API or require TLS client auth",
				remediationPriority: "critical",
				detectionStrategy: "Alert on external Docker API access",
			},
		},
	},
	{
		templateId: "missing-csp-header",
		severity: "MEDIUM",
		matchedUrl: "https://app.acme-corp.com/",
		evidence: "Content-Security-Policy header not set",
		tags: ["header", "xss"],
		ai: {
			defender: {
				hardeningRecommendation: "Implement strict CSP policy",
				remediationPriority: "medium",
			},
		},
	},
];

export const DEMO_LOGS: ScanLogPayload[] = [
	{
		scanId: "scan-demo-001",
		source: "orchestrator",
		level: "INFO",
		message: "Scan started for api.acme-corp.com",
		timestamp: "2026-01-27T10:00:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Starting subdomain enumeration...",
		timestamp: "2026-01-27T10:00:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "subdomain-worker",
		level: "INFO",
		message: "Found 8 subdomains",
		timestamp: "2026-01-27T10:02:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "Starting port scan on 8 hosts...",
		timestamp: "2026-01-27T10:02:35Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "WARN",
		message: "Port 3306 (MySQL) exposed to internet",
		timestamp: "2026-01-27T10:05:12Z",
	},
	{
		scanId: "scan-demo-001",
		source: "port-worker",
		level: "INFO",
		message: "Port scan complete. Found 6 open ports",
		timestamp: "2026-01-27T10:08:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "INFO",
		message: "Analyzing security headers...",
		timestamp: "2026-01-27T10:08:05Z",
	},
	{
		scanId: "scan-demo-001",
		source: "headers-worker",
		level: "WARN",
		message: "Missing Content-Security-Policy header",
		timestamp: "2026-01-27T10:08:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tls-worker",
		level: "INFO",
		message: "TLS certificate valid for 78 days",
		timestamp: "2026-01-27T10:09:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "INFO",
		message: "Running 2,847 vulnerability templates...",
		timestamp: "2026-01-27T10:10:00Z",
	},
	{
		scanId: "scan-demo-001",
		source: "nuclei-worker",
		level: "ERROR",
		message: "CRITICAL: Docker API exposed without auth",
		timestamp: "2026-01-27T10:15:30Z",
	},
	{
		scanId: "scan-demo-001",
		source: "tech-worker",
		level: "INFO",
		message: "Detected 8 technologies",
		timestamp: "2026-01-27T10:12:00Z",
	},
];

export const DEMO_DIRECTORIES: DirectoryResultWithAI[] = [
	{
		path: "/admin",
		statusCode: 200,
		contentLength: 4521,
		contentType: "text/html",
		ai: {
			attacker: {
				exposureValue: "Admin panel exposed",
				attackSurface: "High-value target",
			},
			defender: {
				hardeningRecommendation: "Restrict to internal network or VPN",
			},
		},
	},
	{
		path: "/api/internal/debug",
		statusCode: 200,
		contentLength: 892,
		contentType: "application/json",
		ai: {
			attacker: {
				exposureValue: "Debug endpoint",
				exploitability: "Information disclosure",
			},
			defender: {
				hardeningRecommendation: "Remove or disable in production",
				monitoringGap: "No authentication",
			},
		},
	},
	{
		path: "/.git/config",
		statusCode: 200,
		contentLength: 327,
		contentType: "text/plain",
		ai: {
			attacker: {
				exposureValue: "Git config exposed",
				attackSurface: "Source code disclosure risk",
			},
			defender: {
				hardeningRecommendation: "Block .git directory access",
				remediationPriority: "critical",
			},
		},
	},
	{
		path: "/backup",
		statusCode: 403,
		contentLength: 0,
	},
	{
		path: "/api/v1/users",
		statusCode: 401,
		contentLength: 52,
		contentType: "application/json",
	},
	{
		path: "/swagger",
		statusCode: 200,
		contentLength: 12843,
		contentType: "text/html",
		ai: {
			attacker: {
				exposureValue: "API documentation exposed",
				attackSurface: "Endpoint enumeration",
			},
			defender: {
				hardeningRecommendation:
					"Restrict access to authenticated users",
			},
		},
	},
	{
		path: "/robots.txt",
		statusCode: 200,
		contentLength: 134,
		contentType: "text/plain",
	},
	{
		path: "/health",
		statusCode: 200,
		contentLength: 18,
		contentType: "application/json",
	},
	{
		path: "/config.json",
		statusCode: 404,
	},
	{
		path: "/wp-admin",
		statusCode: 404,
	},
];
